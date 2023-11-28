/** @type {import('next-sitemap').IConfig} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  siteUrl: "https://www.vacationstaxis.com/",
  generateRobotsTxt: true,

  alternateRefs: [
    {
      href: "https://www.vacationstaxis.com/",
      hreflang: "es"
    }
    // {
    //   href: "https://www.vacationstaxis.com/",
    //   hreflang: "en"
    // }
  ],
  exclude: [
    "/booking-details",
    "es/booking-details",
    "/payment-details",
    "es/payment-details",
    "/terms-and-conditions",
    "es/terms-and-conditions",
    "/contact-us",
    "es/contact-us",
    "/privacy-notice",
    "es/privacy-notice",
    "/about-us",
    "es/about-us",
    "/404",
    "es/404",
    "/500",
    "es/500",
    "/blogs",
    "es/blogs",
    "/booking-confirmation",
    "es/booking-confirmation"
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: "*", disallow: "/booking-details" },
      { userAgent: "*", disallow: "es/booking-details" },
      { userAgent: "*", disallow: "/payment-details" },
      { userAgent: "*", disallow: "es/payment-details" },
      { userAgent: "*", disallow: "/terms-and-conditions" },
      { userAgent: "*", disallow: "es/terms-and-conditions" },
      { userAgent: "*", disallow: "/contact-us" },
      { userAgent: "*", disallow: "es/contact-us" },
      { userAgent: "*", disallow: "/privacy-notice" },
      { userAgent: "*", disallow: "es/privacy-notice" },
      { userAgent: "*", disallow: "/about-us" },
      { userAgent: "*", disallow: "es/about-us" },
      { userAgent: "*", disallow: "/404" },
      { userAgent: "*", disallow: "es/404" },
      { userAgent: "*", disallow: "/blogs" },
      { userAgent: "*", disallow: "es/blogs" },
      { userAgent: "*", disallow: "/booking-confirmation" },
      { userAgent: "*", disallow: "es/booking-confirmation" },
      { userAgent: "*", allow: "/blogs/" },
      { userAgent: "*", allow: "es/blogs/" },
      { userAgent: "*", allow: "/" }
    ]
  }
  // transform: async (config, path) => {
  //   console.log("==========Paths===========", path);
  //   // Check if the path is among the paths fetched from your dynamic route
  //   if (config.paths && config.paths.some((p) => path.startsWith(`/${p.params.slug}`))) {
  //     // Logic for generating multilingual URLs based on the dynamic paths
  //     const translations = [
  //       { hreflang: "x-default", href: `https://www.vacationstaxis.com${path}` },
  //       { hreflang: "en", href: `https://www.vacationstaxis.com/en${path}` },
  //       { hreflang: "es", href: `https://www.vacationstaxis.com/es${path}` }
  //       // Add other translations as needed
  //     ];

  //     // Construct the XHTML links for translations
  //     const xhtmlLinks = translations.map(({ hreflang, href }) => ({
  //       rel: "alternate",
  //       hreflang,
  //       href
  //     }));

  //     return {
  //       loc: `https://www.vacationstaxis.com${path}`,
  //       xhtmlLinks
  //     };
  //   }

  //   // For default paths, use the default transformation
  //   return {
  //     loc: `https://www.vacationstaxis.com${path}`,
  //     changefreq: config.changefreq,
  //     priority: config.priority,
  //     lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
  //     alternateRefs: [
  //       { rel: "alternate", hreflang: "x-default", href: `https://www.vacationstaxis.com${path}` },
  //       { rel: "alternate", hreflang: "en", href: `https://www.vacationstaxis.com${path}` },
  //       { rel: "alternate", hreflang: "es", href: `https://www.vacationstaxis.com/es${path}` }
  //     ]
  //   };
  // }
};
