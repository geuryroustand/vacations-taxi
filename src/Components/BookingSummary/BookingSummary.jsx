import React from "react";
import { useSelector } from "react-redux";

import styled from "./BookingSummary.module.css";

const BookingSummary = (props) => {
  // const { arrivalDate, arrivalAt, departureDate, departureAt, passengers, totalPrice } =
  //   props?.flightInfo;

  const { totalPrice } = useSelector((state) => state.flightInfoReducer);

  return (
    <section className={`${styled.bookingDetails} ${props.bookingDetailsWith} `}>
      <h1>Your booking details</h1>

      <p>From</p>

      <h2>{props.flightInfo?.from}</h2>

      <p>To</p>

      <h2 className={styled.headingBorder}>{props.flightInfo?.to}</h2>

      <p>Arrival Trip</p>
      <div className={styled.headingBorder}>
        <h2>{props.flightInfo?.arrivalDate}</h2>
        <h2>{props.flightInfo?.arrivalAt}</h2>
      </div>

      <p>Departure Trip</p>
      <div className={styled.headingBorder}>
        <h2>{props.flightInfo?.departureDate}</h2>
        <h2>{props.flightInfo?.departureAt}</h2>
      </div>

      <p>Passengers</p>

      <h2>{props.flightInfo?.passengers}</h2>

      <p>Total Price</p>

      <h2>$ {totalPrice}</h2>
    </section>
  );
};

export default BookingSummary;
