"use client";

import { Fragment, useEffect, useRef } from "react";
import { trpc } from "~/client/trpcClient";
import { PostListItem } from "../app/PostListItem";
import { useIsIntersecting } from "./useIsIntersecting";

export function InfiniteScrolling(props: { nextCursor: string | undefined }) {
  const [isVisible, ref] = useIsIntersecting<HTMLButtonElement>();
  // FIXME how can I make this not eagerly fetch until "fetchPreviousPage()" is called?
  const query = trpc.post.list.useInfiniteQuery(
    {
      initialCursor: props.nextCursor,
    },
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
      refetchOnMount: false,
      staleTime: Infinity,
      enabled: isVisible,
    },
  );

  const fetchNextPageRef = useRef(query.fetchNextPage);
  fetchNextPageRef.current = query.fetchNextPage;

  useEffect(() => {
    if (isVisible && query.hasNextPage && !query.isFetching) {
      fetchNextPageRef.current();
    }
  }, [isVisible, query.hasNextPage, query.isFetching]);
  return (
    <>
      {query.data?.pages.map((page, index) => (
        <Fragment key={index}>
          {page.items.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
      <div>
        <button
          ref={ref}
          disabled={!props.nextCursor || query.isFetching || !query.hasNextPage}
          onClick={() => {
            query.fetchPreviousPage();
          }}
          className={
            "p-4 w-full cursor-pointer" +
            (query.isFetching || !query.hasNextPage ? " opacity-50" : "")
          }
        >
          {query.isFetching
            ? "Loading..."
            : !query.hasNextPage
            ? "You loaded everything"
            : "Load more"}
        </button>
      </div>
    </>
  );
}
