

## Sketches

I got better understanding now.. seems like Next.js is shifting to be SSR-first.

React Context Providers are also not supported for RSC (unsure if its in the plans at all)

What this means for tRPC is that we'll likely want to create a server-side only hook helper that wouldn't be built on react-query

Sketching a bit....

**1. Entry point for tRPC for `/app` / RSC components:**

```ts
// /app/trpc.ts
import { headers } from "next/headers";

import { appRouter } from "~/server/routers/_app"
import { createTRPCNextLayout } from "~/server/routers/_app"
import { createContext } from "~/server/context"

if (typeof window !== "undefined") {
  throw new Error("This should not be imported in the browser")
}

const trpc = createTRPCNextLayout({ 
  appRouter,
  createContext,
})

```

**2. Context creation would use the `next/headers`:**
```ts
// /server/context.ts
import { headers } from "next/headers";

export async function createContext() {
  const cookies = headersList.get("cookie");
  // do stuff with cookies

  return {
    // [..]
  }
}
```

**3. .... then, usage could be liiiike**

```ts
// /app/page.tsx
import {trpc} from "~/app/trpc";

export default function Page() {
  const posts = trpc.post.list();


  return (
    <>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </>
  );
}
```


**4. and mutations could be something like**

```tsx
"use client";
import { useRouter } from "next/navigation";

import {trpc} from "~/client/trpc";

export function MyForm() {
  const router = useRouter();

  return (
    <>
      <h2>Add post</h2>
      <button onClick={async () => {
        await trpc.post.create.mutate({
          title: 'hello next.js 13',
        });
        router.reload();
      }}></button>
    </>
  );
}
```