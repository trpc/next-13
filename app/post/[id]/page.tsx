import { rsc } from "~/server-rsc/trpc";

type FIXMEType = any;
export default function Page(props: FIXMEType) {
  const post = rsc.post.byId.use({ id: props.params.id });

  return (
    <div className='p-4'>
      <article className='p-4 shadow-md bg-white overflow-hidden rounded-md prose'>
        <h1>{post.title}</h1>

        {post.text.split("\n").map((line, i) => (
          <p key={i}>{line}</p>
        ))}

        <details>
          <summary>Raw data</summary>
          <pre>{JSON.stringify(post, null, 4)}</pre>
        </details>
      </article>
    </div>
  );
}
