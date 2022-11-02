"use client";

import { Fragment, useEffect, useRef, use } from "react";
import { trpc } from "~/client/trpcClient";
import { useIsIntersecting } from "~/client/useIsIntersecting";
import { PostListItem } from "./PostListItem";

export function PostList() {
  const [isLoadMoreVisible, ref] = useIsIntersecting<HTMLDivElement>();

  const utils = trpc.useContext();
  use(
    utils.post.list.fetchInfinite(
      {},
      {
        staleTime: Infinity,
      },
    ),
  );

  const query = trpc.post.list.useInfiniteQuery(
    {},
    {
      getNextPageParam(lastPage) {
        return lastPage.nextCursor;
      },
      refetchOnMount: false,
      staleTime: Infinity,
    },
  );

  const fetchNextPageRef = useRef(query.fetchNextPage);
  fetchNextPageRef.current = query.fetchNextPage;

  useEffect(() => {
    if (isLoadMoreVisible && query.hasNextPage && !query.isFetching) {
      fetchNextPageRef.current();
    }
  }, [isLoadMoreVisible, query.hasNextPage, query.isFetching]);

  return (
    <ul role='list' className='divide-y divide-gray-200'>
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
            disabled={!query.hasNextPage}
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
    </ul>
  );
}
