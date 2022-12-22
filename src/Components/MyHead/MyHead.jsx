import Head from "next/head";
import React from "react";

const MyHead = ({ title, desc, keyword, noIndex }) => {
  return (
    <Head>
      {title && <title>{title}</title>}
      {desc && <meta name="description" content={`${desc}`} />}
      {keyword && <meta name="keywords" content={`${keyword}`} />}
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow"} />
    </Head>
  );
};

export default MyHead;
