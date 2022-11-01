import { appRouter } from "~/server/routers/_app";
import { createContext } from "~/server/context";
import { getUser } from "../getUser";
import { createTRPCNextServerLayout } from "@trpc/next-layout/server";

export const rsc = await createTRPCNextServerLayout({
  router: appRouter,
  async createContext() {
    return createContext({
      type: "rsc",
      getUser,
    });
  },
});
