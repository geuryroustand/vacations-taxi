import React from "react";
// import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";
import { useTranslation } from "next-i18next";
import styled from "./Awards.module.css";
// import FallBackLoading from "../Loading/FallBackLoading";
import TripAdVisor from "./TripAdVisor";

// const DynamicTripAdVisor = dynamic(() => import("./TripAdVisor"), {
//   suspense: true
// });

const Awards = () => {
  const { t } = useTranslation("home");
  return (
    <section className={styled.awards}>
      <Container>
        <h2>{t("awards")}</h2>
        <TripAdVisor />
        {/* <Suspense fallback={<FallBackLoading />}> */}
        {/* <DynamicTripAdVisor /> */}
        {/* </Suspense> */}
      </Container>
    </section>
  );
};

export default Awards;
