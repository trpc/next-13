import { InfiniteScrolling } from "./InfiniteScrolling";
import { PostListItem } from "./PostListItem";
import { trpc } from "../applib/trpc";
import { CreatePostForm } from "./CreatePostForm";

export default function Page() {
  const postList = trpc.post.list.use({});

  return (
    <>
      <h1>Posts</h1>
      <p>
        First posts are fetched with RSC, the infinite scrolling is through
        client
      </p>

      <details>
        <summary>Raw RSC data</summary>
        <pre>{JSON.stringify(postList, null, 4)}</pre>
      </details>

      <ul>
        {postList.items.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
        <InfiniteScrolling cursor={postList.nextCursor} />
      </ul>

      <CreatePostForm />
    </>
  );
}
