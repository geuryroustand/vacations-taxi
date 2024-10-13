/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
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
import fetchData from "../../src/Helper/fetchData";
import { baseURL } from "../../environment";

const DynamicAgreeConditions = dynamic(() =>
  import("../../src/Components/AgreeConditions/AgreeConditions")
);
const DynamicCustomButton = dynamic(() => import("../../src/Components/CustomButton/CustomButton"));

const DynamicFormRegisterAndSign = dynamic(() =>
  import("../../src/Components/FormRegisterAndSign/FormRegisterAndSign")
);
const DynamicFormGroup = dynamic(() => import("../../src/Components/FormGroup/FormGroup"));

function login({
  heading,
  authBtnText,
  or,
  inputEmailText,
  inputPasswordText,
  btnSignInText,
  accountText,
  signUpText,
  emailErrorMessage,
  passwordErrorMessage,
  loadingStateText
}) {
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
      <SeoHead title={btnSignInText} noIndex canonicalURL="login" />
      <Container style={{ marginBottom: "1.5rem" }}>
        <DynamicFormRegisterAndSign
          heading={heading}
          facebookBtnText={`${authBtnText} Facebook`}
          googleBtnText={`${authBtnText} Google`}
          or={or}>
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <DynamicFormGroup
              label={inputEmailText}
              id="formEmail"
              placeholder={inputEmailText}
              type="email"
              name="identifier"
              onChange={onChange}
              required
              errorMessage={identifier || errorMessage || emailErrorMessage}
              isInvalid={!!identifier || !!errorMessage}
              value={loginInfo.identifier}
            />

            <DynamicFormGroup
              label={inputPasswordText}
              id="formPassword"
              placeholder={inputPasswordText}
              type="password"
              name="password"
              onChange={onChange}
              required
              errorMessage={password || passwordErrorMessage}
              isInvalid={!!password}
              value={loginInfo.password}
            />
            <DynamicCustomButton
              disabled={isLoading}
              buttonType="submit"
              buttonText={isLoading ? loadingStateText : btnSignInText}
            />
          </Form>
        </DynamicFormRegisterAndSign>

        <DynamicAgreeConditions>
          <p>{accountText}</p>
          <Link href="/signup">{signUpText}</Link>
        </DynamicAgreeConditions>
      </Container>
    </Suspense>
  );
}

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
};

export const getServerSideProps = store.getServerSideProps(
  (storeValue) =>
    async ({ locale, res }) => {
      try {
        const { dispatch } = storeValue;
        if (locale) {
          await fetchTranslationData(dispatch, locale);
        }

        const { data } = await fetchData(`${baseURL}/login?locale=${locale}`);

        const {
          heading,
          authBtnText,
          or,
          inputEmailText,
          inputPasswordText,
          btnSignInText,
          accountText,
          signUpText,
          emailErrorMessage,
          passwordErrorMessage,
          loadingStateText
        } = data.attributes || {};

        return {
          props: {
            heading,
            authBtnText,
            or,
            inputEmailText,
            inputPasswordText,
            btnSignInText,
            accountText,
            signUpText,
            emailErrorMessage,
            passwordErrorMessage,
            loadingStateText
          }
        };
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
