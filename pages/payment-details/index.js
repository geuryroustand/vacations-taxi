/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */

import React, { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useSelector } from "react-redux";
import Link from "next/link";

import FallBackLoading from "../../src/Components/Loading/FallBackLoading";
import Loading from "../../src/Components/Loading/Loading";
import styled from "./paymentDetails.module.css";
import BookingStepProcess from "../../src/Components/BookingStepProcess/BookingStepProcess";

import MyHead from "../../src/Components/MyHead/MyHead";

const DynamicBookingSummary = dynamic(
  () => import("../../src/Components/BookingSummary/BookingSummary"),
  {
    loading: () => <FallBackLoading />
  }
);
// TODO remove the local storage
const DynamicPayment = dynamic(() => import("../../src/Components/Payment/Payment"), {
  loading: () => <FallBackLoading />
});

function paymentDetails() {
  const { bookingInfo } = useSelector((state) => state.flightInfoReducer);

  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  const router = useRouter();

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

        // setIsLoading(false);
        // const getDestinations = await response.json();
        // router.replace("/");
        // setShowThankYouMessage(true);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    }

    setValidated(true);
  };

  if (isLoading) {
    return (
      <>
        <MyHead title="Booking..." noIndex canonicalURL="payment-details" />
        <Loading
          spinnerTitle="We are processing your reservation."
          accessibilityTitle="We are processing your reservation"
        />
        ;
      </>
    );
  }

  return (
    <>
      <MyHead title="Payment" noIndex />
      <Form className={styled.paymentDetails} noValidate validated={validated} onSubmit={sendInfo}>
        <Container>
          <BookingStepProcess />
        </Container>
        <Container className={styled.paymentDetailsContainer}>
          <DynamicBookingSummary />
          <DynamicPayment />
        </Container>
      </Form>
    </>
  );

  // : (
  //   <>
  //     <MyHead title="Confirmation" noIndex />
  //     <Container>
  //       <Alert className={styled.showThankYouAlertMessage} variant="success">
  //         <Alert.Heading> Important: Please Check Spam/Junk Folder</Alert.Heading>
  //         <p>
  //           Thank you for choosing our airport transfer service! We want to ensure that your journey
  //           begins smoothly, and to that end, we will be sending you an email confirmation shortly
  //           after booking. However, due to email filters and settings, it&apos;s possible that our
  //           message might end up in your spam or junk folder.
  //         </p>

  //         <p className="mb-0">
  //           To avoid any inconvenience, we kindly request you to take a moment to check your
  //           spam/junk folder.
  //         </p>
  //         <p>
  //           If you haven&apos;t received our email confirmation within 1 hour, or if you encounter
  //           any other issues, please don&apos;t hesitate to contact our customer support team at{" "}
  //           <a href="tel:+13608607857 ">+1 (360) 860-7857 (USA)</a> or via email at{" "}
  //           <a href="mailto:info@vacationstaxis.com">info@vacationstaxis.com</a>. We&apos;re here to
  //           assist you and ensure your airport transfer experience is hassle-free.
  //         </p>
  //         <hr />
  //         <p>
  //           Thank you once again for choosing our services. We look forward to serving you and
  //           providing a comfortable and convenient airport transfer.
  //         </p>
  //       </Alert>

  //       <Link href="/">Go back to the Home Page</Link>
  //     </Container>
  //   </>
  // );
}

export default paymentDetails;
