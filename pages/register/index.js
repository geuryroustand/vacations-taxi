import React, { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

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

function register() {
  return (
    <Suspense fallback={<FallBackLoading />}>
      <MyHead title="Register" noIndex canonicalURL="register" />
      <Container style={{ marginBottom: "1.5rem" }}>
        <DynamicFormRegisterAndSign
          heading="Create Your Free Account"
          facebookBtnText="Sign up with Facebook"
          googleBtnText="Sign up with Google">
          <Form>
            <DynamicFormGroup
              label="Enter your name"
              id="formName"
              placeholder="Enter name"
              type="text"
            />

            <DynamicFormGroup
              label="Enter your Surname"
              id="formSurname"
              placeholder="Enter surname"
              type="text"
            />

            <DynamicFormGroup
              label="Enter your email"
              id="formEmail"
              placeholder="Enter email"
              type="email"
              formButtonText="We'll never share your email with anyone else."
            />

            <DynamicFormGroup
              label="Enter your Password"
              id="formPassword"
              placeholder="Enter Password"
              type="password"
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
