import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import MyHead from "../../src/Components/MyHead/MyHead";
import styled from "./postsAndRequests.module.css";

function Requests() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const currentDate = `${day}-${month}-${year}`;
  // Todo
  // after the user make a post , need to create links with the locations of the posts in the results page

  const [value, setValue] = useState({
    requestOrPost: "request",
    oneWayOrRoundTrip: "oneWay"
  });
  const { requestOrPost, oneWayOrRoundTrip } = value;

  const onChange = (event) => {
    setValue({ ...value, [event.target.name]: event.target.value });
  };

  return (
    <div className={styled.main}>
      <Container className={styled.containerForm}>
        <MyHead title="Post or Request a Trip" noIndex canonicalURL="post-or-request-a-trip" />
        <h1 className={styled.mainHeading}>Post or Request a Trip</h1>
        <Form>
          <div className={styled.radioButton}>
            <Form.Check
              checked={requestOrPost === "request"}
              type="radio"
              value="request"
              name="requestOrPost"
              id="request"
              label="Request"
              onChange={onChange}
            />
            <Form.Check
              type="radio"
              checked={requestOrPost === "post"}
              value="post"
              id="post"
              label="Post"
              name="requestOrPost"
              onChange={onChange}
            />
          </div>
          <div className={styled.passengerDetails}>
            <h2>Passenger Details</h2>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="First Name" />
              </Form.Group>

              <Form.Group as={Col} className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Last Name" />
              </Form.Group>
            </Row>
            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    When someone leaves a comment, you will be notified by email at the following
                    address.
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group controlId="formSelect">
                  <Form.Label>How many passengers?</Form.Label>
                  <Form.Select defaultValue="Choose...">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>
          <div className={styled.radioButton}>
            <Form.Check
              type="radio"
              value="oneWay"
              checked={oneWayOrRoundTrip === "oneWay"}
              id="oneWay"
              label="OneWay"
              name="oneWayOrRoundTrip"
              onChange={onChange}
            />
            <Form.Check
              type="radio"
              value="roundTrip"
              checked={oneWayOrRoundTrip === "roundTrip"}
              name="oneWayOrRoundTrip"
              id="roundTrip"
              label="RoundTrip"
              onChange={onChange}
            />
          </div>
          <div className={styled.tripDetails}>
            <h2>Trip Details</h2>
            <Row>
              <Form.Group as={Col} className="mb-3" controlId="formArrivalDate">
                <Form.Label>Arrival Date </Form.Label>
                <Form.Control type="date" min={currentDate} />
              </Form.Group>
              <Form.Group as={Col} className="mb-3" controlId="formTime">
                <Form.Label>Time</Form.Label>
                <Form.Control type="time" />
              </Form.Group>
              {requestOrPost === "post" && (
                <Col md>
                  <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price $USD</Form.Label>
                    <Form.Control type="text" placeholder="price" />
                  </Form.Group>
                </Col>
              )}
            </Row>

            <Row>
              <Col md>
                <Form.Group className="mb-3" controlId="formPickLocation">
                  <Form.Label>Pick-Up Location</Form.Label>
                  <Form.Control type="text" placeholder="Pick-Up Location" />
                </Form.Group>
              </Col>
              <Col md>
                <Form.Group className="mb-3" controlId="formDropLocation">
                  <Form.Label>Drop Location</Form.Label>
                  <Form.Control type="text" placeholder="Drop Location" />
                </Form.Group>
              </Col>
            </Row>
          </div>

          {oneWayOrRoundTrip === "roundTrip" && (
            <div className={styled.tripDetails}>
              <Row>
                <Form.Group as={Col} className="mb-3" controlId="formDepartureDate">
                  <Form.Label>Departure Date </Form.Label>
                  <Form.Control type="date" min={currentDate} />
                </Form.Group>
                <Form.Group as={Col} className="mb-3" controlId="formDepartureTime">
                  <Form.Label>Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
                {requestOrPost === "post" && (
                  <Col md>
                    <Form.Group className="mb-3" controlId="formDeparturePrice">
                      <Form.Label>Price $USD</Form.Label>
                      <Form.Control type="text" placeholder="price" />
                    </Form.Group>
                  </Col>
                )}
              </Row>
              <Row>
                <Col md>
                  <Form.Group className="mb-3" controlId="formDeparturePickLocation">
                    <Form.Label>Pick-Up Location</Form.Label>
                    <Form.Control type="text" placeholder="Pick-Up Location" />
                  </Form.Group>
                </Col>
                <Col md>
                  <Form.Group className="mb-3" controlId="formDepartureDropLocation">
                    <Form.Label>Drop Location</Form.Label>
                    <Form.Control type="text" placeholder="Drop Location" />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          )}

          <div className={styled.textArea}>
            <Form.Group className="mb-3" controlId="form.ControlTextarea">
              <Form.Label>Anything to say to other travelers?</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </div>
          <Button className={styled.button} type="submit">
            {requestOrPost === "request" ? "Post request " : "Post trip"}
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default Requests;
