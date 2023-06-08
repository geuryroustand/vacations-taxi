import React from "react";
import Container from "react-bootstrap/Container";
import Image from "next/legacy/image";

import styled from "./HowWork.module.css";

const HowWork = () => {
  return (
    <section className={styled.howWork} id="how-we-work">
      <h2>How Does It Work?</h2>
      <Container className={styled.howWorkContainer}>
        <div className={styled.howWorkContext}>
          <Image
            src="/images/car.svg"
            width="107.12"
            height="107.12"
            alt="AZS Samana Airport Transfers"
          />
          <h3>Book</h3>
          <p />
        </div>

        <div className={styled.howWorkContext}>
          <Image
            src="/images/locationHowWork.svg"
            width="107.12"
            height="107.12"
            alt="PUJ Punta Cana Airport Taxi Services"
          />
          <h3>Arrive</h3>
          <p />
        </div>

        <div className={styled.howWorkContext}>
          <Image
            src="/images/driver.svg"
            width="107.12"
            height="107.12"
            alt="POP Puerto Plata Airport Transfers"
          />
          <h3>Meet Your Driver</h3>
        </div>
      </Container>
    </section>
  );
};

export default HowWork;
