/** @type {import('next').NextConfig} */
// eslint-disable-next-line unicorn/prefer-module
const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.tripadvisor.com"
      },
      {
        protocol: "https",
        hostname: "**res.cloudinary.com"
      }
    ],
    formats: ["image/avif", "image/webp"]
  },
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en"
  }
};

module.exports = nextConfig;

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: true
// });
// module.exports = withBundleAnalyzer({});
