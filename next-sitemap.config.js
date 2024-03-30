/** @type {import('next-sitemap').IConfig} */
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
  siteUrl: "https://www.vacationstaxis.com",
  generateRobotsTxt: true,
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
    "/blog",
    "es/blog",
    "/booking-confirmation",
    "es/booking-confirmation",
    "/signup",
    "es/signup",
    "/login",
    "es/login",
    "/offer-and-request-rides",
    "es/offer-and-request-rides",
    "/rideshare/",
    "es/rideshare/"
  ],

  alternateRefs: [
    {
      href: "https://www.vacationstaxis.com/",
      hreflang: "es"
    }
  ],
  transform: async (config, path) => {
    const multilingualPaths = [
      {
        path: "/punta-cana-airport-transfers",
        lang: "es",
        translatedPath: "/traslado-en-punta-cana"
      },
      {
        path: "/",
        lang: "es",
        translatedPath: "/es"
      },
      {
        path: "/santo-domingo-airport-transfers",
        lang: "es",
        translatedPath: "/aeropuerto-de-santo-domingo-las-americas"
      },
      {
        path: "/puerto-plata-airport-transfers",
        lang: "es",
        translatedPath: "/aeropuerto-de-puerto-plata"
      },
      {
        path: "/la-romana-airport-transfer",
        lang: "es",
        translatedPath: "/aeropuerto-la-romana"
      }
    ];

    const currentPathDetails = multilingualPaths.find((item) => item.path === path);

    if (currentPathDetails) {
      return {
        loc: `${config.siteUrl}${currentPathDetails.path}`,
        changefreq: config.changefreq,
        priority: config.priority,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
        alternateRefs: [
          {
            href: `${config.siteUrl}${currentPathDetails.translatedPath}`,
            hreflang: currentPathDetails.lang
          }
        ]
      };
    }

    return {
      loc: `${config.siteUrl}${path}`,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? []
    };
  },
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
      { userAgent: "*", disallow: "/" },
      { userAgent: "*", disallow: "es/500" },
      { userAgent: "*", disallow: "/blog" },
      { userAgent: "*", disallow: "es/blog" },
      { userAgent: "*", disallow: "/booking-confirmation" },
      { userAgent: "*", disallow: "es/booking-confirmation" },
      { userAgent: "*", allow: "/blog/" },
      { userAgent: "*", allow: "es/blog/" },
      { userAgent: "*", allow: "/" }
    ]
  }
};
