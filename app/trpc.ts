import { createTRPCNextLayout } from "~/@trpc/next-layout";
import { createContext } from "~/server/context";
import { appRouter } from "~/server/routers/_app";

export const trpc = createTRPCNextLayout({
  router: appRouter,
  createContext,
});
