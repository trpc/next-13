"use client";

import { Fragment, useEffect, useRef } from "react";
import { trpc } from "~/client/trpcClient";
import { PostListItem } from "../app/PostListItem";
import React from "react";

function useIsIntersecting<TElement extends HTMLElement>() {
  // to prevents runtime crash in IE, let's mark it true right away
  const [isIntersecting, setIsIntersecting] = React.useState(
    typeof IntersectionObserver !== "function",
  );

  const ref = React.useRef<TElement>(null);

  React.useEffect(() => {
    if (!ref.current) {
      return;
    }
    const observer = new IntersectionObserver(([entry]) =>
      setIsIntersecting(entry.isIntersecting),
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  }, []);
  return [isIntersecting, ref] as const;
}

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
      keepPreviousData: true,
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
      <button
        ref={ref}
        disabled={!props.nextCursor || query.isFetching || !query.hasNextPage}
        onClick={() => {
          query.fetchPreviousPage();
        }}
      >
        {query.isFetching ? "Loading..." : "Load more"}
      </button>
    </>
  );
}
