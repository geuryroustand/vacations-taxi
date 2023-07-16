import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Button from "react-bootstrap/Button";
import styled from "./bookingDetails.module.css";
import { allFlightInfo } from "../../src/redux/flightInfoSlice";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";
import Loading from "../../src/Components/Loading/Loading";
import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import MyHead from "../../src/Components/MyHead/MyHead";

const DynamicBookingSummary = dynamic(
  () => import("../../src/Components/BookingSummary/BookingSummary"),
  {
    loading: () => <FallBackLoading />
  }
);

// TODO remove the local storage

const DynamicCarList = dynamic(() => import("../../src/Components/CarList/CarList"), {
  loading: () => <FallBackLoading />
});

const DynamicPassenger = dynamic(() => import("../../src/Components/Passenger/Passenger"), {
  loading: () => <FallBackLoading />
});

const DynamicHeader = dynamic(() => import("../../src/Components/Header/Header"), {
  loading: () => <FallBackLoading />
});

function BookingDetails() {
  const [isLoading, setIsLoading] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  const { pickUp, dropOff } = useSelector((state) => state.flightInfoReducer.flightInfo || {});

  const router = useRouter();
  const dispatch = useDispatch();

  // TODO  fixed the problem when fetch and the price its not find
  const getData = async () => {
    setIsLoading(true);
    setShowSearchForm(false);

    if (!router?.query?.pickUp && !router?.query?.dropOff) {
      setIsLoading(true);
      return;
    }
    const PROD = process.env.NODE_ENV === "production";
    const response = await fetch(
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

    if (response.ok) {
      setIsLoading(false);
      const data = await response.json();

      dispatch(allFlightInfo({ ...router.query, ...data }));
    }
  };

  useEffect(() => {
    getData();
  }, [
    router.query.pickUp,
    router.query.dropOff,
    router.query.roundtrip,
    router.query.dropOffDate,
    router.query.pickUpDate
  ]);

  if (isLoading) {
    return (
      <>
        <MyHead title="Searching..." noIndex canonicalURL="booking-details" />
        <Loading
          spinnerTitle="We are searching you the best price..."
          accessibilityTitle="We are searching the best price for you"
        />
      </>
    );
  }

  return (
    <div className={styled.bookingDetails}>
      <MyHead
        title={`${pickUp || ""}  ${pickUp && dropOff ? "to" : ""} ${dropOff || ""}`}
        noIndex
      />

      <Container>
        <BookingStepProcess />

        {showSearchForm && <DynamicHeader />}

        {!showSearchForm && (
          <Button onClick={() => setShowSearchForm(true)} className={styled.editBtn}>
            Edit trip
          </Button>
        )}
      </Container>
      <Container className={styled.bookingDetailsContainer}>
        <DynamicBookingSummary bookingDetailsWith={styled.bookingDetailsWith} />
        <div className={styled.cartAndPassengerDetail}>
          <DynamicCarList />
          <DynamicPassenger />
        </div>
      </Container>
    </div>
  );
}

export default BookingDetails;
