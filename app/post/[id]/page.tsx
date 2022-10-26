import Link from "next/link";
import { trpc } from "~/applib/trpc";

type FIXMEType = any;
export default function Page(props: FIXMEType) {
  const post = trpc.post.byId.use({ id: props.params.id });

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
      <Link href="/post" className="font-bold hover:text-gray-300">&lt;</Link>
      <h1 className="text-2xl">{post.title}</h1>
      </div>
      <p>{post.text}</p>

      <details>
        <summary>Raw data</summary>
        <pre>{JSON.stringify(post, null, 2)}</pre>
      </details>
    </div>
  );
}
