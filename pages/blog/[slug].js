import Script from "next/script";
import Image from "next/image";
import Link from "next/link";

import Container from "react-bootstrap/Container";
import Markdown from "react-markdown";

import styled from "./posts.module.css";

import store from "../../src/redux/store";

import addOrganizationJsonLd from "../../src/Helper/addOrganizationJsonLd";
import Loading from "../../src/Components/Loading/Loading";
import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import { baseURL } from "../../environment";
import fetchData from "../../src/Helper/fetchData";

export default function Blog({
  description,
  slugURL,
  metaTitle,
  metaDescription,
  keywords,
  structuredData,
  metaSocial = []
}) {
  const imgNextImage = ({ alt, src }) => (
    <Image className={styled.postImgs} width={1200} height={500} src={src} alt={alt} />
  );
  const heading1 = ({ children }) => <h1 className={styled.postHeading}>{children}</h1>;
  const link = ({ children, href }) => <Link href={href}>{children}</Link>;
  const p = ({ children }) => <p className={styled.postContentCenter}>{children}</p>;
  const h2 = ({ children }) => <h2 className={styled.postContentCenterHeading}>{children}</h2>;

  if (!description) {
    return <Loading spinnerTitle="Loading..." accessibilityTitle="Loading" />;
  }

  return (
    <>
      {structuredData &&
        structuredData.map((jsonLD, index) => (
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
        canonicalURL={`blog/${slugURL}`}
        metaSocial={metaSocial}
      />
      <Container className={styled.postsContainer}>
        <article className={styled.article}>
          <Markdown components={{ h1: heading1, img: imgNextImage, a: link, p, h2 }}>
            {description}
          </Markdown>
        </article>
      </Container>
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getServerSideProps = store.getServerSideProps(
  (storeValue) =>
    async ({ locale, params, res }) => {
      try {
        const { dispatch } = storeValue;
        if (locale) {
          await fetchTranslationData(dispatch, locale);
        }

        const { slug } = params;

        const { data } = await fetchData(
          `${baseURL}/blogs?filters[slug][$eq]=${slug}&locale=${locale}&populate[seo][populate]=*`
        );

        if (!data || data.length === 0) {
          res.statusCode = 404;
          return {
            notFound: true
          };
        }
        const { description, slug: slugURL, seo } = data[0].attributes;
        const { metaTitle, metaDescription, keywords, structuredData, metaSocial } = seo;

        return {
          props: {
            description,
            slugURL,
            metaTitle,
            metaDescription,
            keywords,
            structuredData,
            metaSocial
          }
        };
      } catch (error) {
        if (error.response && error.response.status === 500) {
          res.writeHead(500, { Location: "/500" });
          res.end();
          return { props: {} };
        }
        res.writeHead(404, { Location: "/404" });
        res.end();
        return { props: {} };
      }
    }
);
