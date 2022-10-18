"use client";

import { useRouter } from "next/navigation";

export function ReloadButton() {
  const router = useRouter();

  return (
    <>
      <button type='button' onClick={() => router.reload()}>
        Reload
      </button>
    </>
  );
}
