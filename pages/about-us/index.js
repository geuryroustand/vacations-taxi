import React from "react";
import Container from "react-bootstrap/Container";
import Markdown from "react-markdown";

import MyHead from "../../src/Components/MyHead/MyHead";
import store from "../../src/redux/store";
import { getTranslation } from "../../src/redux/fetchApiSlice";

export default function aboutUs({ data }) {
  const { attributes } = data;
  return (
    <Container className="mt-5">
      <MyHead title={attributes.pageTitle} noIndex />
      <Markdown>{attributes.content}</Markdown>
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

  const response = await fetch(`http://0.0.0.0:1337/api/about-us?locale=${locale}`);
  if (!response.ok) {
    throw new Error(`Fetch failed with status ${response.status}`);
  }

  const aboutUsData = await response.json();

  const { data } = aboutUsData;
  return {
    props: {
      data
    }
  };
});
