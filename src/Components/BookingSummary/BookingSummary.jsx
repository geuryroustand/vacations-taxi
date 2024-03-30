import { useRouter } from "next/router";
import { useSelector } from "react-redux";

// eslint-disable-next-line import/no-unresolved
import { HydrationProvider, Client } from "react-hydration-provider";

import styled from "./BookingSummary.module.css";
import { baseURL } from "../../../environment";

const BookingSummary = ({ bookingDetailsWith }) => {
  const flightInfoReducer = useSelector((state) => state.flightInfoReducer || {});
  const { totalPrice, flightInfo, bookingInfo } = flightInfoReducer;

  const { locale } = useRouter();
  const queryKey = `fetchContent("${baseURL}/booking-detail?locale=${locale}&populate=*")`;

  const {
    headingOne = "",
    from = "",
    to = "",
    arrival = "",
    departure = "",
    at = "",
    passenger = "",
    total = "",
    passengerInfo = ""
  } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );

  const {
    pickUp,
    pickUpDate,
    pickUpTime,
    dropOff,
    dropOffDate,
    dropOffTime,
    pickUpPassenger,
    roundtrip
  } = flightInfo || {};

  const { firstName, lastName, email, mobileNumber } = bookingInfo || {};

  return (
    <HydrationProvider>
      <Client>
        <section className={`${styled.bookingDetails} ${bookingDetailsWith} `}>
          <h1>{headingOne}</h1>
          <p>{from}</p>
          <h2>{pickUp}</h2>
          <p>{to}</p>
          <h2 className={styled.headingBorder}>{dropOff}</h2>
          <p>{arrival}</p>
          <div className={styled.headingBorder}>
            <h2>{pickUpDate}</h2>
            <h2>
              {at} {pickUpTime}
            </h2>
          </div>
          {roundtrip && (
            <div>
              <p>{departure}</p>
              <div className={styled.headingBorder}>
                <h2>{dropOffDate}</h2>
                <h2>
                  {at} {dropOffTime}
                </h2>
              </div>
            </div>
          )}
          {firstName && lastName && (
            <div>
              <p>{passengerInfo}</p>
              <div className={styled.headingBorder}>
                <h3>
                  {firstName} {lastName}
                </h3>
                <h3>{email}</h3>
                <h3>{mobileNumber} </h3>
              </div>
            </div>
          )}
          <p>{passenger}</p>
          <h2>{pickUpPassenger}</h2>
          <p>{total}</p>
          <h2>${totalPrice}</h2>
        </section>
      </Client>
    </HydrationProvider>
  );
};

export default BookingSummary;
