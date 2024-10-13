/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { Client, HydrationProvider } from "react-hydration-provider";

import styled from "./Payment.module.css";
import { allFlightInfo, bookingInfo, updateTotalPrice } from "../../redux/flightInfoSlice";

const Payment = ({ payment }) => {
  const flightInfoReducer = useSelector((state) => state.flightInfoReducer) || {};
  const dispatch = useDispatch();
  const { totalPrice } = flightInfoReducer.bookingInfo || {};
  const router = useRouter();
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

  useEffect(() => {
    if (!totalPrice) {
      delete router.query.priceTaxi1;
      dispatch(allFlightInfo(router.query));
      dispatch(updateTotalPrice({ totalPrice: router.query.totalPrice }));
      dispatch(bookingInfo(router.query));
    }
  }, [router.query]);

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
          <Link href="/terms-and-conditions" target="_blank" className={styled.termsAndConditions}>
            {terms}
          </Link>
          {and}
          <Link href="/privacy-notice" target="_blank" className={styled.termsAndConditions}>
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
