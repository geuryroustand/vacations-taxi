import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const MyHead = ({ title, desc, keyword, noIndex, canonicalURL, openGraphImg, paths = [] }) => {
  const { locale: language } = useRouter();

  return (
    <Head>
      {title && <title>{title}</title>}
      {desc && <meta name="description" content={desc} />}
      {keyword && <meta name="keywords" content={keyword} />}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />

      {language === "en" ? (
        <link
          key="canonical"
          rel="canonical"
          href={`https://www.vacationstaxis.com/${canonicalURL}`}
        />
      ) : (
        <link
          key="canonical"
          rel="canonical"
          href={`https://www.vacationstaxis.com/${language}/${canonicalURL}`}
        />
      )}

      {paths.map(({ slug, locale }) => (
        <React.Fragment key={locale}>
          <link
            rel="alternate"
            hrefLang={locale}
            href={`https://www.vacationstaxis.com${locale === "en" ? "" : `/${locale}`}/${slug}`}
            key={locale}
          />
          {locale === "en" && (
            <link
              rel="alternate"
              hrefLang="x-default"
              href={`https://www.vacationstaxis.com/${slug}`}
            />
          )}
        </React.Fragment>
      ))}

      {/* Facebook Meta Tag */}

      <meta property="og:url" content={`https://www.vacationstaxis.com/${canonicalURL}`} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta
        property="og:image"
        content={
          openGraphImg
            ? `https://www.vacationstaxis.com/images/${openGraphImg}`
            : "https://www.vacationstaxis.com/images/openGraph.jpg"
        }
      />

      {/* Twitter Meta Tag */}

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="vacationstaxis.com" />
      <meta property="twitter:url" content={`https://www.vacationstaxis.com/${canonicalURL}`} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />
      <meta
        property="twitter:image"
        content={
          openGraphImg
            ? `https://www.vacationstaxis.com/images/${openGraphImg}`
            : "https://www.vacationstaxis.com/images/openGraph.jpg"
        }
      />
    </Head>
  );
};

export default MyHead;
