/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    environment: "PRODUCTION", // DEVELOPMENT OR PRODUCTION
    development_url: "192.168.43.48",
  },
};

module.exports = nextConfig;
