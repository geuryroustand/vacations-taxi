import React from "react";

import Markdown from "react-markdown";
import Container from "react-bootstrap/Container";
import SeoHead from "../../src/Components/SeoHead/SeoHead";

import store from "../../src/redux/store";

import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import fetchData from "../../src/Helper/fetchData";
import { baseURL } from "../../environment";

export default function termsAndConditions({ description, title, slug }) {
  return (
    <Container>
      <SeoHead title={title} noIndex canonicalURL={slug} />
      <div className="mt-5">
        <Markdown>{description}</Markdown>
      </div>
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
  const { data } = await fetchData(`${baseURL}/privacy-notice?locale=${locale}`);

  const { description = "", title = "", slug = "" } = data.attributes || {};

  return {
    props: {
      description,
      title,
      slug
    }
  };
});
