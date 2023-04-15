import React from "react";
import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";

import styled from "./Awards.module.css";
import FallBackLoading from "../Loading/FallBackLoading";

const DynamicTripAdVisor = dynamic(() => import("./TripAdVisor"), {
  loading: () => <FallBackLoading />
});

const Awards = () => {
  return (
    <section className={styled.awards}>
      <Container>
        <DynamicTripAdVisor />
      </Container>
    </section>
  );
};

export default Awards;
