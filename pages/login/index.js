import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import MyHead from "../../src/Components/MyHead/MyHead";

const DynamicAgreeConditions = dynamic(() =>
  import("../../src/Components/AgreeConditions/AgreeConditions")
);
const DynamicCustomButton = dynamic(() => import("../../src/Components/CustomButton/CustomButton"));

const DynamicFormRegisterAndSign = dynamic(() =>
  import("../../src/Components/FormRegisterAndSign/FormRegisterAndSign")
);
const DynamicFormGroup = dynamic(() => import("../../src/Components/FormGroup/FormGroup"));

function login() {
  return (
    <Suspense fallback={<FallBackLoading />}>
      <MyHead title="Login" noIndex canonicalURL="login" />
      <Container style={{ marginBottom: "1.5rem" }}>
        <DynamicFormRegisterAndSign
          heading="Sign in"
          facebookBtnText="Continue with Facebook"
          googleBtnText="Continue with Google">
          <Form>
            <DynamicFormGroup
              label="Enter your email"
              id="formEmail"
              placeholder="Enter email"
              type="email"
            />

            <DynamicFormGroup
              label="Enter your Password"
              id="formPassword"
              placeholder="Enter Password"
              type="password"
            />
            <DynamicCustomButton buttonType="submit" buttonText="Sign in" />
          </Form>
        </DynamicFormRegisterAndSign>

        <DynamicAgreeConditions>
          <p>Don&apos;t have an account?</p>
          <Link href="/register">Sign up for free</Link>
        </DynamicAgreeConditions>
      </Container>
    </Suspense>
  );
}

export default login;
