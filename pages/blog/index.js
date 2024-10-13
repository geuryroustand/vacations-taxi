/* eslint-disable unicorn/no-null */
/* eslint-disable react/no-array-index-key */
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Link from "next/link";

import styled from "./posts.module.css";

import store from "../../src/redux/store";

import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import fetchData from "../../src/Helper/fetchData";
import { baseURL } from "../../environment";

export default function Blogs({ data }) {
  const groupedPosts = Array.isArray(data)
    ? [...data]
        .map((_, index) => {
          if (index % 3 === 0) {
            return data.slice(index, index + 3);
          }
          return null;
        })
        .filter((group) => group !== null)
    : [];

  return (
    <>
      <SeoHead title="Blogs" noIndex canonicalURL="blog" />
      <Container className={styled.postsContainer}>
        <h1 className={styled.postsHeading}>Travel Tips:</h1>
        {groupedPosts?.map((group, groupIndex) => (
          <Row key={groupIndex}>
            {group?.map((post) => {
              const { attributes, id } = post || {};
              const { slug, excerpt, title, cover } = attributes || {};
              const coverData = cover?.data?.attributes?.formats?.small;
              const alternativeText = cover?.data?.attributes?.alternativeText;

              return attributes && coverData && id ? (
                <Col key={id} className={styled.cardColumn}>
                  <Link className={styled.cardLink} href={`/blog/${slug}`}>
                    <Card className={styled.postsCard}>
                      <Image
                        src={coverData.url}
                        width="345"
                        height="247"
                        alt={alternativeText || "Blog Image"}
                      />
                      <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text className={styled.truncate}>{excerpt}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              ) : null;
            })}
          </Row>
        ))}
      </Container>
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getServerSideProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
  const { data = [] } = await fetchData(`${baseURL}/blogs?populate=*&locale=${locale}`);

  return {
    props: {
      data
    }
  };
});
