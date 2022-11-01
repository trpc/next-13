// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
const { env } = require("./server/env");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  webpack: (config, options) => {
    config.experiments = { ...config.experiments, ...{ topLevelAwait: true } };
    return config;
  },
};

module.exports = nextConfig;
