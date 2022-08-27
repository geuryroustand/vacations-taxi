import React from "react";

import styled from "./BookingSummary.module.css";

const BookingSummary = ({ flightInfo, bookingDetailsWith }) => {
  const { from, to, arrivalDate, arrivalAt, departureDate, departureAt, passengers, totalPrice } =
    flightInfo;

  return (
    <section className={`${styled.bookingDetails} ${bookingDetailsWith} `}>
      <h1>Your booking details</h1>

      <p>From</p>

      <h2>{from}</h2>

      <p>To</p>

      <h2 className={styled.headingBorder}>{to}</h2>

      <p>Arrival Date</p>
      <div className={styled.headingBorder}>
        <h2>{arrivalDate}</h2>
        <h2>{arrivalAt}</h2>
      </div>

      <p>Departure Date</p>
      <div className={styled.headingBorder}>
        <h2>{departureDate}</h2>
        <h2>{departureAt}</h2>
      </div>

      <p>Passengers</p>

      <h2>{passengers}</h2>

      <p>Total Price</p>

      <h2>$ {totalPrice}</h2>
    </section>
  );
};

export default BookingSummary;
