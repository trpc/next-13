// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
const { env } = require('./server/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig
