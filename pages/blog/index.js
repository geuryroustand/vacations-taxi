import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Link from "next/link";

import styled from "./posts.module.css";
import MyHead from "../../src/Components/MyHead/MyHead";
import { getTranslation } from "../../src/redux/fetchApiSlice";
import store from "../../src/redux/store";
import { baseURL, fetchData } from "../../src/Helper/fetchData";

export default function Blogs({ data }) {
  const groupedPosts = [...data]
    .map((_, index) => {
      if (index % 3 === 0) {
        return data.slice(index, index + 3);
      }
      // eslint-disable-next-line unicorn/no-null
      return null;
    })
    .filter((group) => group !== null);

  return (
    <>
      <MyHead title="Blogs" noIndex canonicalURL="blogs" />
      <Container className={styled.postsContainer}>
        <h1 className={styled.postsHeading}>Travel Tips:</h1>
        {groupedPosts?.map((group) => (
          <Row key={group}>
            {group?.map(
              ({
                attributes: {
                  slug,
                  excerpt,
                  title,
                  cover: {
                    data: {
                      attributes: {
                        alternativeText,
                        formats: { small }
                      }
                    }
                  }
                },
                id
              }) => (
                <Col key={id} className={styled.cardColumn}>
                  <Link className={styled.cardLink} href={`/blog/${slug}`}>
                    <Card className={styled.postsCard}>
                      <Image src={small.url} width="345" height="247" alt={alternativeText} />
                      <Card.Body>
                        <Card.Title>
                          <Card.Title>{title}</Card.Title>
                        </Card.Title>
                        <Card.Text>{excerpt}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </Col>
              )
            )}
          </Row>
        ))}
      </Container>
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getServerSideProps = store.getServerSideProps((storeValue) => async ({ locale }) => {
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
