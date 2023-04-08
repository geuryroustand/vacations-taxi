/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // env: {
  //   NEXTRUNTIME: "development"
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.tripadvisor.com"
      }
    ],
    formats: ["image/avif", "image/webp"]
  }
};

module.exports = nextConfig;

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: true
// });
// module.exports = withBundleAnalyzer({});
