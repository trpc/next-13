/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { getUser, User } from "~/server-rsc/getUser";
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

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export async function createContext(
  opts: // HACKs because we can't import `next/cookies` in `/api`-routes
  | {
        type: "rsc";
        getUser: typeof getUser;
      }
    | (trpcNext.CreateNextContextOptions & { type: "api" }),
) {
  // for API-response caching see https://trpc.io/docs/caching

  if (opts.type === "rsc") {
    // RSC
    return {
      type: opts.type,
      user: await opts.getUser(),
    };
  }
  // not RSC
  const session = await unstable_getServerSession(
    opts.req,
    opts.res,
    nextAuthOptions,
  );
  return {
    type: opts.type,
    user: session?.user,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
