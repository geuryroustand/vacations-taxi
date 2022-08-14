import React from "react";
import TripAdVisor from "./TripAdVisor";
import Container from "react-bootstrap/Container";
import styled from "./Awards.module.css";

const Awards = () => {
  return (
    <section className={styled.awards}>
      <Container>
        <h2> Awards</h2>
        <TripAdVisor />
      </Container>
    </section>
  );
};

export default Awards;
