import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { useTranslation } from "next-i18next";

import { Why } from "./Why";
import styled from "./Trusted.module.css";

const Trusted = ({ altAirPlane, altCreditCart, altPayment }) => {
  const { t } = useTranslation("home");

  const [whyInfo] = useState([
    {
      svgName: "airplane.svg",
      alt: altAirPlane,
      width: "32px",
      height: "32px",
      title: t("trustedTitle1"),
      paragraph: t("trustedParagraph1"),
      className: "first"
    },

    {
      svgName: "credit-card.svg",
      alt: altCreditCart,
      width: "32px",
      height: "32px",
      title: t("trustedTitle2"),
      paragraph: t("trustedParagraph2"),
      className: "second"
    },
    {
      svgName: "payment.svg",
      alt: altPayment,
      width: "32px",
      height: "32px",
      title: t("trustedTitle3"),
      paragraph: t("trustedParagraph3"),
      className: "third"
    }
  ]);
  return (
    <section className={styled.trusted}>
      <Container className={styled.content}>
        {whyInfo.map((why) => (
          <Why key={why.title} {...why} />
        ))}

        {/* <Why
          svgName="airplane.svg"
          alt={altAirPlane ?? "Airplane"}
          width="32"
          height="32"
          title="Flight Tracking"
          paragraph="Your driver tracks your flight and waits for you if its delayed"
          className="first"
        />
        <Why
          svgName="credit-card.svg"
          alt={altCreditCart ?? "credit card"}
          width="32"
          height="32"
          title="One Clear Price"
          paragraph="Your price is confirmed upfront – no extra costs, no cash required"
          className="second"
        />
        <Why
          svgName="payment.svg"
          alt={altPayment ?? "Payment"}
          width="32"
          height="32"
          title="Tried & Trusted"
          paragraph="We work with professional drivers and have 24/7 customer care"
          className="third"
        /> */}
      </Container>
    </section>
  );
};

export default Trusted;
