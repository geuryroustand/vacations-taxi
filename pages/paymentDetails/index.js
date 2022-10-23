import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";

import styled from "./paymentDetails.module.css";

const DynamicBookingSummary = dynamic(
  () => import("../../src/Components/BookingSummary/BookingSummary"),
  {
    suspense: true
  }
);

const DynamicPayment = dynamic(() => import("../../src/Components/Payment/Payment"), {
  suspense: true
});

import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";

export default function paymentDetails() {
  const flightInfo = {
    from: "Santo Domingo Airport (SDQ)",
    to: "Bahia Principe Portillo",
    arrivalDate: "Saturday 27, Aug 2022 ",
    arrivalAt: "At 13 : 37",
    departureDate: "Sunday 21, Aug 2022",
    departureAt: "At 13 : 37",
    passengers: 3,
    totalPrice: 260
  };

  return (
    <form className={styled.paymentDetails}>
      <Container>
        <BookingStepProcess />
      </Container>

      <Container className={styled.paymentDetailsContainer}>
        <Suspense fallback={`Loading...`}>
          <DynamicBookingSummary flightInfo={flightInfo} />
          <DynamicPayment />
        </Suspense>
      </Container>
    </form>
  );
}
