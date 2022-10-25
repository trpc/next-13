import Link from "next/link";
import type { Types } from "~/shared/utils";

export type PostListOutput = Types["post"]["list"]["output"];
type ListItem = PostListOutput["items"][number];

export function PostListItem(props: { post: ListItem }) {
  const { post } = props;
  return (
    <li>
      <Link href={`/post/${post.id}`}>{post.title}</Link>
    </li>
  );
}
