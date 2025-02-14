/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import { useDispatch, useSelector } from "react-redux";

import { fetchPrice } from "../../src/redux/flightInfoSlice";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";
import Loading from "../../src/Components/Loading/Loading";
import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import SeoHead from "../../src/Components/SeoHead/SeoHead";

import styled from "./bookingDetails.module.css";

import store from "../../src/redux/store";

import flightDetailsSelector from "../../src/Helper/memoizedSelectors";
import { fetchCommonContent, fetchContent } from "../../src/redux/ContentEndpoints";

const PROD = process.env.NODE_ENV === "production";

const baseURL = PROD
  ? process.env.NEXT_PUBLIC_API_PROD_URL_STRAPI
  : process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL;

const DynamicBookingSummary = dynamic(
  () => import("../../src/Components/BookingSummary/BookingSummary"),
  {
    loading: () => <FallBackLoading />
  }
);

// TODO remove the local storage  and also check the state error

const DynamicCarList = dynamic(() => import("../../src/Components/CarList/CarList"), {
  ssr: false,
  loading: () => <FallBackLoading />
});

const DynamicPassenger = dynamic(() => import("../../src/Components/Passenger/Passenger"), {
  loading: () => <FallBackLoading />
});

const DynamicHeader = dynamic(() => import("../../src/Components/Header/Header"), {
  loading: () => <FallBackLoading />
});

function BookingDetails() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [showSearchForm, setShowSearchForm] = useState(false);
  const { pickUpMemoized, dropOffMemoized } = useSelector(flightDetailsSelector);
  const isRoundTrip = router?.query?.roundtrip;
  const flightInfoReducer = useSelector((state) => state.flightInfoReducer || {});

  const { flightInfo } = flightInfoReducer;
  const { locale } = useRouter();

  const queryKey = `fetchContent("${baseURL}/booking-detail?locale=${locale}&populate=*")`;

  const {
    title = "",
    slug = "",
    loadingSpinner = "",
    loadingSpinnerAccessibility = "",
    editButton = ""
  } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );
  const { isLoading } = useSelector((state) => state.flightInfoReducer || {});

  useEffect(() => {
    if (router.query.pickUp && router.query.dropOff) {
      dispatch(fetchPrice(router.query));
    }
  }, [router.query.pickUp, router.query.dropOff, router.query.roundtrip]);

  useEffect(() => {
    if (
      (router.query.dropOffDate && router.query.dropOffTime) ||
      (router.query.pickUpDate && router.query.pickUpTime) ||
      router.query.pickUpPassenger
    ) {
      const onlyUpdateFlightInfo = true;

      const mergeQueries = {
        ...flightInfo,
        pickUpPassenger: router.query.pickUpPassenger,
        pickUpTime: router.query.pickUpTime,
        pickUpDate: router.query.pickUpDate,
        dropOffDate: router.query.dropOffDate,
        dropOffTime: router.query.dropOffTime,
        onlyUpdateFlightInfo
      };

      dispatch(fetchPrice(mergeQueries));
    }
  }, [
    router.query.dropOffDate,
    router.query.dropOffTime,
    router.query.pickUpDate,
    router.query.pickUpTime,
    router.query.pickUpPassenger
  ]);

  if (isLoading) {
    return (
      <>
        <SeoHead title={title} noIndex canonicalURL={slug} />
        <Loading spinnerTitle={loadingSpinner} accessibilityTitle={loadingSpinnerAccessibility} />
      </>
    );
  }

  const showForm = showSearchForm || !isRoundTrip;
  const showEditButton = !showSearchForm && isRoundTrip;

  return (
    <div className={styled.bookingDetails}>
      <SeoHead
        title={`${pickUpMemoized || ""}  ${pickUpMemoized && dropOffMemoized ? "to" : ""} ${
          dropOffMemoized || ""
        }`}
        noIndex
      />

      <Container>
        <BookingStepProcess />

        {showForm && <DynamicHeader />}

        {showEditButton && (
          <Button onClick={() => setShowSearchForm(true)} className={styled.editBtn}>
            {editButton}
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

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(fetchCommonContent.initiate(locale));
  await dispatch(fetchContent.initiate(`${baseURL}/booking-detail?locale=${locale}&populate=*`));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
});
