import React from "react";
import Container from "react-bootstrap/Container";
import Markdown from "react-markdown";

import store from "../../src/redux/store";

import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import fetchData from "../../src/Helper/fetchData";
import { baseURL } from "../../environment";

export default function aboutUs({ content, title, slug }) {
  return (
    <Container className="mt-5">
      <SeoHead title={title} canonicalURL={slug} />
      <Markdown>{content}</Markdown>
    </Container>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
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
