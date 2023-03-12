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
  i18n,
  reloadOnPrerender: process.env.NODE_ENV === "development",
  async rewrites() {
    return [
      {
        source: "/es/quienes-somos",
        destination: "/about-us",
        locale: false
      },
      {
        source: "/es/contacte-con-nosotros",
        destination: "/contact-us",
        locale: false
      }
    ];
  }
};

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: true
// });
// module.exports = withBundleAnalyzer({});
