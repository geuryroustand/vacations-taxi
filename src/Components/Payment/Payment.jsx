/* eslint-disable jsx-a11y/label-has-associated-control */
// import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
// eslint-disable-next-line import/no-unresolved
import { Client, HydrationProvider } from "react-hydration-provider";

import styled from "./Payment.module.css";
import { bookingInfo } from "../../redux/flightInfoSlice";

const Payment = () => {
  const flightInfoReducer = useSelector((state) => state.flightInfoReducer) || {};
  const dispatch = useDispatch();
  const { totalPrice } = flightInfoReducer.bookingInfo || {};

  const [paymentMethod, setPaymentMethod] = useState("");

  const getPayMethod = (event) => {
    setPaymentMethod(event.target.value);
    dispatch(bookingInfo({ [event.target.name]: event.target.value }));
  };

  return (
    <HydrationProvider>
      <div className={styled.payment}>
        <h2 className={styled.paymentHeading}>Payment Details</h2>
        <p>Select your payment method</p>

        {/* <div className={styled.paymentWithCard}>
          <Form.Check
            label="Pay with:"
            type="radio"
            onChange={getPayMethod}
            name="paymentMethod"
            id="card"
            value="card"
            required
          />
          <Image src="/images/creditCards.svg" width="195.89px" height="18px" alt="location" />
        </div> */}

        <div>
          <Form.Check
            required
            onChange={getPayMethod}
            value="effective"
            type="radio"
            id="effective"
            label="Effective"
            name="paymentMethod"
          />
        </div>

        {paymentMethod === "card" ? (
          <p className={styled.paragraph}>
            You can pay by debit or credit card. We will redirect you to the stripe page, once the
            payment is done, you will be redirected to our website again.
          </p>
        ) : (
          <p className={styled.paragraph}>
            Please note that cash payments can only be made in cash for the total amount due once at
            destination.
          </p>
        )}

        <Form.Group>
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before booking."
            feedbackType="invalid"
            id="agree"
            name="agreedTermsAndConditions"
          />
        </Form.Group>

        <p>
          By clicking PAY & BOOK you are accepting our
          <a target="_blank" href="/terms-and-conditions" className={styled.termsAndConditions}>
            Terms and Conditions
          </a>
          and
          <a target="_blank" href="/privacy-notice" className={styled.termsAndConditions}>
            Privacy Notice
          </a>
        </p>
        <Client>
          <Button className={styled.paymentBtn} type="submit">
            Pay ${totalPrice} & Book
          </Button>
        </Client>
      </div>
    </HydrationProvider>
  );
};

export default Payment;
