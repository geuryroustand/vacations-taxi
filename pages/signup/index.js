/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-console */
import React, { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";

import { getCookieUrlPath, setCookieToken } from "../../src/Helper/auth";

import SeoHead from "../../src/Components/SeoHead/SeoHead";
import { useCreateUserMutation } from "../../src/redux/AuthenticationEndpoints";
import { fetchCommonContent } from "../../src/redux/ContentEndpoints";
import store from "../../src/redux/store";
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

function signup({
  heading,
  authBtnText,
  inputUserName,
  inputUserErrorMessage,
  inputEmail,
  inputEmailErrorMessage,
  inputPassword,
  inputPasswordErrorMessage,
  buttonText,
  agreeText,
  termsText,
  andText,
  privacyText,
  haveAnAccountText,
  signInText,
  emailShareText,
  or,
  createText,
  btnLoadingState
}) {
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

  const [createUser, { data, isLoading, error, isError }] = useCreateUserMutation();

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
      createUser(loginInfo);
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
      <SeoHead title={createText} noIndex canonicalURL="signup" />
      <Container style={{ marginBottom: "1.5rem" }}>
        <DynamicFormRegisterAndSign
          or={or}
          heading={heading}
          facebookBtnText={`${authBtnText} Facebook`}
          googleBtnText={`${authBtnText}  Google`}>
          <Form noValidate validated={validated} onSubmit={onSubmit}>
            <DynamicFormGroup
              label={inputUserName}
              id="username"
              placeholder={inputUserName}
              type="text"
              name="username"
              onChange={onChange}
              required
              errorMessage={username || inputUserErrorMessage}
              isInvalid={!!username}
              value={loginInfo.username}
            />

            <DynamicFormGroup
              label={inputEmail}
              id="formEmail"
              placeholder={inputEmail}
              type="email"
              formButtonText={emailShareText}
              name="email"
              onChange={onChange}
              required
              errorMessage={email || errorMessage || inputEmailErrorMessage}
              isInvalid={!!email || !!errorMessage}
              value={loginInfo.email}
            />

            <DynamicFormGroup
              label={inputPassword}
              id="formPassword"
              placeholder={inputPassword}
              type="password"
              name="password"
              onChange={onChange}
              required
              errorMessage={password || inputPasswordErrorMessage}
              isInvalid={!!password}
              value={loginInfo.password}
            />
            <DynamicCustomButton
              buttonType="submit"
              buttonText={isLoading ? btnLoadingState : buttonText}
            />
          </Form>
          <DynamicAgreeConditions>
            <p>
              {agreeText}
              <br />
              <Link href="/terms-and-conditions"> {termsText}</Link>
              {andText} <Link href="/privacy-notice">{privacyText}</Link>
            </p>

            <p>{haveAnAccountText}</p>
            <Link href="/login">{signInText}</Link>
          </DynamicAgreeConditions>
        </DynamicFormRegisterAndSign>
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

      const { data } = await fetchData(`${baseURL}/signup?locale=${locale}`);

      const {
        heading,
        authBtnText,
        inputUserName,
        inputUserErrorMessage,
        inputEmail,
        inputEmailErrorMessage,
        inputPassword,
        inputPasswordErrorMessage,
        buttonText,
        agreeText,
        termsText,
        andText,
        privacyText,
        haveAnAccountText,
        signInText,
        emailShareText,
        or,
        createText,
        btnLoadingState
      } = data.attributes || {};

      return {
        props: {
          heading,
          authBtnText,
          inputUserName,
          inputUserErrorMessage,
          inputEmail,
          inputEmailErrorMessage,
          inputPassword,
          inputPasswordErrorMessage,
          buttonText,
          agreeText,
          termsText,
          andText,
          privacyText,
          haveAnAccountText,
          signInText,
          emailShareText,
          or,
          createText,
          btnLoadingState
        }
      };
    } catch (error) {
      if (error.response && error.response.status === 500) {
        res.writeHead(500, { Location: "/500" });
        res.end();
        return { props: {} };
      }
      res.writeHead(404, { Location: "/404" });
      res.end();
      return { props: {} };
    }
  }
);

export default signup;

// eslint-disable-next-line no-lone-blocks
{
  /* <div className={styled.passengerDetails}>
            <h2>Passenger Details</h2>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>
            </Row>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    When someone leaves a comment, you will be notified by email at the following
                    address.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group controlId="formSelect">
                  <Form.Label>How many passengers can you take?</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div> */
}
