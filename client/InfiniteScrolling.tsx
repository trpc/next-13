"use client";

import { Fragment, useEffect, useRef } from "react";
import { trpc } from "~/client/trpcClient";
import { PostListItem } from "../app/PostListItem";
import { useIsIntersecting } from "./useIsIntersecting";

export function InfiniteScrolling(props: { nextCursor: string | undefined }) {
  const [isVisible, ref] = useIsIntersecting<HTMLDivElement>();
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
      <div ref={ref}>
        {query.isFetchingNextPage ? (
          <PostListItem.Skeleton />
        ) : (
          <button
            disabled={!props.nextCursor || !query.hasNextPage}
            onClick={() => {
              query.fetchNextPage();
            }}
            className={
              "p-4 w-full cursor-pointer" +
              (!query.hasNextPage ? " opacity-50" : "")
            }
          >
            {query.hasNextPage ? "Load more" : "You loaded everything"}
          </button>
        )}
      </div>
    </>
  );
}
