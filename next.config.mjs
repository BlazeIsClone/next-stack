/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/utils/env.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'central.objects-us-east-1.dream.io',
        port: '',
        pathname: '/central/**',
      }
    ],
    domains: ['central.objects-us-east-1.dream.io']
  }
};

export default config;
