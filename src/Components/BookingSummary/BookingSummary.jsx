import React from "react";
import { useSelector } from "react-redux";

// eslint-disable-next-line import/no-unresolved
import { HydrationProvider, Client } from "react-hydration-provider";

import styled from "./BookingSummary.module.css";

const BookingSummary = ({ bookingDetailsWith }) => {
  const { flightInfoReducer } = useSelector((state) => state) || {};

  const { totalPrice, flightInfo, bookingInfo } = flightInfoReducer;

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
  } = flightInfo || {};

  const { firstName, lastName, email, mobileNumber } = bookingInfo || {};

  return (
    <HydrationProvider>
      <Client>
        <section className={`${styled.bookingDetails} ${bookingDetailsWith} `}>
          <h1>Your booking details</h1> <p>From</p> <h2>{pickUp}</h2>
          <p>To</p>
          <h2 className={styled.headingBorder}>{dropOff}</h2> <p>Arrival Trip</p>
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
          {firstName && lastName && (
            <div>
              <p>Passengers information</p>
              <div className={styled.headingBorder}>
                <h3>
                  {firstName} {lastName}
                </h3>
                <h3>{email}</h3>
                <h3>{mobileNumber} </h3>
              </div>
            </div>
          )}
          <p>Passengers</p>
          <h2>{pickUpPassenger}</h2>
          <p>Total Price</p>
          <h2>$ {totalPrice || +priceTaxi1}</h2>
        </section>
      </Client>
    </HydrationProvider>
  );
};

export default BookingSummary;
