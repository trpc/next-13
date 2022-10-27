import Link from "next/link";
import { Outputs } from "~/shared/utils";

export type PostListOutput = Outputs["post"]["list"];
type ListItem = PostListOutput["items"][number];

export function PostListItem(props: { post: ListItem }) {
  const { post } = props;
  return (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <Link href={`/post/${post.id}`}>View more</Link>
    </article>
  );
}
