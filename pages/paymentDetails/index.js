import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { useSelector } from "react-redux";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import styled from "./paymentDetails.module.css";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";
import { persistor } from "../../src/redux/store";

const DynamicBookingSummary = dynamic(
  () => import("../../src/Components/BookingSummary/BookingSummary"),
  {
    suspense: true
  }
);

const DynamicPayment = dynamic(() => import("../../src/Components/Payment/Payment"), {
  suspense: true
});

function paymentDetails() {
  const { bookingInfo } = useSelector((state) => state.flightInfoReducer);

  const [validated, setValidated] = useState(false);

  const sendInfo = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();

      console.log("boo", bookingInfo);

      persistor.purge();
    }

    setValidated(true);
  };

  return (
    <Form className={styled.paymentDetails} noValidate validated={validated} onSubmit={sendInfo}>
      <Container>
        <BookingStepProcess />
      </Container>

      <Container className={styled.paymentDetailsContainer}>
        <Suspense fallback={<FallBackLoading />}>
          <DynamicBookingSummary />

          <DynamicPayment />
        </Suspense>
      </Container>
    </Form>
  );
}

export default paymentDetails;
