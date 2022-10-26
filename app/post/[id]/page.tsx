import { trpc } from "~/applib/trpc";

type FIXMEType = any;
export default function Page(props: FIXMEType) {
  const post = trpc.post.byId.use({ id: props.params.id });

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.text}</p>

      <details>
        <summary>Raw data</summary>
        <pre>{JSON.stringify(post, null, 4)}</pre>
      </details>
    </>
  );
}
