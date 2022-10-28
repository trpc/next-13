import "./global.css";

import { CreatePostForm } from "~/client/CreatePostForm";
import { InfiniteScrolling } from "~/client/InfiniteScrolling";
import { rsc } from "../server-rsc/trpc";
import { PostListItem } from "./PostListItem";
import { Suspense, use } from "react";

function PostList() {
  const postList = rsc.post.list.use({});
  use(new Promise((resolve) => setTimeout(resolve, 1_000)));

  return (
    <ul role='list' className='divide-y divide-gray-200'>
      {postList.items.map((post) => (
        <PostListItem key={post.id} post={post} />
      ))}
      <InfiniteScrolling nextCursor={postList.nextCursor} />
    </ul>
  );
}

PostList.Skeleton = function PostListSkeleton() {
  return (
    <ul role='list' className='divide-y divide-gray-200'>
      {Array.from({ length: 10 }).map((_, i) => (
        <PostListItem.Skeleton key={i} />
      ))}
    </ul>
  );
};
export default function Page() {
  return (
    <div className='space-y-6 p-4'>
      <header>
        <h1>Overview</h1>
        <div className='bg-white shadow rounded-md p-4 prose'>
          <p>
            First posts are fetched with RSC, the infinite scrolling is through
            client
          </p>
          <p>
            <a
              href='https://github.com/trpc/next-13'
              className='text-indigo-500 underline'
              target='_blank'
              rel='noreferrer'
            >
              View source on GitHub
            </a>
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
          <Suspense fallback={<PostList.Skeleton />}>
            <PostList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
