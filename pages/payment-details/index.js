import React, { Suspense, useState } from "react";
import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import { useSelector } from "react-redux";
import { useRouter } from "next/router";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import styled from "./paymentDetails.module.css";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";
import { persistor } from "../../src/redux/store";
import MyHead from "../../src/Components/MyHead/MyHead";

const DynamicBookingSummary = dynamic(
  () => import("../../src/Components/BookingSummary/BookingSummary"),
  {
    suspense: true
  }
);

const DynamicPayment = dynamic(() => import("../../src/Components/Payment/Payment"), {
  suspense: true
});

function paymentDetails() {
  persistor.purge();
  const { bookingInfo } = useSelector((state) => state.flightInfoReducer);
  const router = useRouter();
  const [validated, setValidated] = useState(false);

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

        if (!response.ok) throw new Error("Not found ,Contact us here to help you");

        // const getDestinations = await response.json();
        router.push("/");

        persistor.purge();
      } catch (error) {
        console.log(error);
      }
    }

    setValidated(true);
  };

  return (
    <Form className={styled.paymentDetails} noValidate validated={validated} onSubmit={sendInfo}>
      <MyHead title="Payment" noIndex />

      <Container>
        <BookingStepProcess />
      </Container>

      <Container className={styled.paymentDetailsContainer}>
        <Suspense fallback={<FallBackLoading />}>
          <DynamicBookingSummary />

          <DynamicPayment />
        </Suspense>
      </Container>
    </Form>
  );
}

export default paymentDetails;
