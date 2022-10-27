import { InfiniteScrolling } from "../client/InfiniteScrolling";
import { PostListItem } from "./PostListItem";
import { rsctrpc } from "../server-rsc/trpc";
import { ClientProvider } from "~/client/trpcClient";

export default function Page() {
  const postList = rsctrpc.post.list.use({});

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

      {postList.items.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
      <ClientProvider>
        <InfiniteScrolling initialCursor={postList.nextCursor} />
      </ClientProvider>
    </>
  );
}
