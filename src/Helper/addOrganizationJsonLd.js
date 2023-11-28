const addOrganizationJsonLd = (jsonLD) => {
  return {
    __html:
      JSON.stringify(jsonLD) ||
      `{
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": " vacationsTaxi.com",
      "url": "https://www.vacationstaxis.com/",
      "logo":"https://res.cloudinary.com/dakkezj8u/image/upload/v1700392099/Vacations_fe5927c27a.png",
      "contactPoint": [
          {
              "@type": "ContactPoint",
              "telephone": "+1 360-860-7857",
              "contactType": "customer service",
              "areaServed": [
                  "United States"
              ],
              "availableLanguage": [
                  "English"
           ]
         }
     ]
    }
`
  };
};

export default addOrganizationJsonLd;
