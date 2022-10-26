// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
import { env as _env } from "./server/env";

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
};

export default nextConfig;
