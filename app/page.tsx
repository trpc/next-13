import { Suspense } from "react";
import { CreatePostForm } from "~/client/CreatePostForm";
import { PostList } from "~/components/PostList";
import { PostListItem } from "~/components/PostListItem";

function PostListSkeleton() {
  return (
    <ul role='list' className='divide-y divide-gray-200'>
      {Array.from({ length: 10 }).map((_, i) => (
        <PostListItem.Skeleton key={i} />
      ))}
    </ul>
  );
}

export default async function Page() {
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
          <Suspense fallback={<PostListSkeleton />}>
            <PostList />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
