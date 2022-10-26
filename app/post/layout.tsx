import { InfiniteScrolling } from "../InfiniteScrolling";
import { PostListItem } from "../PostListItem";
import { trpc } from "../../applib/trpc";
import { ReactNode } from "react";

export default function Layout(props: { children: ReactNode }) {
  const postList = trpc.post.list.use({});

  return (
    <div className="flex">
      <aside className="p-4 max-w-xs overflow-x-hidden flex flex-col gap-4 border-r-2">
        <h2 className="text-xl">Posts</h2>
        <p className="text-sm -mt-4">
          First posts are fetched with RSC, the infinite scrolling is through
          client
        </p>

        <details>
          <summary>Raw RSC data</summary>
          <pre className="overflow-x-scroll">
            {JSON.stringify(postList, null, 2)}
          </pre>
        </details>

        <ul>
          {postList.items.map((post) => (
            <PostListItem key={post.id} post={post} />
          ))}
          <InfiniteScrolling cursor={postList.nextCursor} />
        </ul>
      </aside>
      <div className="flex-1">{props.children}</div>
    </div>
  );
}
