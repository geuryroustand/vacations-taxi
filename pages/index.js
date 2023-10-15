import Script from "next/script";
import dynamic from "next/dynamic";
import Head from "next/head";

// import { useTranslation } from "next-i18next";
// import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import FallBackLoading from "../src/Components/Loading/FallBackLoading";

// import { useEffect } from "react";

// import { persistor } from "../src/redux/store";

const DynamicHeader = dynamic(() => import("../src/Components/Header/Header"), {
  loading: () => <FallBackLoading />
});

const DynamicTrusted = dynamic(() => import("../src/Components/Trusted/Trusted"), {
  loading: () => <FallBackLoading />
});

const DynamicHowWork = dynamic(() => import("../src/Components/HowWork/HowWork"), {
  loading: () => <FallBackLoading />
});

const DynamicFaq = dynamic(() => import("../src/Components/Faq/Faq"), {
  loading: () => <FallBackLoading />
});

const DynamicAwards = dynamic(() => import("../src/Components/Awards/Awards"), {
  loading: () => <FallBackLoading />
});

export default function Home({
  oneWay,
  roundTrip,
  headingOne,
  paragraph,
  trusted,
  howItWorkHeading,
  howItWork
}) {
  // const { t } = useTranslation();
  // persistor.purge();

  return (
    <>
      <Head>
        {/* Facebook Meta Tag */}

        <meta property="og:url" content="https://www.vacationstaxis.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Book A Taxi Online | Airport Transportation" />
        <meta
          property="og:description"
          content="Book a taxi online for easy airport transfers to/from your accommodation. Various taxi transportation services. Tried & trusted. Flight tracking. 24/7 support."
        />
        <meta property="og:image" content="https://www.vacationstaxis.com/images/openGraph.jpg" />

        {/* Twitter Meta Tag */}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="vacationstaxis.com" />
        <meta property="twitter:url" content="https://www.vacationstaxis.com/" />
        <meta property="twitter:title" content="Book A Taxi Online | Airport Transportation" />
        <meta
          property="twitter:description"
          content="Book a taxi online for easy airport transfers to/from your accommodation. Various taxi transportation services. Tried & trusted. Flight tracking. 24/7 support."
        />
        <meta
          property="twitter:image"
          content="https://www.vacationstaxis.com/images/openGraph.jpg"
        />
      </Head>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${
          process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
        }`}
        strategy="lazyOnload"
      />

      {/* <Script id="google-analytics" strategy="worker">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'https://www.googletagmanager.com/gtag/js?id=${
          process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
        }');
      `}
      </Script> */}

      <Script
        id="google-analytics"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'https://www.googletagmanager.com/gtag/js?id=${
          process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
        }');
      `
        }}
      />

      <DynamicHeader
        heading1={headingOne}
        heading1Paragraph={paragraph}
        oneWay={oneWay}
        roundTrip={roundTrip}
      />

      <DynamicTrusted trusted={trusted} />

      <DynamicHowWork howItWorkHeading={howItWorkHeading} howItWork={howItWork} />
      <DynamicAwards />
      <DynamicFaq />
    </>
  );
}

export async function getStaticProps({ locale }) {
  const response = await fetch(`http://0.0.0.0:1337/api/home-page?populate=*&locale=${locale}`);
  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }
  const seoLocations = await response.json();

  const { oneWay, roundTrip, headingOne, paragraph, trusted, howItWorkHeading, howItWork } =
    seoLocations.data.attributes;

  return {
    props: { oneWay, roundTrip, headingOne, paragraph, trusted, howItWorkHeading, howItWork }
  };
}
