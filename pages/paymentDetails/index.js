import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";

import styled from "./paymentDetails.module.css";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";

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
  return (
    <form className={styled.paymentDetails}>
      <Container>
        <BookingStepProcess />
      </Container>

      <Container className={styled.paymentDetailsContainer}>
        <Suspense fallback="Loading...">
          <DynamicBookingSummary />
          <DynamicPayment />
        </Suspense>
      </Container>
    </form>
  );
}

export default paymentDetails;
