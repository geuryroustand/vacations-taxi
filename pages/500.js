import SeoHead from "../src/Components/SeoHead/SeoHead";
import { getTranslation } from "../src/redux/fetchApiSlice";
import store from "../src/redux/store";

export default function Custom500() {
  return (
    <>
      <SeoHead title="Server side error" noIndex />
      <h1>500 - Server-side error occurred</h1>;
    </>
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
});
