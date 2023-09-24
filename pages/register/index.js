/* eslint-disable no-console */
import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import MyHead from "../../src/Components/MyHead/MyHead";
import { setCookieToken } from "../../src/Helper/auth";
import { useRegisterUserMutation } from "../../src/redux/fetchApiSlice";

import Loading from "../../src/Components/Loading/Loading";

const DynamicAgreeConditions = dynamic(() =>
  import("../../src/Components/AgreeConditions/AgreeConditions")
);
const DynamicCustomButton = dynamic(() => import("../../src/Components/CustomButton/CustomButton"));

const DynamicFormRegisterAndSign = dynamic(() =>
  import("../../src/Components/FormRegisterAndSign/FormRegisterAndSign")
);
const DynamicFormGroup = dynamic(() => import("../../src/Components/FormGroup/FormGroup"));

function register() {
  const router = useRouter();

  const [{ validated, errors, errorMessage }, setValidated] = useState({
    errors: {},
    validated: false
  });

  const { username, email, password } = errors;

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [registerUser, { data, isLoading, error, isError }] = useRegisterUserMutation();

  const onChange = (event) => {
    setLoginInfo({
      ...loginInfo,
      [event.target.name]: event.target.value
    });
  };

  const onSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (!form.checkValidity() === false) {
      registerUser(loginInfo);
    }

    setValidated({
      errors: {},
      validated: true
    });
  };

  if (data && !isError) {
    setCookieToken(data);
    router.replace("/");
  }

  useEffect(() => {
    if (isError) {
      const { details, message } = error.data.error;
      const errorsByPath = {};

      if (details && details.errors && details.errors.length > 0) {
        // eslint-disable-next-line unicorn/no-array-for-each
        details.errors.forEach((errorResponse) => {
          const [field] = errorResponse.path;
          errorsByPath[field] = errorResponse.message;
        });
      }

      if (Object.keys(errorsByPath).length > 0 || message) {
        setValidated((previousState) => ({
          ...previousState,
          errors: Object.keys(errorsByPath).length > 0 && errorsByPath,
          errorMessage: message,
          validated: true
        }));
      }
    }
  }, [isError]);

  return isLoading ? (
    <Loading spinnerTitle="Loading" accessibilityTitle="Loading" />
  ) : (
    <Suspense fallback={<FallBackLoading />}>
      <MyHead title="Register" noIndex canonicalURL="register" />
      <Container style={{ marginBottom: "1.5rem" }}>
        <DynamicFormRegisterAndSign
          heading="Create Your Free Account"
          facebookBtnText="Sign up with Facebook"
          googleBtnText="Sign up with Google">
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <DynamicFormGroup
              label="Enter a username"
              id="username"
              placeholder="Enter a username"
              type="text"
              name="username"
              onChange={onChange}
              required
              errorMessage={username || "Please provide a unique username."}
              isInvalid={!!username}
              value={loginInfo.username}
            />

            <DynamicFormGroup
              label="Enter your email address"
              id="formEmail"
              placeholder="Enter an email address"
              type="email"
              formButtonText="We'll never share your email with anyone else."
              name="email"
              onChange={onChange}
              required
              errorMessage={email || errorMessage || "Please provide a valid email."}
              isInvalid={!!email || !!errorMessage}
              value={loginInfo.email}
            />

            <DynamicFormGroup
              label="Enter your Password"
              id="formPassword"
              placeholder="Enter password"
              type="password"
              name="password"
              onChange={onChange}
              required
              errorMessage={password || "Please provide a password."}
              isInvalid={!!password}
              value={loginInfo.password}
            />
            <DynamicCustomButton buttonType="submit" buttonText="Continue" />
          </Form>
          <DynamicAgreeConditions>
            <p>
              By creating an account, you are agreeing to our <br />
              <Link href="/terms-and-conditions">Terms and Conditions</Link> and{" "}
              <Link href="/privacy-notice">Privacy Notice</Link>
            </p>

            <p>Already have an account?</p>
            <Link href="/login">Sign in</Link>
          </DynamicAgreeConditions>
        </DynamicFormRegisterAndSign>
      </Container>
    </Suspense>
  );
}

export default register;
