import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useDispatch, useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import { useRouter } from "next/router";

import styled from "./Passenger.module.css";
import { bookingInfo } from "../../redux/flightInfoSlice";

const Passenger = () => {
  const [validated, setValidated] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const [passengerInfo, setPassengerInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobileNumber: "",
    arrivalAirlineName: "",
    arrivalFlightNumber: "",
    departureAirlineName: "",
    departureFlightNumber: "",
    requests: ""
  });

  const { roundtrip } = useSelector((state) => state.flightInfoReducer.flightInfo) || {};

  const sendData = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!form.checkValidity() === false) {
      dispatch(bookingInfo(passengerInfo));
      router.push("/payment-details");
    }

    setValidated(true);
  };

  const getPassengerInfo = (event) => {
    setPassengerInfo({
      ...passengerInfo,
      [event.target.name]: event.target.value
    });
  };

  return (
    <Form className={styled.form} noValidate validated={validated} onSubmit={sendData}>
      <div className={styled.passenger}>
        <h2>Passenger Details</h2>
        <div className={styled.controlForm}>
          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="fistName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Joe"
              required
              name="firstName"
              value={passengerInfo.firstName}
              onChange={getPassengerInfo}
            />
            <Form.Control.Feedback type="invalid">
              Please enter your fist name
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Does"
              required
              name="lastName"
              value={passengerInfo.lastName}
              onChange={getPassengerInfo}
            />

            <Form.Control.Feedback type="invalid">
              Please enter your last name
            </Form.Control.Feedback>
          </Form.Group>
        </div>

        <div className={styled.controlForm}>
          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              required
              name="email"
              value={passengerInfo.email}
              onChange={getPassengerInfo}
            />
            <Form.Text className="text-muted">
              We ll send you the confirmation voucher here
            </Form.Text>

            <Form.Control.Feedback type="invalid">Please enter a valid email</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="mobile">
            <Form.Label>Mobile Number</Form.Label>
            <PhoneInput
              className={`form-control ${styled.phoneInput}`}
              international
              defaultCountry="DO"
              placeholder="Enter mobile number"
              required
              name="mobile"
              id="mobile"
              value={passengerInfo.mobileNumber}
              onChange={(mobileNumber) =>
                setPassengerInfo({
                  ...passengerInfo,
                  mobileNumber
                })
              }
            />
          </Form.Group>
        </div>
      </div>

      <div className={styled.flightDetails}>
        <h2>Flight Details</h2>

        <div className={styled.controlForm}>
          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="airLineName">
            <Form.Label>Arrival Airline Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Air Canada"
              name="arrivalAirlineName"
              value={passengerInfo.arrivalAirlineName}
              onChange={getPassengerInfo}
            />
          </Form.Group>

          <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="arrivalFlightNumber">
            <Form.Label>Flight Number</Form.Label>
            <Form.Control
              type="text"
              placeholder="ATC5962"
              name="arrivalFlightNumber"
              value={passengerInfo.arrivalFlightNumber}
              onChange={getPassengerInfo}
            />
          </Form.Group>
        </div>

        {roundtrip && (
          <div className={styled.controlForm}>
            <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="departureAirlineName">
              <Form.Label>Departure Airline Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Air Canada"
                name="departureAirlineName"
                value={passengerInfo.departureAirlineName}
                onChange={getPassengerInfo}
              />
            </Form.Group>

            <Form.Group className={`mb-3 ${styled.formGroup}`} controlId="departureFlightNumber">
              <Form.Label>Flight Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="ATC456"
                name="departureFlightNumber"
                value={passengerInfo.departureFlightNumber}
                onChange={getPassengerInfo}
              />
            </Form.Group>
          </div>
        )}

        <div className={styled.controlForm}>
          <Form.Group className={`mb-3 ${styled.formTextArea}`} controlId="controlTextarea1">
            <Form.Label>Any requests?</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Things like: I need a child set or Please hold a sign that says..."
              name="requests"
              value={passengerInfo.requests}
              onChange={getPassengerInfo}
            />
          </Form.Group>
        </div>
      </div>

      <Button type="submit" className={styled.continueBtn}>
        Continue
      </Button>
      {/* <Link type="submit" href="#">
        Continue
      </Link> */}
    </Form>
  );
};

export default Passenger;
