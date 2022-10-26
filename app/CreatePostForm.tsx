"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { client } from "~/client/trpcClient";
import { Types } from "~/shared/utils";

export function CreatePostForm() {
  // TODO insert query lib here
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        setLoading(true);
        /**
         * In a real app you probably don't want to use this manually
         * Checkout React Hook Form - it works great with tRPC
         * @see https://react-hook-form.com/
         * @see https://kitchen-sink.trpc.io/react-hook-form
         */
        e.preventDefault();
        const $form = e.currentTarget;
        const values = Object.fromEntries(new FormData($form));
        type Input = Types["post"]["add"]["input"];
        //    ^?
        const input: Input = {
          title: values.title as string,
          text: values.text as string,
        };
        try {
          await client.post.add.mutate(input);
          await router.refresh();

          $form.reset();
        } catch (cause) {
          console.error({ cause }, "Failed to add post");
        }
        setLoading(false);
      }}
    >
      <label htmlFor='title'>Title:</label>
      <br />
      <input id='title' name='title' type='text' disabled={loading} />

      <br />
      <label htmlFor='text'>Text:</label>
      <br />
      <textarea id='text' name='text' disabled={loading} />
      <br />
      <input type='submit' disabled={loading} />
    </form>
  );
}
