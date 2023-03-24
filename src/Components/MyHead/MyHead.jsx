import Head from "next/head";
import React from "react";

const MyHead = ({ title, desc, keyword, noIndex, canonicalURL }) => {
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
    </Head>
  );
};

export default MyHead;
