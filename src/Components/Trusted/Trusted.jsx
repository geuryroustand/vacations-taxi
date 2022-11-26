import React from "react";
import Container from "react-bootstrap/Container";
import { Why } from "./Why";
import styled from "./Trusted.module.css";

const Trusted = () => {
  return (
    <section className={styled.trusted}>
      <Container className={styled.content}>
        <Why
          svgName="airplane.svg"
          alt="airplane "
          width="32px"
          height="32px"
          title="Flight tracking"
          paragraph="Your driver tracks your flight and waits for you if its delayed"
          className="first"
        />
        <Why
          svgName="credit-card.svg"
          alt="credit-card "
          width="32px"
          height="32px"
          title="One clear price"
          paragraph="Your price is confirmed upfront – no extra costs, no cash required"
          className="second"
        />
        <Why
          svgName="payment.svg"
          alt="payment "
          width="32px"
          height="32px"
          title="Tried and trust"
          paragraph="We work with professional drivers and have 24/7 customer care"
          className="third"
        />
      </Container>
    </section>
  );
};

export default Trusted;
