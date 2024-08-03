import Script from "next/script";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";

import FallBackLoading from "../src/Components/Loading/FallBackLoading";
import store from "../src/redux/store";

import addOrganizationJsonLd from "../src/Helper/addOrganizationJsonLd";

import { fetchCommonContent } from "../src/redux/ContentEndpoints";
import fetchData from "../src/Helper/fetchData";
import { baseURL } from "../environment";

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
  howItWork,
  seo
}) {
  const { keywords, metaDescription, metaTitle, structuredData = [] } = seo[0];

  const { locale } = useRouter();

  return (
    <>
      {structuredData.map((jsonLD, index) => (
        <Script
          strategy="lazyOnload"
          id={`organization-jsonLD-${index}`}
          type="application/ld+json"
          // eslint-disable-next-line react/no-array-index-key
          key={`organization-jsonLD-${index}`}
          dangerouslySetInnerHTML={addOrganizationJsonLd(jsonLD)}
        />
      ))}

      <Head>
        {locale === "en" ? (
          <link key="canonical" rel="canonical" href="https://www.vacationstaxis.com" />
        ) : (
          <link key="canonical" rel="canonical" href={`https://www.vacationstaxis.com/${locale}`} />
        )}

        <link rel="alternate" hrefLang="en" href="https://www.vacationstaxis.com" key="en" />
        <link rel="alternate" hrefLang="es" href="https://www.vacationstaxis.com/es" key="es" />
        <link rel="alternate" hrefLang="x-default" href="https://www.vacationstaxis.com" />
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={keywords} />

        {/* Facebook Meta Tag */}

        <meta property="og:url" content="https://www.vacationstaxis.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content="https://www.vacationstaxis.com/images/openGraph.jpg" />

        {/* Twitter Meta Tag */}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://www.vacationstaxis.com" />
        <meta property="twitter:url" content="https://www.vacationstaxis.com" />
        <meta property="twitter:title" content={metaTitle} />
        <meta property="twitter:description" content={metaDescription} />
        <meta
          property="twitter:image"
          content="https://www.vacationstaxis.com/images/openGraph.jpg"
        />
      </Head>

      {/* !-- Meta Pixel Code --> */}

      <Script
        strategy="lazyOnload"
        id="facebook-pixel"
        dangerouslySetInnerHTML={{
          __html: ` !function(f,b,e,v,n,t,s)
                    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                    n.queue=[];t=b.createElement(e);t.async=!0;
                    t.src=v;s=b.getElementsByTagName(e)[0];
                    s.parentNode.insertBefore(t,s)}(window, document,'script',
                    'https://connect.facebook.net/en_US/fbevents.js');
                    fbq('init', '${
                      process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_META_PIXEL_ID
                    }');
                    fbq('track', 'PageView');
                    `
        }}
      />

      <noscript
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: `<img
          height="1"
          width="1"
          style="display:none"
          src="https://www.facebook.com/tr?id=${
            process.env.NODE_ENV === "production" && process.env.NEXT_PUBLIC_META_PIXEL_ID
          }&ev=PageView&noscript=1"
        />`
        }}
      />

      {/* <!-- End Meta Pixel Code --> */}

      <DynamicHeader
        desc={description}
        oneWay={oneWay}
        roundTrip={roundTrip}
        showReturnSearchForm
      />

      <DynamicTrusted trusted={trusted} />

      <DynamicHowWork howItWorkHeading={howItWorkHeading} howItWork={howItWork} />
      <DynamicAwards />
      <DynamicFaq />
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
  const { data } = await fetchData(`${baseURL}/home-page?populate=*&locale=${locale}`);

  const { oneWay, roundTrip, description, trusted, howItWorkHeading, howItWork, seo } =
    data.attributes || {};

  return {
    props: { oneWay, roundTrip, description, trusted, howItWorkHeading, howItWork, seo }
  };
});
