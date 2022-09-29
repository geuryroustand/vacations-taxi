import React from "react";

import Container from "react-bootstrap/Container";

import styled from "./paymentDetails.module.css";
import BookingSummary from "../../src/Components/BookingSummary/BookingSummary";
import Passenger from "../../src/Components/Passenger/Passenger";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";
import Payment from "../../src/Components/Payment/Payment";

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
        <BookingSummary flightInfo={flightInfo} />
        <Payment />
      </Container>
    </form>
  );
}
