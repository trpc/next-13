import { trpc } from "../../applib/trpc";

export default function Page() {
  const secret = trpc.secret.use();

  return <>Secret {secret}</>;
}
