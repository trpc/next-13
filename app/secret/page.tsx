import { use } from "react";
import { rsc } from "../../server-rsc/trpc";

export default function Page() {
  const secret = use(rsc.secret.fetch());

  return <>Secret {secret}</>;
}
