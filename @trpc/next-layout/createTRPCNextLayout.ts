import {
  AnyProcedure,
  AnyQueryProcedure,
  AnyRouter,
  inferProcedureInput,
  inferProcedureOutput,
  inferRouterContext,
  MaybePromise,
  ProcedureRouterRecord,
} from "@trpc/server";
import { createRecursiveProxy } from "@trpc/server/shared";
import { use } from "react";

interface CreateTRPCNextLayoutOptions<TRouter extends AnyRouter> {
  router: TRouter;
  createContext: () => MaybePromise<inferRouterContext<TRouter>>;
}

/**
 * @internal
 */
export type DecorateProcedure<TProcedure extends AnyProcedure> =
  TProcedure extends AnyQueryProcedure
    ? {
        use(
          input: inferProcedureInput<TProcedure>,
          // FIXME: maybe this should be cache options?
          // opts?:
        ): inferProcedureOutput<TProcedure>;
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

export function createTRPCNextLayout<TRouter extends AnyRouter>(
  opts: CreateTRPCNextLayoutOptions<TRouter>,
): DecoratedProcedureRecord<TRouter["_def"]["record"]> {
  return createRecursiveProxy((callOpts) => {
    const path = [...callOpts.path];
    path.pop();
    return use(
      (async function iife() {
        const ctx = await opts.createContext();
        const caller = opts.router.createCaller(ctx);

        return caller.query(path.join("."), callOpts.args[0]) as any;
      })(),
    ) as any;
  }) as DecoratedProcedureRecord<TRouter["_def"]["record"]>;
}
