import Container from "react-bootstrap/Container";

import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import dynamic from "next/dynamic";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";

import styled from "./contactUs.module.css";
import MyHead from "../../src/Components/MyHead/MyHead";
import { getTranslation } from "../../src/redux/fetchApiSlice";
import store from "../../src/redux/store";

const DynamicContactForm = dynamic(() => import("../../src/Components/contactForm/ContactForm"), {
  loading: () => <FallBackLoading />
});

function contactUs() {
  const { t } = useTranslation("contactUs");
  return (
    <div className={styled.contactForm}>
      <MyHead title={t("pageTitle")} noIndex />

      <Container className={styled.contactFormWrapper}>
        <DynamicContactForm />
      </Container>
      <p className={styled.formBgTop} />
    </div>
  );
}

export default contactUs;

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  // storeValue.dispatch(getTranslation.initiate("en"));
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ["footer", "contactUs"]))
    }
  };
});
