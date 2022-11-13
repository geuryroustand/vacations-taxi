import React from "react";

import dynamic from "next/dynamic";
import { Suspense } from "react";

import BookingSummary from "../../src/Components/BookingSummary/BookingSummary";
import CarList from "../../src/Components/CarList/CarList";
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

import Container from "react-bootstrap/Container";

import styled from "./bookingDetails.module.css";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";

export default function BookingDetails() {
  const [isLoading, setIsLoading] = useState(null);
  const [dataInfo, setDataInfo] = useState();

  const router = useRouter();

  // const {
  //   dropOffDate,
  //   dropOffPassenger,
  //   dropOffReturn,
  //   dropOffTime,

  //   pickUpDate,
  //   pickUpPassenger,
  //   pickUpReturn,
  //   pickUpTime,
  //   roundtrip,

  //   pickUp,
  //   dropOff
  // } = router?.query;

  console.log(router.query);
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

  useEffect(() => {
    getData();
  }, [router.query.pickUp]);

  if (isLoading) {
    return <p>Loading </p>;
  }

  let flightInfo;
  console.log(dataInfo);
  if (router.query.roundtrip) {
    flightInfo = {
      from: dataInfo?.pickUp,
      to: dataInfo?.dropOff,
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

  const { pathname } = useRouter();
  const currentProcess = pathname === "/bookingDetails" ? "process" : "";
  console.log(pathname);

  return (
    <div className={styled.bookingDetails}>
      <Container>
        <BookingStepProcess />
      </Container>
      <Container className={styled.bookingDetailsContainer}>
        <Suspense fallback={`Loading...`}>
          <DynamicBookingSummary
            flightInfo={flightInfo}
            bookingDetailsWith={styled.bookingDetailsWith}
          />
          <div className={styled.cartAndPassengerDetail}>
            <DynamicCarList
              priceTaxi1={dataInfo?.priceTaxi1}
              priceTaxi2={dataInfo?.priceTaxi2}
              priceTaxi3={dataInfo?.priceTaxi3}
              priceTaxi4={dataInfo?.priceTaxi4}
              OneWayOrRoundTrip={router.query?.roundtrip ? "RoundTrip" : "One way"}
            />
            <DynamicPassenger />
          </div>
        </Suspense>
      </Container>
    </div>
  );
}
