import React from "react";
import styled from "./Payment.module.css";

import Image from "next/image";
import { Button } from "react-bootstrap";
import Link from "next/link";

const Payment = () => {
  return (
    <div className={styled.payment}>
      <h2 className={styled.paymentHeading}>Payment Details</h2>
      <p>Select your payment method</p>

      <div className={styled.paymentWithCard}>
        <input type="radio" name="paymentMethod" id="card" value="card" /> 
        <label htmlFor="card">Pay with:</label>
        <Image src="/images/creditCards.svg" width="195.89px" height="18px" alt="location" />
      </div>

      <div>
        <input type="radio" name="paymentMethod" id="effective" value="effective" /> 
        <label htmlFor="effective">Effective</label>
      </div>
      <p className={styled.paragraph}>
        You can pay with debit or credit card. We going to be redirect to stripe , once the payment
        its done you going to be redirect to our website again.
      </p>

      <p>
        By clicking 'PAY & BOOK' you are accepting our
        <Link target="_blank" href="#">
          <a className={styled.termsAndConditions}> Terms and Conditions</a>
        </Link>
        and
        <Link className={styled.termsAndConditions} target="_blank" href="#">
          <a className={styled.termsAndConditions}>Privacy Notice</a>
        </Link>
      </p>

      <Button className={styled.paymentBtn} type="submit">
        Pay $000 & Book
      </Button>
    </div>
  );
};

export default Payment;
