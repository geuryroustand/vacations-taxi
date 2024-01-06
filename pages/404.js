import SeoHead from "../src/Components/SeoHead/SeoHead";
import { fetchCommonContent } from "../src/redux/ContentEndpoints";

import store from "../src/redux/store";

export default function Custom404() {
  return (
    <>
      <SeoHead title="Not Found" noIndex />
      <h1>404 - Page Not Found</h1>;
    </>
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
});
