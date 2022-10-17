import Link from "next/link";
import { MyComp } from "./MyComp";
import { trpc } from "./trpc";

export default function Page() {
  const postList = trpc.post.list.use({});
  console.log({ posts: postList });

  return (
    <>
      <h1>Posts</h1>
      <pre>{JSON.stringify(postList, null, 4)}</pre>
      <ul>
        {postList.items.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
      <MyComp />
    </>
  );
}
