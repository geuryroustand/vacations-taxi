/* eslint-disable no-unused-vars */
import React from "react";
import { useRouter } from "next/router";
// import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";

import styled from "./Awards.module.css";
// import FallBackLoading from "../Loading/FallBackLoading";
// import FallBackLoading from "../Loading/FallBackLoading";
import TripAdVisor from "./TripAdVisor";

// const DynamicTripAdVisor = dynamic(() => import("./TripAdVisor"), {
//   suspense: true
// });

const Awards = () => {
  const router = useRouter();

  const addCSS =
    router.asPath !== "/" ? `${styled.awards} ${styled.awardsWithBorder}` : `${styled.awards}`;

  return (
    <section className={addCSS}>
      <Container>
        <h1>hi</h1>
        {/* <TripAdVisor /> */}

        {/* <Suspense fallback={<FallBackLoading />}>
          <DynamicTripAdVisor />
        </Suspense> */}
      </Container>
    </section>
  );
};

export default Awards;
