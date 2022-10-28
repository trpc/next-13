import { PostListItem } from "./PostListItem";
import { rsc } from "../server-rsc/trpc";
import { ClientProvider } from "~/client/trpcClient";
import { CreatePostForm } from "~/client/CreatePostForm";
import { InfiniteScrolling } from "~/client/InfiniteScrolling";

export default function Page() {
  const postList = rsc.post.list.use({});

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

      <ClientProvider>
        <InfiniteScrolling nextCursor={postList.nextCursor} />
        {postList.items.map((post) => (
          <PostListItem key={post.id} post={post} />
        ))}
        <CreatePostForm />
      </ClientProvider>
    </>
  );
}
