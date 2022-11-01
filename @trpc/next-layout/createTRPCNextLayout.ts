import { DehydratedState, QueryKey } from "@tanstack/react-query";
import {
  AnyProcedure,
  AnyQueryProcedure,
  AnyRouter,
  DataTransformer,
  inferProcedureInput,
  inferProcedureOutput,
  inferRouterContext,
  MaybePromise,
  ProcedureRouterRecord,
} from "@trpc/server";
import { createRecursiveProxy } from "@trpc/server/shared";
import { getRequestStorage } from "./localStorage";

interface CreateTRPCNextLayoutOptions<TRouter extends AnyRouter> {
  router: TRouter;
  createContext: () => MaybePromise<inferRouterContext<TRouter>>;
  transformer?: DataTransformer;
}

/**
 * @internal
 */
export type DecorateProcedure<TProcedure extends AnyProcedure> =
  TProcedure extends AnyQueryProcedure
    ? {
        fetch(
          input: inferProcedureInput<TProcedure>,
        ): Promise<inferProcedureOutput<TProcedure>>;
        fetchInfinite(
          input: inferProcedureInput<TProcedure>,
        ): Promise<inferProcedureOutput<TProcedure>>;
      }
    : never;

type OmitNever<TType> = Pick<
  TType,
  {
    [K in keyof TType]: TType[K] extends never ? never : K;
  }[keyof TType]
>;
/**
 * @internal
 */
export type DecoratedProcedureRecord<
  TProcedures extends ProcedureRouterRecord,
  TPath extends string = "",
> = OmitNever<{
  [TKey in keyof TProcedures]: TProcedures[TKey] extends AnyRouter
    ? DecoratedProcedureRecord<
        TProcedures[TKey]["_def"]["record"],
        `${TPath}${TKey & string}.`
      >
    : TProcedures[TKey] extends AnyQueryProcedure
    ? DecorateProcedure<TProcedures[TKey]>
    : never;
}>;

type CreateTRPCNextLayout<TRouter extends AnyRouter> = DecoratedProcedureRecord<
  TRouter["_def"]["record"]
> & {
  dehydrate(): Promise<DehydratedState>;
};

function getQueryKey(path: string[], input: unknown) {
  return input === undefined ? [path] : [path, input];
}

export function createTRPCNextLayout<TRouter extends AnyRouter>(
  opts: CreateTRPCNextLayoutOptions<TRouter>,
): CreateTRPCNextLayout<TRouter> {
  function getState() {
    const requestStorage = getRequestStorage<{
      _trpc: {
        cache: Record<
          string,
          {
            updatedAt: Date;
            data: unknown;
            queryKey: QueryKey;
          }
        >;
        context: inferRouterContext<TRouter>;
      };
    }>();
    requestStorage._trpc = requestStorage._trpc ?? {
      cache: Object.create(null),
      context: opts.createContext(),
    };
    return requestStorage._trpc;
  }
  const transformer = opts.transformer ?? {
    serialize: (v) => v,
    deserialize: (v) => v,
  };
  return createRecursiveProxy(async (callOpts) => {
    const path = [...callOpts.path];
    const lastPart = path.pop();
    const state = getState();
    const ctx = await state.context;

    if (lastPart === "dehydrate" && path.length === 0) {
      await state.context;

      const dehydratedState: DehydratedState = {
        queries: [],
        mutations: [],
      };

      for (const obj of Object.values(state.cache)) {
        dehydratedState.queries.push({
          // Does this matter?
          queryHash: JSON.stringify(obj.queryKey),
          queryKey: obj.queryKey,
          state: {
            data: obj.data,
            error: null,
            dataUpdateCount: 0,
            dataUpdatedAt: obj.updatedAt.getTime(),
            errorUpdateCount: 0,
            errorUpdatedAt: obj.updatedAt.getTime(),
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: null,
            fetchStatus: "idle",
            isInvalidated: false,
            status: "success",
          },
        });
      }

      return transformer.serialize(dehydratedState);
    }

    const caller = opts.router.createCaller(ctx);

    const pathStr = path.join(".");
    const input = callOpts.args[0];
    const queryKey = getQueryKey(path, input);

    const hash = JSON.stringify(transformer.serialize(queryKey));
    // we could potentially both dedupe requests and return stale results immediately
    return caller
      .query(pathStr, input)
      .then((data) => {
        state.cache[hash] = {
          updatedAt: new Date(),
          data:
            lastPart === "fetchInfinite"
              ? {
                  pages: [data],
                  pageParams: [undefined],
                }
              : data,
          queryKey,
        };
        return data;
      })
      .catch((err) => {
        throw err;
      });
    return state.cache[hash];
  }) as CreateTRPCNextLayout<TRouter>;
}
