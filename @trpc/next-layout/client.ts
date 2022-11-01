import { useQuery } from "@tanstack/react-query";
import { createTRPCClient, httpBatchLink } from "@trpc/client";
import { AnyRouter, ProcedureType } from "@trpc/server";
import { createRecursiveProxy } from "@trpc/server/shared";
import { createContext } from "react";
import { DecoratedProcedureRecord } from "./createTRPCNextLayout";
import superjson from "superjson";
export type TRPCSchemaContext = Record<string, ProcedureType>;
export const TRPCSchemaContext = createContext<TRPCSchemaContext>(null as any);
export const TRPCSchemaContextProvider = TRPCSchemaContext.Provider;

export async function createTRPCNextClientLayout<
  TRouter extends AnyRouter
>(): Promise<DecoratedProcedureRecord<TRouter["_def"]["record"]>> {
  const client = createTRPCClient({
    links: [httpBatchLink({ url: "/api/trpc" })],
    transformer: superjson,
  });

  return createRecursiveProxy((callOpts) => {
    const path = [...callOpts.path];
    path.pop();
    const flatPath = path.join(".");
    // const schema = useContext(TRPCSchemaContext);
    // const procedureType = schema[flatPath];

    const { data } = useQuery([...path, callOpts.args[0]], () => {
      return client.query(flatPath, callOpts.args[0]);
    });
    return data;
  }) as DecoratedProcedureRecord<TRouter["_def"]["record"]>;
}
