/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { headers } from "next/headers";
import { getUser, User } from "~/app/_lib/getUser";
import { nextAuthOptions } from "~/pages/api/auth/[...nextauth]";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  user: User | null;
  rsc: boolean;
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(opts: CreateContextOptions) {
  return {
    user: opts.user,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts?: trpcNext.CreateNextContextOptions,
): Promise<Context> {
  // for API-response caching see https://trpc.io/docs/caching

  if (!opts) {
    // RSC
    return createContextInner({
      rsc: true,
      user: await getUser(),
    });
  }
  // not RSC
  const session = await unstable_getServerSession(
    opts.req,
    opts.res,
    nextAuthOptions,
  );

  // FIXME fix auth for api requests
  return await createContextInner({
    rsc: false,
    user: null,
  });
}
