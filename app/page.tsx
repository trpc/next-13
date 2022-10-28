import "./global.css";

import { CreatePostForm } from "~/client/CreatePostForm";
import { InfiniteScrolling } from "~/client/InfiniteScrolling";
import { rsc } from "../server-rsc/trpc";
import { PostListItem } from "./PostListItem";

export default function Page() {
  const postList = rsc.post.list.use({});

  return (
    <div className='space-y-4 p-4'>
      <header>
        <h1>Overview</h1>
        <div className='bg-white shadow rounded-md p-4'>
          <p>
            First posts are fetched with RSC, the infinite scrolling is through
            client
          </p>

          <details>
            <summary>Raw RSC data</summary>
            <pre>{JSON.stringify(postList, null, 4)}</pre>
          </details>
        </div>
      </header>
      <section>
        <h2>Add post</h2>
        <CreatePostForm />
      </section>
      <section>
        <h2>All posts</h2>

        <div className='overflow-hidden bg-white shadow rounded-md'>
          <ul role='list' className='divide-y divide-gray-200'>
            {postList.items.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
            <InfiniteScrolling nextCursor={postList.nextCursor} />
          </ul>
        </div>
      </section>
    </div>
  );
}
