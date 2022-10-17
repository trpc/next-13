import Link from "next/link";
import { ReloadButton } from "./ReloadButton";
import { trpc } from "./trpc";

export default function Page() {
  const postList = trpc.post.list.use({});
  console.log({ posts: postList });

  return (
    <>
      <h1>Posts</h1>
      <ul>
        {postList.items.map((post) => (
          <li key={post.id}>
            <Link href={`/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>

      <details>
        <summary>Raw data</summary>
        <pre>{JSON.stringify(postList, null, 4)}</pre>
      </details>

      <p>
        <ReloadButton />
      </p>
    </>
  );
}
