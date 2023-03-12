import React from "react";
import Container from "react-bootstrap/Container";
import Image from "next/image";
import { useTranslation } from "next-i18next";

import styled from "./HowWork.module.css";

const HowWork = () => {
  const { t } = useTranslation("howWork");
  return (
    <section className={styled.howWork} id="how-we-work">
      <h2>{t("headingTitle")}</h2>
      <Container className={styled.howWorkContainer}>
        <div className={styled.howWorkContext}>
          <Image
            src="/images/car.svg"
            width="107.12px"
            height="107.12px"
            alt="AZS Samana Airport Transfers"
          />
          <h3>{t("paragraph1")}</h3>
          <p />
        </div>

        <div className={styled.howWorkContext}>
          <Image
            src="/images/locationHowWork.svg"
            width="107.12px"
            height="107.12px"
            alt="PUJ Punta Cana Airport Taxi Services"
          />
          <h3>{t("paragraph2")}</h3>
        </div>

        <div className={styled.howWorkContext}>
          <Image
            src="/images/driver.svg"
            width="107.12px"
            height="107.12px"
            alt="POP Puerto Plata Airport Transfers"
          />
          <h3>{t("paragraph3")}</h3>
          <p />
        </div>
      </Container>
    </section>
  );
};

export default HowWork;
