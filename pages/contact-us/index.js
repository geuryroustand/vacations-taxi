import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import styled from "./contactUs.module.css";
import MyHead from "../../src/Components/MyHead/MyHead";
import { getTranslation } from "../../src/redux/fetchApiSlice";
import store from "../../src/redux/store";
import { baseURL, fetchData } from "../../src/Helper/fetchData";

const DynamicContactForm = dynamic(() => import("../../src/Components/contactForm/ContactForm"), {
  loading: () => <FallBackLoading />
});

function contactUs({
  headingOne,
  headingTwo,
  name,
  nameFeedback,
  email,
  emailFeedback,
  shareEmail,
  textArea,
  textAreaFeedBack,
  submit,
  sentText,
  goBackText,
  title,
  slug
}) {
  return (
    <div className={styled.contactForm}>
      <MyHead title={title} noIndex canonicalURL={slug} />

      <Container className={styled.contactFormWrapper}>
        <DynamicContactForm
          headingOne={headingOne}
          headingTwo={headingTwo}
          name={name}
          nameFeedback={nameFeedback}
          email={email}
          emailFeedback={emailFeedback}
          shareEmail={shareEmail}
          textArea={textArea}
          textAreaFeedBack={textAreaFeedBack}
          submit={submit}
          sentText={sentText}
          goBackText={goBackText}
        />
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
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }

  const { data } = await fetchData(`${baseURL}/contact-us?locale=${locale}`);

  const {
    headingOne,
    headingTwo,
    name,
    nameFeedback,
    email,
    emailFeedback,
    shareEmail,
    textArea,
    textAreaFeedBack,
    submit,
    sentText,
    goBackText,
    title,
    slug
  } = data.attributes;

  return {
    props: {
      headingOne,
      headingTwo,
      name,
      nameFeedback,
      email,
      emailFeedback,
      shareEmail,
      textArea,
      textAreaFeedBack,
      submit,
      sentText,
      goBackText,
      title,
      slug
    }
  };
});
