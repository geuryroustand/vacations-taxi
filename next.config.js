/** @type {import('next').NextConfig} */

// const { withHydrationOverlay } = require("@builder.io/react-hydration-overlay/next");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.tripadvisor.com"
      },
      {
        protocol: "https",
        hostname: "**ui-avatars.com"
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

// eslint-disable-next-line unicorn/prefer-module
module.exports = nextConfig;

// To check the Hydration problem in react in dev

// module.exports = withHydrationOverlay({
//   appRootSelector: "main"
// })(nextConfig);

// const withBundleAnalyzer = require("@next/bundle-analyzer")({
//   enabled: process.env.ANALYZE === "true",
//   openAnalyzer: true
// });
// module.exports = withBundleAnalyzer(nextConfig);
