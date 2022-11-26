/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/no-null */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */

import React, { Suspense, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";
import styled from "./bookingDetails.module.css";
import { allFlightInfo } from "../../src/redux/flightInfoSlice";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";

const DynamicBookingSummary = dynamic(
  () => import("../../src/Components/BookingSummary/BookingSummary"),
  {
    suspense: true
  }
);

const DynamicCarList = dynamic(() => import("../../src/Components/CarList/CarList"), {
  suspense: true
});

const DynamicPassenger = dynamic(() => import("../../src/Components/Passenger/Passenger"), {
  suspense: true
});

function BookingDetails() {
  const [isLoading, setIsLoading] = useState(null);
  const [dataInfo, setDataInfo] = useState();

  const router = useRouter();

  const {
    dropOffDate,
    dropOffPassenger,
    dropOffReturn,
    dropOffTime,

    pickUpDate,
    pickUpPassenger,
    pickUpReturn,
    pickUpTime,
    roundtrip,

    pickUp,
    dropOff
  } = router?.query;

  const dispatch = useDispatch();

  const getData = async () => {
    setIsLoading(true);

    const res = await fetch(
      `http://localhost:3001/locations/addPrices?pickUp=${router?.query?.pickUp}&dropOff=${router?.query?.dropOff}`
    );

    if (res.ok) {
      setIsLoading(false);
      const data = await res.json();
      setDataInfo(data);
    }
  };

  dispatch(allFlightInfo({ ...router.query, ...dataInfo }));

  useEffect(() => {
    getData();

    dispatch(allFlightInfo({ ...router.query, ...dataInfo }));
  }, [router.query.pickUp]);

  if (isLoading) {
    return <p>Loading </p>;
  }

  let flightInfo;

  if (router.query.roundtrip) {
    flightInfo = {
      pickUp: dataInfo?.pickUp,
      dropOff: dataInfo?.dropOff,

      arrivalDate: router?.query?.pickUpDate,
      arrivalAt: `At ${router.query?.pickUpTime}`,

      departureDate: router.query?.dropOffDate,
      departureAt: `At ${router.query?.dropOffTime}`,
      passengers: router.query?.dropOffPassenger,

      priceTaxi1: dataInfo?.priceTaxi1,
      priceTaxi2: dataInfo?.priceTaxi2,
      priceTaxi3: dataInfo?.priceTaxi3,
      priceTaxi4: dataInfo?.priceTaxi4
    };
  }

  return (
    <div className={styled.bookingDetails}>
      <Container>
        <BookingStepProcess />
      </Container>
      <Container className={styled.bookingDetailsContainer}>
        <Suspense fallback="Loading...">
          <DynamicBookingSummary bookingDetailsWith={styled.bookingDetailsWith} />
          <div className={styled.cartAndPassengerDetail}>
            <DynamicCarList />
            <DynamicPassenger />
          </div>
        </Suspense>
      </Container>
    </div>
  );
}

export default BookingDetails;
