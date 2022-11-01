import { createTRPCNextClientLayout } from "@trpc/next-layout/client";
import { AppRouter } from "~/server/routers/_app";

export const rsc = await createTRPCNextClientLayout<AppRouter>();
