"use client";

import { useRouter } from "next/navigation";
import { trpc } from "~/client/trpcClient";
import { Inputs } from "~/shared/utils";

export function CreatePostForm() {
  const addPost = trpc.post.add.useMutation();

  const router = useRouter();

  return (
    <form
      onSubmit={async (e) => {
        /**
         * In a real app you probably don't want to use this manually
         * Checkout React Hook Form - it works great with tRPC
         * @see https://react-hook-form.com/
         * @see https://kitchen-sink.trpc.io/react-hook-form
         */
        e.preventDefault();
        const $form = e.currentTarget;
        const values = Object.fromEntries(new FormData($form));
        type Input = Inputs["post"]["add"];
        //    ^?
        const input: Input = {
          title: values.title as string,
          text: values.text as string,
        };
        try {
          await addPost.mutateAsync(input);
          router.refresh();

          $form.reset();
        } catch (cause) {
          console.error({ cause }, "Failed to add post");
        }
      }}
      className='space-y-2'
    >
      <fieldset>
        <label htmlFor='title' className='label'>
          Title
        </label>
        <input
          id='title'
          name='title'
          type='text'
          disabled={addPost.isLoading}
          className={
            "input" + (addPost.error?.data?.zod?.title ? " input--error" : "")
          }
        />
        {addPost.error?.data?.zod?.title && (
          <div style={{ color: "red" }}>{addPost.error?.data?.zod?.title}</div>
        )}
      </fieldset>

      <fieldset>
        <label htmlFor='text' className='label'>
          Text
        </label>

        <textarea
          id='text'
          name='text'
          disabled={addPost.isLoading}
          className={
            "input" + (addPost.error?.data?.zod?.text ? " input--error" : "")
          }
        />
        {addPost.error?.data?.zod?.text && (
          <div style={{ color: "red" }}>{addPost.error?.data?.zod?.text}</div>
        )}
      </fieldset>
      <fieldset>
        <input type='submit' disabled={addPost.isLoading} className='button' />
        {addPost.error && !addPost.error.data?.zod && (
          <p style={{ color: "red" }}>
            {addPost.error.message}

            {addPost.error.data?.zod && (
              <pre>{JSON.stringify(addPost.error.data.zod, null, 4)}</pre>
            )}
          </p>
        )}
      </fieldset>
    </form>
  );
}
