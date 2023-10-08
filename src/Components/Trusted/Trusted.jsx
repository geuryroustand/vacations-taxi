import React from "react";
import Container from "react-bootstrap/Container";
// import { useTranslation } from "next-i18next";

import { Why } from "./Why";
import styled from "./Trusted.module.css";

const Trusted = ({ trusted }) => {
  return (
    <section className={styled.trusted}>
      <Container className={styled.content}>
        {trusted?.map((why) => (
          <Why key={why.id} {...why} />
        ))}
      </Container>
    </section>
  );
};

export default Trusted;
