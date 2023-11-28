import Script from "next/script";
import dynamic from "next/dynamic";
import Head from "next/head";

import FallBackLoading from "../src/Components/Loading/FallBackLoading";
import store from "../src/redux/store";
import { getTranslation } from "../src/redux/fetchApiSlice";
import addOrganizationJsonLd from "../src/Helper/addOrganizationJsonLd";

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
  description,
  trusted,
  howItWorkHeading,
  howItWork
}) {
  return (
    <>
      <Script
        strategy="lazyOnload"
        id="organization-jsonLD"
        type="application/ld+json"
        key="organization-jsonLD"
        dangerouslySetInnerHTML={addOrganizationJsonLd()}
      />

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

      <DynamicHeader desc={description} oneWay={oneWay} roundTrip={roundTrip} />

      <DynamicTrusted trusted={trusted} />

      <DynamicHowWork howItWorkHeading={howItWorkHeading} howItWork={howItWork} />
      <DynamicAwards />
      <DynamicFaq />
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }

  const response = await fetch(`http://0.0.0.0:1337/api/home-page?populate=*&locale=${locale}`);
  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }

  const seoLocations = await response.json();

  const { oneWay, roundTrip, description, trusted, howItWorkHeading, howItWork } =
    seoLocations.data.attributes || {};

  return {
    props: { oneWay, roundTrip, description, trusted, howItWorkHeading, howItWork }
  };
});
