import React from "react";
import { useSelector } from "react-redux";

import styled from "./BookingSummary.module.css";

const BookingSummary = ({ bookingDetailsWith }) => {
  const { totalPrice, flightInfo } = useSelector((state) => state.flightInfoReducer);

  const {
    pickUp,
    pickUpDate,
    pickUpTime,
    dropOff,
    dropOffDate,
    dropOffTime,
    pickUpPassenger,
    priceTaxi1,
    roundtrip
  } = flightInfo;

  return (
    <section className={`${styled.bookingDetails} ${bookingDetailsWith} `}>
      <h1>Your booking details</h1>

      <p>From</p>

      <h2>{pickUp}</h2>

      <p>To</p>

      <h2 className={styled.headingBorder}>{dropOff}</h2>

      <p>Arrival Trip</p>
      <div className={styled.headingBorder}>
        <h2>{pickUpDate}</h2>

        <h2>At {pickUpTime}</h2>
      </div>
      {roundtrip && (
        <div>
          <p>Departure Trip</p>
          <div className={styled.headingBorder}>
            <h2>{dropOffDate}</h2>
            <h2>At {dropOffTime}</h2>
          </div>
        </div>
      )}

      <p>Passengers</p>

      <h2>{pickUpPassenger}</h2>

      <p>Total Price</p>

      <h2>$ {totalPrice || +priceTaxi1}</h2>
    </section>
  );
};

export default BookingSummary;
