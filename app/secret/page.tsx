import { rsctrpc } from "../../server-rsc/trpc";

export default function Page() {
  const secret = rsctrpc.secret.use();

  return <>Secret {secret}</>;
}
