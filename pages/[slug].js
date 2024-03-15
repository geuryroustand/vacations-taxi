import dynamic from "next/dynamic";
import Script from "next/script";

import Markdown from "react-markdown";
import Container from "react-bootstrap/Container";

import FallBackLoading from "../src/Components/Loading/FallBackLoading";
import styled from "./locationsName.module.css";

import SeoHead from "../src/Components/SeoHead/SeoHead";

import store from "../src/redux/store";
import addOrganizationJsonLd from "../src/Helper/addOrganizationJsonLd";

import { fetchCommonContent } from "../src/redux/ContentEndpoints";
import { baseURL } from "../environment";
import fetchData from "../src/Helper/fetchData";

const DynamicHeader = dynamic(() => import("../src/Components/Header/Header"), {
  loading: () => <FallBackLoading />
});

const DynamicTrusted = dynamic(() => import("../src/Components/Trusted/Trusted"), {
  loading: () => <FallBackLoading />
});
const DynamicAwards = dynamic(() => import("../src/Components/Awards/Awards"), {
  loading: () => <FallBackLoading />
});

const Article = ({ content }) => {
  const articleHeading = ({ children }) => <h2 className={styled.articleHeading}>{children}</h2>;
  const articleHeading3 = ({ children }) => (
    <h3 className={styled.articleHeadingTwo}>{children}</h3>
  );

  return (
    <article>
      <Markdown components={{ h2: articleHeading, h3: articleHeading3 }}>{content}</Markdown>
    </article>
  );
};

function PagesForSEO({ description2, description1, description3, seo, paths, trusted }) {
  const { canonicalURL, keywords, metaDescription, metaTitle, structuredData = [] } = seo || {};

  return (
    <>
      {structuredData?.map((jsonLD, index) => (
        <Script
          strategy="lazyOnload"
          id={`organization-jsonLD-${index}`}
          type="application/ld+json"
          // eslint-disable-next-line react/no-array-index-key
          key={`organization-jsonLD-${index}`}
          dangerouslySetInnerHTML={addOrganizationJsonLd(jsonLD)}
        />
      ))}
      <SeoHead
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
        <DynamicAwards />
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

async function generatePathsForLocales(locales) {
  try {
    const paths = await Promise.all(
      locales.map(async (locale) => {
        const { data = [] } = await fetchData(`${baseURL}/seo-locations?locale=${locale}`);

        return Promise.all(
          data.map(async (content) => {
            const { slug, locale: pathLocale } = content.attributes;
            return {
              params: { slug },
              locale: pathLocale
            };
          })
        );
      })
    );

    return paths.flat();
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error generating paths:", error);
    return [];
  }
}

export async function getStaticPaths({ locales = [] }) {
  try {
    const generatedPaths = await generatePathsForLocales(locales);

    return {
      paths: generatedPaths,
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
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ params, locale }) => {
  try {
    const { dispatch } = storeValue;
    if (locale) {
      await fetchTranslationData(dispatch, locale);
    }

    const { slug } = params;

    const response = await fetchData(
      `${baseURL}/seo-locations?locale=${locale}&filters[slug][$eq]=${slug}&populate=*`
    );
    const content = response.data[0].attributes;

    const { description2 = "", description1 = "", description3 = "", seo = {} } = content || {};

    const paths = response.data.flatMap((element) => extractPaths(element));

    // TODO The content of this fetch need to be add to the global endpoint
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
