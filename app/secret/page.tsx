import { trpc } from "../_lib/trpc";

export default function Page() {
  const secret = trpc.secret.use();

  return <>Secret {secret}</>;
}
