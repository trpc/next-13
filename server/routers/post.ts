/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

const posts = [
  { id: "1", title: "hello world", text: "woop" },
  { id: "2", title: "hello world 2", text: "whap" },
];

type Post = typeof posts[number];

export const postRouter = router({
  list: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).optional().default(50),
        cursor: z.string().nullish(),
      }),
    )
    .query(async ({ input }) => {
      const { cursor } = input;

      const idxCursor = cursor ? posts.findIndex((p) => p.id === cursor) : 0;

      const items = posts.slice(idxCursor, input.limit + 1);
      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > input.limit) {
        // Remove the last item and use it as next cursor

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const nextItem = items.pop()!;
        nextCursor = nextItem.id;
      }

      return {
        items,
        nextCursor,
        random: Math.random(),
      };
    }),
  byId: publicProcedure
    .input(
      z.object({
        id: z.string(),
      }),
    )
    .query(async ({ input }) => {
      const post = posts.find((p) => p.id === input.id);
      if (!post) {
        throw new TRPCError({
          code: "NOT_FOUND",
        });
      }
      return post;
    }),
  add: publicProcedure
    .input(
      z.object({
        title: z.string().min(1).max(32),
        text: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const post: Post = {
        id: `${Math.random()}`,
        ...input,
      };
      return post;
    }),
});
