import { experimental_use as use } from "react";
import { headers } from "next/headers";
import { MyComp } from "./MyComp";

// The return value is *not* serialized, so you can return Date, Map, Set, etc.
async function getHeaders() {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const headersList = headers();
  const referer = headersList.get("referer");
  const cookies = headersList.get("cookie");

  const res = Object.entries(headers);

  console.log({ res, referer, cookies });

  return {
    time: new Date(),
    cookies,
  };
}

export default function Page() {
  // This value is fully typed
  const headers = use(getHeaders());

  return (
    <>
      <h1>Headers</h1>
      <pre>{JSON.stringify(headers, null, 2)}</pre>
      <MyComp />
    </>
  );
}
