// Copyright (c) Meta Platforms, Inc. and affiliates.

/** @type {import('next').NextConfig} */
const nextConfig = {
  // With webpack, a Server Component that imports from the package root
  // otherwise ships every client component.
  experimental: {
    optimizePackageImports: ['@blue-patterns/core'],
  },
};

export default nextConfig;
