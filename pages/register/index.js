/* eslint-disable no-console */
import React, { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import MyHead from "../../src/Components/MyHead/MyHead";
import { setCookieToken } from "../../src/Helper/auth";

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

  const [validated, setValidated] = useState(false);
  const [validationErrors, setValidationErrors] = useState({ message: "" });

  const [loginInfo, setLoginInfo] = useState({
    username: "",
    email: "",
    password: ""
  });

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
      try {
        const PROD = process.env.NODE_ENV === "production";

        const response = await fetch(
          `${
            PROD
              ? `${process.env.NEXT_PUBLIC_API_STRAPI_PROD_URL}/auth/local/register`
              : `${process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL}/auth/local/register`
          }`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(loginInfo)
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCookieToken(data);
          setLoginInfo({ username: "", email: "", password: "" });
          router.push("/");
        } else {
          const errorResponse = await response.json();
          const { details, message } = errorResponse.error;

          if (details && details.errors && details.errors.length > 0) {
            const errorsByPath = {};
            // eslint-disable-next-line unicorn/no-array-for-each
            details.errors.forEach((error) => {
              const [field] = error.path;
              errorsByPath[field] = error.message;
            });
            setValidated(true);
            setValidationErrors(errorsByPath);
          }

          if (message) {
            setValidationErrors({ message });
            setValidated(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    setValidated(true);
  };

  return (
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
              errorMessage={validationErrors.username || "Please provide a unique username."}
              isInvalid={!!validationErrors.username}
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
              errorMessage={
                validationErrors.email ||
                validationErrors.message ||
                "Please provide a valid email."
              }
              isInvalid={!!validationErrors.email || !!validationErrors.message}
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
              errorMessage={validationErrors.password || "Please provide a password."}
              isInvalid={!!validationErrors.password}
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
