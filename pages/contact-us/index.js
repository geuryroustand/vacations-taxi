import Container from "react-bootstrap/Container";

import dynamic from "next/dynamic";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";

import styled from "./contactUs.module.css";
import MyHead from "../../src/Components/MyHead/MyHead";

const DynamicContactForm = dynamic(() => import("../../src/Components/contactForm/ContactForm"), {
  loading: () => <FallBackLoading />
});

function contactUs() {
  return (
    <div className={styled.contactForm}>
      <MyHead title="Contact Us" noIndex canonicalURL="contact-us" />

      <Container className={styled.contactFormWrapper}>
        <DynamicContactForm />
      </Container>
      <p className={styled.formBgTop} />
    </div>
  );
}

export default contactUs;
