/** @type {import('next').NextConfig} */
// eslint-disable-next-line unicorn/prefer-module
const { i18n } = require("./next-i18next.config");

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.tripadvisor.com"
      }
    ]
  },
  i18n
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: true
// });
// module.exports = withBundleAnalyzer({});
