import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { Client, HydrationProvider } from "react-hydration-provider";

import styled from "./Payment.module.css";
import { bookingInfo } from "../../redux/flightInfoSlice";

const Payment = ({ payment }) => {
  const flightInfoReducer = useSelector((state) => state.flightInfoReducer) || {};
  const dispatch = useDispatch();
  const { totalPrice } = flightInfoReducer.bookingInfo || {};

  const [paymentMethod, setPaymentMethod] = useState("");

  const {
    heading = "",
    selectPayment = "",
    paymentCardDesc = "",
    paymentCashDesc = "",
    paymentCash = "",
    agreeLabel = "",
    agreeFeedBack = "",
    accepting = "",
    terms = "",
    and = "",
    privacy = "",
    pay = "",
    book = ""
  } = payment;
  const getPayMethod = (event) => {
    setPaymentMethod(event.target.value);
    dispatch(bookingInfo({ [event.target.name]: event.target.value }));
  };

  return (
    <HydrationProvider>
      <div className={styled.payment}>
        <h2 className={styled.paymentHeading}>{heading}</h2>
        <p>{selectPayment}</p>

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
          <Image src="/images/creditCards.svg" width="195.89" height="18" alt="location" />
        </div> */}

        <div>
          <Form.Check
            required
            onChange={getPayMethod}
            value="effective"
            type="radio"
            id="effective"
            label={paymentCash}
            name="paymentMethod"
          />
        </div>

        {paymentMethod === "card" ? (
          <p className={styled.paragraph}>{paymentCardDesc}</p>
        ) : (
          <p className={styled.paragraph}>{paymentCashDesc}</p>
        )}

        <Form.Group>
          <Form.Check
            required
            label={agreeLabel}
            feedback={agreeFeedBack}
            feedbackType="invalid"
            id="agree"
            name="agreedTermsAndConditions"
          />
        </Form.Group>

        <p>
          {accepting}
          <Link target="_blank" href="/terms-and-conditions" className={styled.termsAndConditions}>
            {terms}
          </Link>
          {and}
          <Link target="_blank" href="/privacy-notice" className={styled.termsAndConditions}>
            {privacy}
          </Link>
        </p>
        <Client>
          <Button className={styled.paymentBtn} type="submit">
            {pay} ${totalPrice} & {book}
          </Button>
        </Client>
      </div>
    </HydrationProvider>
  );
};

export default Payment;
