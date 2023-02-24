/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/no-null */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-unused-vars */

import React, { Suspense, useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import styled from "./bookingDetails.module.css";
import { allFlightInfo } from "../../src/redux/flightInfoSlice";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";
import Loading from "../../src/Components/Loading/Loading";
import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import MyHead from "../../src/Components/MyHead/MyHead";
// import { persistor } from "../../src/redux/store";

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
  // persistor.purge();
  const [isLoading, setIsLoading] = useState(null);

  const { pickUp, dropOff } = useSelector((state) => state.flightInfoReducer.flightInfo || {});

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

  const dispatch = useDispatch();

  // TODO  fixed the problem when fetch and the price its not find
  const getData = async () => {
    setIsLoading(true);

    if (!router?.query?.pickUp && !router?.query?.dropOff) {
      setIsLoading(true);
      return;
    }
    const PROD = process.env.NODE_ENV === "production";
    const res = await fetch(
      `${
        PROD
          ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/locations/addPrices?pickUp=${
              router?.query?.pickUp
            }&dropOff=${router?.query?.dropOff}&roundtrip=${router?.query?.roundtrip ?? false}`
          : `${process.env.NEXT_PUBLIC_API_DEV_URL}/locations/addPrices?pickUp=${
              router?.query?.pickUp
            }&dropOff=${router?.query?.dropOff}&roundtrip=${router?.query?.roundtrip ?? false}`
      }`
    );

    if (res.ok) {
      setIsLoading(false);
      const data = await res.json();

      dispatch(allFlightInfo({ ...router.query, ...data }));
    }
  };

  useEffect(() => {
    getData();
  }, [router.query.pickUp, router.query.dropOff]);

  if (isLoading) {
    return (
      <>
        <MyHead title="Searching..." noIndex />
        <Loading />;
      </>
    );
  }

  // let flightInfo;

  // if (router.query.roundtrip) {
  //   flightInfo = {
  //     pickUp: dataInfo?.pickUp,
  //     dropOff: dataInfo?.dropOff,

  //     arrivalDate: router?.query?.pickUpDate,
  //     arrivalAt: `At ${router.query?.pickUpTime}`,

  //     departureDate: router.query?.dropOffDate,
  //     departureAt: `At ${router.query?.dropOffTime}`,
  //     passengers: router.query?.dropOffPassenger,

  //     priceTaxi1: dataInfo?.priceTaxi1,
  //     priceTaxi2: dataInfo?.priceTaxi2,
  //     priceTaxi3: dataInfo?.priceTaxi3,
  //     priceTaxi4: dataInfo?.priceTaxi4
  //   };
  // }

  return (
    <div className={styled.bookingDetails}>
      <MyHead
        title={`${pickUp || ""}  ${pickUp && dropOff ? "to" : ""} ${dropOff || ""}`}
        noIndex
      />
      <Container>
        <BookingStepProcess />
      </Container>
      <Container className={styled.bookingDetailsContainer}>
        <Suspense fallback={<FallBackLoading />}>
          <DynamicBookingSummary bookingDetailsWith={styled.bookingDetailsWith} />
          <div className={styled.cartAndPassengerDetail}>
            <Suspense fallback={<FallBackLoading />}>
              <DynamicCarList />
              <DynamicPassenger />
            </Suspense>
          </div>
        </Suspense>
      </Container>
    </div>
  );
}

export default BookingDetails;
