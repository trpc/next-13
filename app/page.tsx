import { InfiniteScrolling } from "./InfiniteScrolling";
import { PostListItem } from "./PostListItem";
import { ReloadButton } from "./ReloadButton";
import { trpc } from "./_lib/trpc";

export default function Page() {
  const postList = trpc.post.list.use({});
  console.log({ posts: postList });

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {postList.items.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
        <InfiniteScrolling cursor={postList.nextCursor} />
      </ul>

      <details>
        <summary>Raw RSC data</summary>
        <pre>{JSON.stringify(postList, null, 4)}</pre>
      </details>

      <p>
        <ReloadButton />
      </p>
    </>
  );
}
