import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const MyHead = ({
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

  const [facebook, twitter] = metaSocial;

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
          href={
            canonicalURL
              ? `https://www.vacationstaxis.com/${canonicalURL}`
              : "`https://www.vacationstaxis.com"
          }
        />
      ) : (
        <link
          key="canonical"
          rel="canonical"
          href={
            canonicalURL
              ? `https://www.vacationstaxis.com/${language}/${canonicalURL}`
              : `https://www.vacationstaxis.com/${language}`
          }
        />
      )}

      {paths.map(({ params: { slug }, locale }) => (
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

      <meta
        property="og:url"
        content={
          canonicalURL
            ? `https://www.vacationstaxis.com/${canonicalURL}`
            : "https://www.vacationstaxis.com"
        }
      />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaSocial ? facebook?.title : title} />
      <meta property="og:description" content={metaSocial ? facebook?.description : desc} />
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
      <meta
        property="twitter:url"
        content={
          canonicalURL
            ? `https://www.vacationstaxis.com/${canonicalURL}`
            : "https://www.vacationstaxis.com"
        }
      />
      <meta property="twitter:title" content={metaSocial ? twitter?.title : title} />
      <meta property="twitter:description" content={metaSocial ? twitter?.description : desc} />
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
