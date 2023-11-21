/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "raw.githubusercontent.com" }],
  },
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
