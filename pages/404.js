import { getTranslation } from "../src/redux/fetchApiSlice";
import store from "../src/redux/store";

export default function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  // storeValue.dispatch(getTranslation.initiate("en"));
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
});