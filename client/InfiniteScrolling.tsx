"use client";

import { Fragment } from "react";
import { trpc } from "~/client/trpcClient";
import { PostListItem } from "../app/PostListItem";

export function InfiniteScrolling(props: { nextCursor: string | undefined }) {
  const query = trpc.post.list.useInfiniteQuery(
    {
      initialCursor: props.nextCursor || null,
    },
    {
      getNextPageParam(page) {
        return page.nextCursor;
      },
      refetchOnMount: false,
      staleTime: Infinity,
    },
  );
  return (
    <>
      <button
        disabled={!props.nextCursor || query.isFetching || !query.hasNextPage}
        onClick={async () => {
          query.fetchNextPage();
        }}
      >
        {query.isFetching ? "Loading..." : "Load more"}
      </button>
      {query.data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.items.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
    </>
  );
}
