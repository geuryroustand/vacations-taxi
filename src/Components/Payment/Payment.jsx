/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/label-has-associated-control */

// import Image from "next/image";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";

import Link from "next/link";
import styled from "./Payment.module.css";

const Payment = () => {
  const { bookingInfo } = useSelector((state) => state.flightInfoReducer) || {};

  const { totalPrice } = bookingInfo || {};

  const [paymentMethod, setPaymentMethod] = useState("");

  const getPayMethod = (event) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <div className={styled.payment}>
      <h2 className={styled.paymentHeading}>Payment Details</h2>
      <p>Select your payment method</p>

      {/* <div className={styled.paymentWithCard}>
        <input type="radio" onChange={getPayMethod} name="paymentMethod" id="card" value="card" />
        <label htmlFor="card">Pay with:</label>
        <Image src="/images/creditCards.svg" width="195.89px" height="18px" alt="location" />
      </div> */}

      <div>
        <input
          onChange={getPayMethod}
          type="radio"
          name="paymentMethod"
          id="effective"
          value="effective"
          checked
        />
        <label htmlFor="effective">Effective</label>
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

      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before booking."
          feedbackType="invalid"
        />
      </Form.Group>

      <p>
        By clicking PAY & BOOK you are accepting our
        <Link target="_blank" href="#">
          <a className={styled.termsAndConditions}> Terms and Conditions</a>
        </Link>
        and
        <Link className={styled.termsAndConditions} target="_blank" href="#">
          <a className={styled.termsAndConditions}>Privacy Notice</a>
        </Link>
      </p>

      <Button className={styled.paymentBtn} type="submit">
        Pay ${totalPrice} & Book
      </Button>
    </div>
  );
};

export default Payment;
