import dynamic from "next/dynamic";
import Script from "next/script";

import Markdown from "react-markdown";
import Container from "react-bootstrap/Container";

import FallBackLoading from "../src/Components/Loading/FallBackLoading";
import styled from "./locationsName.module.css";

import MyHead from "../src/Components/MyHead/MyHead";
import { getTranslation } from "../src/redux/fetchApiSlice";
import store from "../src/redux/store";
import addOrganizationJsonLd from "../src/Helper/addOrganizationJsonLd";
import { baseURL, fetchData } from "../src/Helper/fetchData";

const DynamicHeader = dynamic(() => import("../src/Components/Header/Header"), {
  loading: () => <FallBackLoading />
});

const DynamicTrusted = dynamic(() => import("../src/Components/Trusted/Trusted"), {
  loading: () => <FallBackLoading />
});

const Article = ({ content }) => {
  const articleHeading = ({ children }) => <h2 className={styled.articleHeading}>{children}</h2>;

  return (
    <article>
      <Markdown components={{ h2: articleHeading }}>{content}</Markdown>
    </article>
  );
};

function PagesForSEO({ description2, description1, description3, seo, paths, trusted }) {
  const { canonicalURL, keywords, metaDescription, metaTitle, structuredData = [] } = seo;
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
      <MyHead
        title={metaTitle}
        desc={metaDescription}
        keyword={keywords}
        canonicalURL={canonicalURL}
        paths={paths}
      />
      <DynamicHeader desc={description1} />
      <DynamicTrusted trusted={trusted} />
      <Container className={styled.articleContainer}>
        <Article content={description2} />
        <Article content={description3} />
      </Container>
    </>
  );
}

const extractPaths = (item) => {
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
};

export async function getStaticPaths() {
  try {
    const { data } = await fetchData(`${baseURL}/seo-locations?populate=localizations`);
    const paths = data.flatMap((element) => extractPaths(element));

    return {
      paths,
      fallback: false
    };
  } catch {
    return {
      paths: [],
      fallback: false
    };
  }
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ params, locale }) => {
  try {
    const { dispatch } = storeValue;
    if (locale) {
      await fetchTranslationData(dispatch, locale);
    }

    const { slug } = params;

    const response = await fetchData(
      `${baseURL}/seo-locations?locale=${locale}&filters[slug][$eq]=${slug}&populate[seo][populate]=all`
    );
    const content = response.data[0].attributes;

    const { description2 = "", description1 = "", description3 = "", seo = {} } = content || {};

    const responsePaths = await fetchData(`${baseURL}/seo-locations?populate=localizations`);
    const paths = responsePaths.data.flatMap((element) => extractPaths(element));

    const responseTrusted = await fetchData(`${baseURL}/home-page?populate=*&locale=${locale}`);

    if (!responseTrusted.data) {
      throw new Error("No trusted data found.");
    }

    const { trusted } = responseTrusted.data.attributes || {};

    return {
      props: {
        description2,
        description1,
        description3,
        seo,
        paths,
        trusted
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
