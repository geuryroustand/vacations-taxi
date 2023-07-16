/** @type {import('next-sitemap').IConfig} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  siteUrl: "https://www.vacationstaxis.com/",
  generateRobotsTxt: true,
  exclude: [
    "/booking-details",
    "/payment-details",
    "/terms-and-conditions",
    "/contact-us",
    "/privacy-notice",
    "/about-us",
    "/404",
    "/blogs",
    "/booking-confirmation"
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/booking-details" },
      { userAgent: "*", disallow: "/payment-details" },
      { userAgent: "*", disallow: "/terms-and-conditions" },
      { userAgent: "*", disallow: "/contact-us" },
      { userAgent: "*", disallow: "/privacy-notice" },
      { userAgent: "*", disallow: "/about-us" },
      { userAgent: "*", disallow: "/404" },
      { userAgent: "*", disallow: "/blogs" },
      { userAgent: "*", disallow: "/booking-confirmation" },
      { userAgent: "*", allow: "/blogs/" },
      { userAgent: "*", allow: "/" }
    ]
  }
};
