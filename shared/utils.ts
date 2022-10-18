import { GetInferenceHelpers } from "@trpc/server";
import type { AppRouter } from "~/server/routers/_app";

export type Types = GetInferenceHelpers<AppRouter>;
