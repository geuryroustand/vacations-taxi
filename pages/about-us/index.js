import React from "react";
import Container from "react-bootstrap/Container";
import Markdown from "react-markdown";

import MyHead from "../../src/Components/MyHead/MyHead";
import store from "../../src/redux/store";
import { getTranslation } from "../../src/redux/fetchApiSlice";
import { baseURL, fetchData } from "../../src/Helper/fetchData";

export default function aboutUs({ content, title, slug }) {
  return (
    <Container className="mt-5">
      <MyHead title={title} noIndex canonicalURL={slug} />
      <Markdown>{content}</Markdown>
    </Container>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
  const { data } = await fetchData(`${baseURL}/about-us?locale=${locale}`);

  const { content, title, slug } = data.attributes;

  return {
    props: {
      content,
      title,
      slug
    }
  };
});
