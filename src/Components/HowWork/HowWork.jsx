import React from "react";
import Container from "react-bootstrap/Container";
import Image from "next/image";

import styled from "./HowWork.module.css";

const HowWork = () => {
  return (
    <section className={styled.howWork}>
      <h2>How it work?</h2>
      <Container className={styled.howWorkContainer}>
        <div className={styled.howWorkContext}>
          <Image src="/images/car.svg" width="107.12px" height="107.12px" alt="car icon" />
          <h3>Book Online</h3>
          <p />
        </div>

        <div className={styled.howWorkContext}>
          <Image src="/images/driver.svg" width="107.12px" height="107.12px" alt="car icon" />
          <h3>Meet your driver</h3>
          <p />
        </div>

        <div className={styled.howWorkContext}>
          <Image
            src="/images/locationHowWork.svg"
            width="107.12px"
            height="107.12px"
            alt="car icon"
          />
          <h3>Arrive location</h3>
        </div>
      </Container>
    </section>
  );
};

export default HowWork;
