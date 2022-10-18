"use client";

import { Fragment, useState } from "react";
import { client } from "~/client/trpcClient";
import { PostListItem, PostListOutput } from "./PostListItem";

export function InfiniteScrolling(props: {
  cursor: PostListOutput["nextCursor"];
}) {
  const [cursor, setCursor] = useState(props.cursor);

  const [loadedPages, setLoadedPages] = useState<PostListOutput[]>([]);

  // TODO insert query lib here
  const [loading, setLoading] = useState(false);
  // const disabled = !cursor || locked ? "disabled" : false;

  return (
    <>
      {loadedPages.map((page, index) => (
        <Fragment key={index}>
          {page.items.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
        </Fragment>
      ))}
      <button
        onClick={async () => {
          if (loading) {
            return;
          }
          setLoading(true);
          const nextPage = await client.post.list.query({
            cursor,
          });
          setCursor(nextPage.nextCursor);
          setLoadedPages((prev) => [...prev, nextPage]);
          setLoading(false);
        }}
      >
        {loading ? "Loading..." : "Load more"}
      </button>
    </>
  );
}
