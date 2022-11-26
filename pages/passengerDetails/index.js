import React, { Suspense } from "react";
import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";

import styled from "./passengerDetails.module.css";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";

const DynamicBookingSummary = dynamic(
  () => import("../../src/Components/BookingSummary/BookingSummary"),
  {
    suspense: true
  }
);

const DynamicPassenger = dynamic(() => import("../../src/Components/Passenger/Passenger"), {
  suspense: true
});

export default function passengerDetails() {
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
    <div className={styled.passengerDetails}>
      <Container>
        <BookingStepProcess />
      </Container>
      <Container className={styled.passengerDetailsContainer}>
        <Suspense fallback="Loading...">
          <DynamicBookingSummary flightInfo={flightInfo} />
          <DynamicPassenger />
        </Suspense>
      </Container>
    </div>
  );
}
