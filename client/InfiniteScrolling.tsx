"use client";

import { Fragment } from "react";
import { trpc } from "~/client/trpcClient";
import { PostListItem } from "../app/PostListItem";

export function InfiniteScrolling(props: { nextCursor: string | undefined }) {
  // FIXME how can I make this not eagerly fetch until "fetchPreviousPage()" is called?
  const query = trpc.post.list.useInfiniteQuery(
    {
      initialCursor: props.nextCursor || null,
    },
    {
      getPreviousPageParam(lastPage) {
        return lastPage.nextCursor;
      },
      refetchOnMount: false,
      staleTime: Infinity,
      keepPreviousData: true,
    },
  );
  return (
    <>
      <button
        disabled={
          !props.nextCursor || query.isFetching || !query.hasPreviousPage
        }
        onClick={() => {
          query.fetchPreviousPage();
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
