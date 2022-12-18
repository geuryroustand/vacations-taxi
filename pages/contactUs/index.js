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

const DynamicContactForm = dynamic(() => import("../../src/Components/contactForm/ContactForm"), {
  suspense: true
});

function contactUs() {
  return (
    <div className={styled.contactForm}>
      <Container>
        <Suspense fallback={<FallBackLoading />}>
          <DynamicContactForm />
        </Suspense>
      </Container>
    </div>
  );
}

export default contactUs;
