/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/no-null */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */

import React, { Suspense, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";

import styled from "./contactUs.module.css";
import MyHead from "../../src/Components/MyHead/MyHead";

const DynamicContactForm = dynamic(() => import("../../src/Components/contactForm/ContactForm"), {
  suspense: true
});

function contactUs() {
  return (
    <div className={styled.contactForm}>
      <MyHead title="Contact Us" noIndex />

      <Container className={styled.contactFormWrapper}>
        <Suspense fallback={<FallBackLoading />}>
          <DynamicContactForm />
        </Suspense>
      </Container>
      <p className={styled.formBgTop} />
    </div>
  );
}

export default contactUs;
