"use client";
import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "~/server/routers/_app";
import superjson from "superjson";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const trpc = createTRPCReact<AppRouter>({
  unstable_overrides: {
    useMutation: {
      async onSuccess(opts) {
        await opts.originalFn();
        await opts.queryClient.invalidateQueries();
      },
    },
  },
});

const queryClient = new QueryClient();
const trpcClient = trpc.createClient({
  links: [
    loggerLink({
      enabled: () => true,
    }),
    httpBatchLink({
      url: "/api/trpc",
    }),
  ],
  transformer: superjson,
});

export function ClientProvider(props: { children: React.ReactNode }) {
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
