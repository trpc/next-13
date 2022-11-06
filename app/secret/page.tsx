import { rsc } from "../../server-rsc/trpc";

export default async function Page() {
  const secret = rsc.secret.fetch();

  return <>Secret {secret}</>;
}
