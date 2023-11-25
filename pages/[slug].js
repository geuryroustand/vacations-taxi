/* eslint-disable no-unused-vars */
import dynamic from "next/dynamic";
import Markdown from "react-markdown";
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

function PagesForSEO({ description2, description1, description3, seo, paths }) {
  // const { article1, article2, desc, heading1, keywords, title } = locationFound;
  // const keywordSplit = keywords.split(",");

  // const firstKeyWord = keywordSplit[0];
  // const secondKeyWord = keywordSplit[1];
  // const thirdKeyWord = keywordSplit[2];

  console.log(seo);
  const articleHeading = ({ children }) => <h2 className={styled.articleHeading}>{children}</h2>;
  const { canonicalURL, keywords, metaDescription, metaTitle, structuredData } = seo;
  return (
    <>
      <MyHead
        title={metaTitle}
        desc={metaDescription}
        keyword={keywords}
        canonicalURL={canonicalURL}
        paths={paths}
      />
      <DynamicHeader desc={description1} />;
      {/* <DynamicTrusted
        altAirPlane="dominican airport transfers"
        altCreditCart="shuttle central dominican republic"
        altPayment="dominican republic airport transfers"
      /> */}
      <Container className={styled.articleContainer}>
        <article>
          <Markdown components={{ h2: articleHeading }}>{description2}</Markdown>
        </article>
        <article>
          <Markdown components={{ h2: articleHeading }}>{description3}</Markdown>
        </article>
      </Container>
    </>
  );
}

export async function getStaticPaths() {
  const response = await fetch("http://0.0.0.0:1337/api/seo-locations?populate=localizations");
  const { data } = await response.json();

  const paths = data.flatMap((item) => {
    const mainLanguageSlug = item.attributes.slug;
    const mainLanguageLocale = item.attributes.locale;

    const localizationsLanguages = item.attributes.localizations.data.map((localization) => ({
      locale: localization.attributes.locale,
      slug: localization.attributes.slug
    }));
    const topLevelPath = { params: { slug: mainLanguageSlug }, locale: mainLanguageLocale };

    const languagePaths = localizationsLanguages.map(({ locale, slug }) => ({
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

export const getStaticProps = store.getStaticProps((storeValue) => async ({ params, locale }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
  const PROD = process.env.NODE_ENV === "production";

  try {
    const { slug } = params;

    const response = await fetch(
      `${
        PROD
          ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/seoLocations`
          : `http://0.0.0.0:1337/api/seo-locations?locale=${locale}&filters[slug][$eq]=${slug}&populate[seo][populate]=all`
      }`
    );

    const { data } = await response.json();

    const content = { ...data };

    const { attributes } = content[0];

    const { description2, description1, description3, seo } = attributes;

    const responsePaths = await fetch(
      "http://0.0.0.0:1337/api/seo-locations?populate=localizations"
    );
    const { data: dataPath } = await responsePaths.json();

    const paths = dataPath.flatMap((item) => {
      const mainLanguageSlug = item.attributes.slug;
      const mainLanguageLocale = item.attributes.locale;

      const localizationsLanguages = item.attributes.localizations.data.map((localization) => ({
        locale: localization.attributes.locale,
        slug: localization.attributes.slug
      }));
      const topLevelPath = { slug: mainLanguageSlug, locale: mainLanguageLocale };

      const languagePaths = localizationsLanguages.map(
        ({ locale: localePath, slug: slugPath }) => ({
          slug: slugPath,
          locale: localePath
        })
      );

      return [topLevelPath, ...languagePaths];
    });

    return {
      props: {
        description2,
        description1,
        description3,
        seo,
        paths
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
