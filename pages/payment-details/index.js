import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { useSelector } from "react-redux";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import Loading from "../../src/Components/Loading/Loading";
import styled from "./paymentDetails.module.css";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";

import MyHead from "../../src/Components/MyHead/MyHead";
import store from "../../src/redux/store";
import { getContent, getTranslation } from "../../src/redux/fetchApiSlice";
import { baseURL } from "../../src/Helper/fetchData";

const DynamicBookingSummary = dynamic(
  () => import("../../src/Components/BookingSummary/BookingSummary"),
  {
    loading: () => <FallBackLoading />
  }
);
// TODO remove the local storage and disable the navigation and payment
const DynamicPayment = dynamic(() => import("../../src/Components/Payment/Payment"), {
  loading: () => <FallBackLoading />
});

function paymentDetails() {
  const { bookingInfo } = useSelector((state) => state.flightInfoReducer);
  const router = useRouter();

  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYouMessage] = useState(false);

  const queryKey = `getContent("${baseURL}/booking-detail?locale=${router.locale}&populate=*")`;
  const {
    payment = {},
    paymentLoadingTitle = "",
    paymentSpinnerTitle = "",
    paymentAccessibilityTitle = "",
    paymentTitle = ""
  } = useSelector((state) => state?.fetchApi?.queries[queryKey]?.data?.data?.attributes || {});

  useEffect(() => {
    const mainElement = document.querySelector(".main");
    if (showThankYouMessage) {
      mainElement.classList?.add(styled.mainElement);
    }
  }, []);

  const sendInfo = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    const cleanEmpty = Object?.fromEntries(
      Object?.keys(bookingInfo)
        ?.filter((k) => bookingInfo[k] !== "")
        ?.map((k) => [k, bookingInfo[k]])
    );

    if (!form.checkValidity() === false) {
      try {
        const PROD = process.env.NODE_ENV === "production";
        setIsLoading(true);
        const response = await fetch(
          `${
            PROD
              ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/bookings`
              : `${process.env.NEXT_PUBLIC_API_DEV_URL}/bookings`
          }`,

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify(cleanEmpty)
          }
        );

        if (!response.ok)
          throw new Error(
            "A problem occurred while we were processing your reservation. Please try again or contact us to help you."
          );
        router.replace("/booking-confirmation");

        router.replace({
          pathname: "/booking-confirmation"
          // query: { ...cleanEmpty }
        });
      } catch {
        setIsLoading(false);
      }
    }

    setValidated(true);
  };

  if (isLoading) {
    return (
      <>
        <MyHead title={paymentLoadingTitle} noIndex />
        <Loading
          spinnerTitle={paymentSpinnerTitle}
          accessibilityTitle={paymentAccessibilityTitle}
        />
        ;
      </>
    );
  }

  return (
    <>
      <MyHead title={paymentTitle} noIndex />
      <Form className={styled.paymentDetails} noValidate validated={validated} onSubmit={sendInfo}>
        <Container>
          <BookingStepProcess />
        </Container>
        <Container className={styled.paymentDetailsContainer}>
          <DynamicBookingSummary />
          <DynamicPayment payment={payment} />
        </Container>
      </Form>
    </>
  );
}

export default paymentDetails;

const fetchTranslationData = async (dispatch, locale) => {
  await dispatch(getTranslation.initiate(locale));
  await dispatch(getContent.initiate(`${baseURL}/booking-detail?locale=${locale}&populate=*`));
};

export const getStaticProps = store.getStaticProps((storeValue) => async ({ locale }) => {
  const { dispatch } = storeValue;
  if (locale) {
    await fetchTranslationData(dispatch, locale);
  }
});
