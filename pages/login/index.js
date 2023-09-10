import React, { Suspense, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import MyHead from "../../src/Components/MyHead/MyHead";

// TODO need to do the fetch and add form validation

const DynamicAgreeConditions = dynamic(() =>
  import("../../src/Components/AgreeConditions/AgreeConditions")
);
const DynamicCustomButton = dynamic(() => import("../../src/Components/CustomButton/CustomButton"));

const DynamicFormRegisterAndSign = dynamic(() =>
  import("../../src/Components/FormRegisterAndSign/FormRegisterAndSign")
);
const DynamicFormGroup = dynamic(() => import("../../src/Components/FormGroup/FormGroup"));

function login() {
  const [validated, setValidated] = useState(false);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: ""
  });

  const onChange = (event) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Suspense fallback={<FallBackLoading />}>
      <MyHead title="Login" noIndex canonicalURL="login" />
      <Container style={{ marginBottom: "1.5rem" }}>
        <DynamicFormRegisterAndSign
          heading="Sign in"
          facebookBtnText="Continue with Facebook"
          googleBtnText="Continue with Google">
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <DynamicFormGroup
              label="Enter your email"
              id="formEmail"
              placeholder="Enter email"
              type="email"
              name="email"
              onChange={onChange}
              required
              feedBackText="Please provide a valid email."
            />

            <DynamicFormGroup
              label="Enter your Password"
              id="formPassword"
              placeholder="Enter Password"
              type="password"
              name="password"
              onChange={onChange}
              required
              feedBackText="Please provide a valid password."
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
