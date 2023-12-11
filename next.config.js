/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    environment: "DEVELOPMENT", // DEVELOPMENT OR PRODUCTION
    development_url: "192.168.105.48",
  },
};

module.exports = nextConfig;
