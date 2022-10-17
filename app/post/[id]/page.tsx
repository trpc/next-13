import { NextPageContext } from "next";
import { trpc } from "~/app/trpc";

// FIXME is there proper typing of this?
interface Props {
  params: {
    id: string;
  };
  searchParams: Record<string, string | undefined>;
}
export default function Page(props: Props) {
  const post = trpc.post.byId.use({ id: props.params.id });

  return (
    <>
      <h1>{post.title}</h1>
      <p>{post.text}</p>
      <pre>{JSON.stringify(post, null, 4)}</pre>
    </>
  );
}
