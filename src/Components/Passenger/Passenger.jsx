import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Link from "next/link";

import styled from "./Passenger.module.css";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

const Passenger = () => {
  const [value, setValue] = useState();

  console.log(value);
  return (
    <Form className={styled.form}>
      <div className={styled.passenger}>
        <h2>Passenger Details</h2>
        <div className={styled.controlForm}>
          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="fistName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Joe" />
          </Form.Group>

          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Does" />
          </Form.Group>
        </div>

        <div className={styled.controlForm}>
          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll send you the confirmation voucher here
            </Form.Text>
          </Form.Group>

          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="mobile">
            <Form.Label>Mobile Number</Form.Label>
            <PhoneInput
              className={`form-control ${styled.phoneInput}`}
              international
              defaultCountry="DO"
              placeholder="Enter mobile number"
              value={value}
              onChange={setValue}
            />
          </Form.Group>
        </div>
      </div>

      <div className={styled.flightDetails}>
        <h2>Flight Details</h2>

        <div className={styled.controlForm}>
          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="airLineName">
            <Form.Label>Arrival Airline Name</Form.Label>
            <Form.Control type="text" placeholder="Air Canada" />
          </Form.Group>

          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="lastName">
            <Form.Label>Flight Number</Form.Label>
            <Form.Control type="text" placeholder="ATC5962" />
          </Form.Group>
        </div>

        <div className={styled.controlForm}>
          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="airLineName">
            <Form.Label>Departure Airline Name</Form.Label>
            <Form.Control type="text" placeholder="Air Canada" />
          </Form.Group>

          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="lastName">
            <Form.Label>Flight Number</Form.Label>
            <Form.Control type="text" placeholder="ATC456" />
          </Form.Group>
        </div>
      </div>

      <Link type="submit" className={styled.continueBtn} href="#">
        Continue
      </Link>
    </Form>
  );
};

export default Passenger;
