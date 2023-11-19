/* eslint-disable unicorn/no-null */
/* eslint-disable no-unused-vars */
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import styled from "./posts.module.css";
import MyHead from "../../src/Components/MyHead/MyHead";
import { getTranslation } from "../../src/redux/fetchApiSlice";
import store from "../../src/redux/store";

export default function Blogs() {
  const [posts, setPosts] = useState([
    {
      slug: "exploring-the-benefits-of-planning-your-airport-transfer-ahead-of-time",
      id: "3434343",
      title: "Exploring the Benefits of Planning Your Airport Transfer Ahead of Time",
      excerpt:
        " Are you planning to travel to a new destination soon? One of the most important things to consider is how you will get to and from the airport."
    }
  ]);

  const groupedPosts = [...posts]
    .map((_, index) => {
      if (index % 3 === 0) {
        return posts.slice(index, index + 3);
      }

      return null;
    })
    .filter((group) => group !== null);

  return (
    <>
      <MyHead title="Blogs" noIndex canonicalURL="blogs" />
      <Container className={styled.postsContainer}>
        <h1 className={styled.postsHeading}>Travel Tips:</h1>
        {groupedPosts.map((group) => (
          <Row key={group}>
            {group.map((post) => (
              <Col key={post.id} className={styled.cardColumn}>
                <Link className={styled.cardLink} href={`/blogs/${post.slug}`}>
                  <Card className={styled.postsCard}>
                    <Image src="/images/post1.jpg" width="345" height="247" alt={post.title} />
                    <Card.Body>
                      <Card.Title>
                        <Card.Title>{post.title}</Card.Title>
                      </Card.Title>
                      <Card.Text>{post.excerpt}</Card.Text>
                    </Card.Body>
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        ))}
      </Container>
    </>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale, params }) => {
  // storeValue.dispatch(getTranslation.initiate("en"));
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
});
