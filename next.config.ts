/** @format */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  // L'API est appelée depuis le navigateur par d'autres projets.
  headers: async () => [
    {
      source: "/api/:path*",
      headers: [
        {
          key: "Access-Control-Allow-Origin",
          value: process.env.CORS_ORIGIN ?? "*",
        },
        {
          key: "Access-Control-Allow-Methods",
          value: "GET,POST,PATCH,DELETE,OPTIONS",
        },
        { key: "Access-Control-Allow-Headers", value: "Content-Type, x-app-source" },
      ],
    },
  ],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
