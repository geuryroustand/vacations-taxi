import React from "react";
import Container from "react-bootstrap/Container";

import styled from "./passengerDetails.module.css";
import BookingSummary from "../../src/Components/BookingSummary/BookingSummary";
import Passenger from "../../src/Components/Passenger/Passenger";

import { useRouter } from "next/router";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";

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

  const { pathname } = useRouter();
  const currentProcess = pathname === "/passengerDetails" ? "process" : "";

  return (
    <div className={styled.passengerDetails}>
      <Container>
        <BookingStepProcess />
      </Container>
      <Container className={styled.passengerDetailsContainer}>
        <BookingSummary flightInfo={flightInfo} />
        <Passenger />
      </Container>
    </div>
  );
}