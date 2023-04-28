import Head from "next/head";
import React from "react";

const MyHead = ({ title, desc, keyword, noIndex, canonicalURL, openGraphImg }) => {
  return (
    <Head>
      {title && <title>{title}</title>}
      {desc && <meta name="description" content={`${desc}`} />}
      {keyword && <meta name="keywords" content={`${keyword}`} />}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
      <link
        rel="canonical"
        href={`https://www.vacationstaxis.com/${canonicalURL}`}
        key="canonical"
      />

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
