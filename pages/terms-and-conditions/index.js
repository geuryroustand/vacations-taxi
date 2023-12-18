import Container from "react-bootstrap/Container";
import Markdown from "react-markdown";

import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { getTranslation } from "../../src/redux/fetchApiSlice";
import store from "../../src/redux/store";
import { baseURL, fetchData } from "../../src/Helper/fetchData";

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
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }

  const { data } = await fetchData(`${baseURL}/terms-and-condition?locale=${locale}`);

  const { description = "", title = "", slug = "" } = data.attributes || {};

  return {
    props: {
      description,
      title,
      slug
    }
  };
});
