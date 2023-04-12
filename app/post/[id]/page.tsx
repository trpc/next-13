import { HydrateClient } from "~/client/HydrateClient";
import { rsc } from "~/server-rsc/trpc";

type Props = {
  params: {
    id: string;
  };
};

export default async function Page(props: Props) {
  const post = await rsc.post.byId.fetch({ id: props.params.id });

  return (
    <HydrateClient state={await rsc.dehydrate()}>
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
    </HydrateClient>
  );
}
