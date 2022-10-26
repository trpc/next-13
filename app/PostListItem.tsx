import Link from "next/link";
import type { Types } from "~/shared/utils";

export type PostListOutput = Types["post"]["list"]["output"];
type ListItem = PostListOutput["items"][number];

export function PostListItem(props: { post: ListItem }) {
  const { post } = props;
  return (
    <li className="hover:text-gray-400">
      <Link href={`/post/${post.id}`}>{post.title}</Link>
    </li>
  );
}
