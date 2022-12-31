/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://vacations-taxi.vercel.app",
  generateRobotsTxt: true,
  exclude: ["/booking-details", "/payment-details", "/terms-and-conditions", "/contact-us"],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/booking-details" },
      { userAgent: "*", disallow: "/payment-details" },
      { userAgent: "*", disallow: "/terms-and-conditions" },
      { userAgent: "*", disallow: "/contact-us" },
      { userAgent: "*", allow: "/" }
    ]
  }
};
