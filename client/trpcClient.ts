import { createTRPCProxyClient, httpBatchLink, loggerLink } from "@trpc/client";
import type { AppRouter } from "~/server/routers/_app";
import superjson from "superjson";

export const client = createTRPCProxyClient<AppRouter>({
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
