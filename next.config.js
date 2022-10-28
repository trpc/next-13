// @ts-check

/* eslint-disable @typescript-eslint/no-var-requires */
const { env } = require('./server/env');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    runtime: 'experimental-edge', // 'node.js' (default) | experimental-edge

  },
};

module.exports = nextConfig
