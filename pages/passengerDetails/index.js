import React from "react";
import BookingSummary from "../../src/Components/BookingSummary/BookingSummary";

import Container from "react-bootstrap/Container";

import styled from "./passengerDetails.module.css";
import Car from "../../src/Components/Car/Car";
import Passenger from "../../src/Components/Passenger/Passenger";

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
      <Container className={styled.passengerDetailsContainer}>
        <BookingSummary flightInfo={flightInfo} />
        <Passenger />
      </Container>
    </div>
  );
}
