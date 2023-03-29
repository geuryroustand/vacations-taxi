const addOrganizationJsonLd = () => {
  return {
    __html: `{
      "@context": "http://schema.org",
      "@type": "Organization",
      "name": " vacationsTaxi.com",
      "url": "https://www.vacationstaxis.com/",
      "logo":"https://scontent.fixc1-4.fna.fbcdn.net/v/t39.30808-1/326443566_595131909111185_3540242713329036028_n.jpg?stp=dst-jpg_p200x200&_nc_cat=100&ccb=1-7&_nc_sid=c6021c&_nc_ohc=YKfMnHqYITAAX8D0osQ&_nc_ht=scontent.fixc1-4.fna&oh=00_AfDxI8iF7TS2eUMhf5nlo-_QgshZvJhe9sL47zFwj8YiHA&oe=6428688A",
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
