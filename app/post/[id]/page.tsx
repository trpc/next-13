"use client";
import { use, useRef } from "react";
import { trpc } from "~/client/trpcClient";

// There should be some built-in type
type FIXMEType = {
  params: {
    id: string;
  };
};

export default function Page(props: FIXMEType) {
  const utils = trpc.useContext();

  const post = use(
    utils.post.byId.fetch(
      {
        id: props.params.id,
      },
      {
        staleTime: Infinity,
      },
    ),
  );

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
