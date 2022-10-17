/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from "../trpc";
import { healthRouter } from "./health";
import { postRouter } from "./post";

export const appRouter = router({
  post: postRouter,
  health: healthRouter,
  whoami: publicProcedure.query(({ ctx }) => ctx.user),
});

export type AppRouter = typeof appRouter;
