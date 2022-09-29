import React from "react";
import BookingSummary from "../../src/Components/BookingSummary/BookingSummary";

import Container from "react-bootstrap/Container";
import CarList from "../../src/Components/CarList/CarList";

import styled from "./bookingDetails.module.css";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";

import { useRouter } from "next/router";

export default function BookingDetails() {
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
  const currentProcess = pathname === "/bookingDetails" ? "process" : "";
  console.log(pathname);

  return (
    <div className={styled.bookingDetails}>
      <Container>
        <BookingStepProcess />
      </Container>
      <Container className={styled.bookingDetailsContainer}>
        <BookingSummary flightInfo={flightInfo} bookingDetailsWith={styled.bookingDetailsWith} />
        <CarList />
      </Container>
    </div>
  );
}
