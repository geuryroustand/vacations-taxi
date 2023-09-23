import React, { Suspense, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import MyHead from "../../src/Components/MyHead/MyHead";
import { setCookieToken } from "../../src/Helper/auth";

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
  const router = useRouter();
  const [validated, setValidated] = useState(false);
  const [validationErrors, setValidationErrors] = useState({ message: "" });

  const [loginInfo, setLoginInfo] = useState({
    identifier: "",
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
              ? `${process.env.NEXT_PUBLIC_API_STRAPI_PROD_URL}/auth/local`
              : `${process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL}/auth/local`
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
          setLoginInfo({ identifier: "", password: "" });
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
              name="identifier"
              onChange={onChange}
              required
              errorMessage={
                validationErrors.email ||
                validationErrors.message ||
                "Please provide a valid email."
              }
              isInvalid={!!validationErrors.email || !!validationErrors.message}
              value={loginInfo.identifier}
            />

            <DynamicFormGroup
              label="Enter your Password"
              id="formPassword"
              placeholder="Enter Password"
              type="password"
              name="password"
              onChange={onChange}
              required
              errorMessage={validationErrors.password || "Please provide a password."}
              isInvalid={!!validationErrors.password}
              value={loginInfo.password}
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
