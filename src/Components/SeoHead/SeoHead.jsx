import Head from "next/head";

import { useRouter } from "next/router";
import React from "react";

const SeoHead = ({
  title,
  desc,
  keyword,
  noIndex,
  canonicalURL,
  openGraphImg,
  paths = [],
  metaSocial = []
}) => {
  const { locale: language } = useRouter();
  const isEnglish = language === "en";

  const getCanonicalURL = () => {
    if (canonicalURL) {
      return `${
        isEnglish
          ? `https://www.vacationstaxis.com/${canonicalURL}`
          : `https://www.vacationstaxis.com/${language}/${canonicalURL}`
      }`;
    }
    return isEnglish
      ? "https://www.vacationstaxis.com"
      : `https://www.vacationstaxis.com/${language}`;
  };

  const getMetaTags = () => {
    const urlPrefix = isEnglish
      ? "https://www.vacationstaxis.com"
      : `https://www.vacationstaxis.com/${language}`;

    const ogUrl = canonicalURL ? `${urlPrefix}/${canonicalURL}` : urlPrefix;

    const tags = {
      canonical: getCanonicalURL(),
      ogUrl,
      ogType: "website",
      ogTitle: metaSocial ? metaSocial[0]?.title || title : title,
      ogDesc: metaSocial ? metaSocial[0]?.description || desc : desc,
      ogImg: openGraphImg
        ? `https://www.vacationstaxis.com/images/${openGraphImg}`
        : "https://www.vacationstaxis.com/images/openGraph.jpg"
    };

    return {
      ...tags,
      twitterCard: "summary_large_image",
      twitterDomain: "vacationstaxis.com",
      twitterUrl: tags.canonical
    };
  };

  const generateMetaTag = (property, content) => {
    return <meta property={property} content={content} key={property} />;
  };

  const generateLinkTag = (linkRelated, hrefLang, href) => {
    return (
      <link
        rel={linkRelated}
        hrefLang={hrefLang}
        href={href}
        key={hrefLang ? `${linkRelated}-${hrefLang}` : "canonical"}
      />
    );
  };

  const metaTags = getMetaTags();

  return (
    <Head>
      {title && <title>{title}</title>}
      {desc && <meta name="description" content={desc} />}
      {keyword && <meta name="keywords" content={keyword} />}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {generateLinkTag("canonical", undefined, metaTags.canonical)}

      {generateMetaTag("og:url", metaTags.ogUrl)}
      {generateMetaTag("og:type", metaTags.ogType)}
      {generateMetaTag("og:title", metaTags.ogTitle)}
      {generateMetaTag("og:description", metaTags.ogDesc)}
      {generateMetaTag("og:image", metaTags.ogImg)}

      {generateMetaTag("twitter:card", metaTags.twitterCard)}
      {generateMetaTag("twitter:domain", metaTags.twitterDomain)}
      {generateMetaTag("twitter:url", metaTags.twitterUrl)}
      {generateMetaTag("twitter:title", metaTags.ogTitle)}
      {generateMetaTag("twitter:description", metaTags.ogDesc)}
      {generateMetaTag("twitter:image", metaTags.ogImg)}

      {paths.map(({ params: { slug }, locale }) => (
        <React.Fragment key={locale}>
          {generateLinkTag(
            "alternate",
            locale,
            `${
              locale === "en"
                ? `https://www.vacationstaxis.com/${slug}`
                : `https://www.vacationstaxis.com${`/${locale}`}/${slug}`
            }`
          )}
          {locale === "en" &&
            generateLinkTag("alternate", "x-default", `https://www.vacationstaxis.com/${slug}`)}
        </React.Fragment>
      ))}
    </Head>
  );
};

export default SeoHead;
