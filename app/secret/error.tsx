"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <p style={{ border: "1px solid red", padding: "4px" }}>
      Something went wrong, are you signed in?
    </p>
  );
}
