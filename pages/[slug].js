/* eslint-disable no-unused-vars */
import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";

import FallBackLoading from "../src/Components/Loading/FallBackLoading";
import styled from "./locationsName.module.css";

import MyHead from "../src/Components/MyHead/MyHead";
import { getTranslation } from "../src/redux/fetchApiSlice";
import store from "../src/redux/store";

const DynamicHeader = dynamic(() => import("../src/Components/Header/Header"), {
  loading: () => <FallBackLoading />
});

const DynamicTrusted = dynamic(() => import("../src/Components/Trusted/Trusted"), {
  loading: () => <FallBackLoading />
});

function PagesForSEO({ locations }) {
  // const { article1, article2, desc, heading1, keywords, title } = locationFound;
  // const keywordSplit = keywords.split(",");

  // const firstKeyWord = keywordSplit[0];
  // const secondKeyWord = keywordSplit[1];
  // const thirdKeyWord = keywordSplit[2];

  console.log("locations", locations);
  return <p>hi</p>;
  // return (
  //   <>
  //     <MyHead
  //       title={title}
  //       desc={desc}
  //       keyword={keywords}
  //       canonicalURL={heading1.replaceAll(" ", "-").toLowerCase()}
  //     />

  //     <DynamicHeader heading1={heading1} heading1Paragraph={desc} />
  //     <DynamicTrusted
  //       altAirPlane={firstKeyWord}
  //       altCreditCart={secondKeyWord}
  //       altPayment={thirdKeyWord}
  //     />
  //     <Container className={styled.articleContainer}>
  //       <article>
  //         <h2 className={styled.articleHeading}>{article1.title}</h2>
  //         <p>{article1.paragraph}.</p>
  //       </article>
  //       <article>
  //         <h2 className={styled.articleHeading}>{article2.title}</h2>
  //         <p>{article2.paragraph}.</p>
  //       </article>
  //     </Container>
  //   </>
  // );
}

export async function getStaticPaths() {
  const response = await fetch("http://0.0.0.0:1337/api/seo-locations?populate=localizations");
  const { data } = await response.json();

  const paths = data.flatMap((item) => {
    const topLevelSlug = item.attributes.slug;
    const topLevelLocale = item.attributes.locale;
    const languageSlugs = item.attributes.localizations.data.map((localization) => ({
      locale: localization.attributes.locale,
      slug: localization.attributes.slug
    }));
    const topLevelPath = { params: { slug: topLevelSlug }, locale: topLevelLocale };
    const languagePaths = languageSlugs.map(({ locale, slug }) => ({
      params: { slug },
      locale
    }));

    return [topLevelPath, ...languagePaths];
  });

  return {
    paths,
    fallback: false
  };
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale, params }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
  const PROD = process.env.NODE_ENV === "production";

  try {
    const { slug, locale: localeParameters } = params;
    const response = await fetch(
      `${
        PROD
          ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/seoLocations`
          : `http://0.0.0.0:1337/api/seo-locations?locale=${localeParameters}&filters[slug][$eq]=${slug}&populate[seo][populate]=all`
      }`
    );

    const content = await response.json();

    return {
      props: {
        content
      }
      // revalidate: 3600 // Re-generate this page after 1 hour (can be adjusted as needed)
    };
  } catch {
    return {
      notFound: true
    };
  }
});

export default PagesForSEO;
