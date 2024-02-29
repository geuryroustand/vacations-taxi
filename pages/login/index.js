import { Suspense, useEffect, useState } from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import SeoHead from "../../src/Components/SeoHead/SeoHead";

import { getCookieUrlPath, setCookieToken } from "../../src/Helper/auth";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import store from "../../src/redux/store";
import { useLoginUserMutation } from "../../src/redux/AuthenticationEndpoints";

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

  const [loginInfo, setLoginInfo] = useState({
    identifier: "",
    password: ""
  });
  const [{ validated, errors, errorMessage }, setValidated] = useState({
    errors: {},
    validated: false
  });

  const { identifier, password } = errors;

  const [loginUser, { data, isLoading, error, isError }] = useLoginUserMutation();

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
      loginUser(loginInfo);
    }

    setValidated({
      errors: {},
      validated: true
    });
  };

  if (data && !isError) {
    setCookieToken(data);
    const path = getCookieUrlPath() || "/";
    router.replace(path);
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

  return (
    <Suspense fallback={<FallBackLoading />}>
      <SeoHead title="Login" noIndex canonicalURL="login" />
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
              errorMessage={identifier || errorMessage || "Please provide a valid email."}
              isInvalid={!!identifier || !!errorMessage}
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
              errorMessage={password || "Please provide a password."}
              isInvalid={!!password}
              value={loginInfo.password}
            />
            <DynamicCustomButton
              disabled={isLoading}
              buttonType="submit"
              buttonText={isLoading ? "Loading..." : "Sign in"}
            />
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

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getServerSideProps = store.getServerSideProps((storeValue) =>
  // eslint-disable-next-line consistent-return
  async ({ locale, res }) => {
    try {
      const { dispatch } = storeValue;
      if (locale) {
        await fetchTranslationData(dispatch, locale);
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        res.writeHead(500, { Location: "/500" });
        res.end();
      }
      res.writeHead(404, { Location: "/404" });
      res.end();
      return { props: {} };
    }
  }
);

export default login;
