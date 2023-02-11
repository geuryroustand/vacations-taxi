import React from "react";
// import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";

import styled from "./Awards.module.css";
// import FallBackLoading from "../Loading/FallBackLoading";
import TripAdVisor from "./TripAdVisor";

// const DynamicTripAdVisor = dynamic(() => import("./TripAdVisor"), {
//   suspense: true
// });

const Awards = () => {
  return (
    <section className={styled.awards}>
      <Container>
        <h2> Awards</h2>
        <TripAdVisor />
        {/* <Suspense fallback={<FallBackLoading />}> */}
        {/* <DynamicTripAdVisor /> */}
        {/* </Suspense> */}
      </Container>
    </section>
  );
};

export default Awards;
