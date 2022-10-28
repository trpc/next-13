import { CalendarIcon, MapPinIcon, UsersIcon } from "@heroicons/react/20/solid";

import Link from "next/link";
import { Outputs } from "~/shared/utils";

export type PostListOutput = Outputs["post"]["list"];
type ListItem = PostListOutput["items"][number];

export function PostListItem(props: { post: ListItem }) {
  const { post } = props;
  return (
    <Link
      href={`/post/${post.id}`}
      className='block hover:bg-gray-50 px-4 py-4 sm:px-6"'
    >
      <article key={post.id}>
        <div className='flex items-center justify-between'>
          <p className='truncate text-sm font-medium text-indigo-600'>
            {post.title}
          </p>
        </div>
        <div className='mt-2 sm:flex sm:justify-between'>
          <div className='sm:flex'></div>
          <div className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0'>
            <CalendarIcon
              className='mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400'
              aria-hidden='true'
            />
            <p>
              Added on{" "}
              <time dateTime={post.createdAt.toISOString()}>
                {post.createdAt.toISOString()}
              </time>
            </p>
          </div>
        </div>
      </article>
    </Link>
  );
}
