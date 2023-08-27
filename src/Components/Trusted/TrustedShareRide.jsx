import React from "react";

import { BsClockHistory, BsShieldCheck } from "react-icons/bs";
import { FiDollarSign } from "react-icons/fi";
import { LuSofa } from "react-icons/lu";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import styled from "./TrustedShareRide.module.css";

const TrustedShareRide = () => {
  const featureItems = [
    {
      rounderColor: styled.first,
      icon: <FiDollarSign className={styled.icons} />,
      title: "Cost-effective",
      description:
        "By sharing the ride with fellow travelers headed in the same direction, you split the cost, making it an economical choice."
    },
    {
      rounderColor: styled.second,
      icon: <BsClockHistory className={styled.icons} />,
      title: "Convenience",
      description:
        "Our intuitive search feature allows you to quickly find available shared rides that align with your flight schedule and destination."
    },
    {
      rounderColor: styled.third,
      icon: <LuSofa className={styled.icons} />,
      title: "Comfort",
      description:
        "Travel in comfortable vehicles, equipped with modern amenities, and enjoy a smooth journey."
    },
    {
      rounderColor: styled.fourth,
      icon: <BsShieldCheck className={styled.icons} />,
      title: "Reliability",
      description:
        "We partner with experienced drivers who prioritize punctuality and ensure you arrive at your destination on time."
    }
  ];

  return (
    <section className={styled.main}>
      <h2 className={styled.heading}>Why choose shared airport transfers?</h2>
      <Container>
        <Row>
          {featureItems.map((item) => (
            <Col key={Math.random()} xs={12} sm={6} lg={3}>
              <div className={`${item.rounderColor} ${styled.rounderIcons}`}>{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TrustedShareRide;
