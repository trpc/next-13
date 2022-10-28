import "./global.css";

import { CreatePostForm } from "~/client/CreatePostForm";
import { InfiniteScrolling } from "~/client/InfiniteScrolling";
import { rsc } from "../server-rsc/trpc";
import { PostListItem } from "./PostListItem";
import { Suspense, use } from "react";

function PostList() {
  const postList = rsc.post.list.use({});
  use(new Promise((resolve) => setTimeout(resolve, 1000)));

  return (
    <>
      {postList.items.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
      <InfiniteScrolling nextCursor={postList.nextCursor} />
    </>
  );
}

PostList.Skeleton = function PostListSkeleton() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <PostListItem.Skeleton key={i} />
      ))}
    </>
  );
};
export default function Page() {
  return (
    <div className='space-y-6 p-4'>
      <header>
        <h1>Overview</h1>
        <div className='bg-white shadow rounded-md p-4'>
          <p>
            First posts are fetched with RSC, the infinite scrolling is through
            client
          </p>
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
            <Suspense fallback={<PostList.Skeleton />}>
              <PostList />
            </Suspense>
          </ul>
        </div>
      </section>
    </div>
  );
}
