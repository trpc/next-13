"use client";

import { useRouter } from "next/navigation";

export function RefreshButton() {
  const router = useRouter();

  return (
    <button type='button' onClick={() => router.refresh()}>
      Call <code>router.refresh()</code>
    </button>
  );
}
