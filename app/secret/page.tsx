import { rsc } from "../../server-rsc/trpc";

export default function Page() {
  const secret = rsc.secret.use();

  return <>Secret {secret}</>;
}
