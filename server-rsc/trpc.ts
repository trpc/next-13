import { createTRPCNextLayout } from "~/@trpc/next-layout";
import { createContext } from "~/server/context";
import { appRouter } from "~/server/routers/_app";
import { getUser } from "./getUser";

export const rsctrpc = createTRPCNextLayout({
  router: appRouter,
  createContext() {
    return createContext({
      type: "rsc",
      getUser,
    });
  },
});
