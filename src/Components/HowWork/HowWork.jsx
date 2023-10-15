import React from "react";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import styled from "./HowWork.module.css";

const HowWork = ({ howItWorkHeading, howItWork }) => {
  return (
    <section className={styled.howWork} id="how-we-work">
      <h2>{howItWorkHeading}</h2>
      <Container className={styled.howWorkContainer}>
        {howItWork.map((info) => (
          <div key={info.id} className={styled.howWorkContext}>
            <Image src={`/images/${info.iconName}`} width="107" height="107" alt={info.iconAlt} />
            <h3>{info.heading}</h3>
            <p />
          </div>
        ))}
      </Container>
    </section>
  );
};

export default HowWork;
