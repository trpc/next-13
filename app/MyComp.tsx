"use client";

import { useRouter } from "next/navigation";

export function MyComp() {
  const router = useRouter();
  
  return (
    <>
      <button type='button' onClick={() => router.reload()}>
        Reload
      </button>
      hello
    </>
  );
}
