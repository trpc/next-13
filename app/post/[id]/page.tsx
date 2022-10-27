import { rsctrpc } from "~/server-rsc/trpc";

type FIXMEType = any;
export default function Page(props: FIXMEType) {
  const post = rsctrpc.post.byId.use({ id: props.params.id });

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
