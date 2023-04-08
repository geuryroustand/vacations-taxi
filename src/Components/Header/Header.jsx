/* eslint-disable no-unused-vars */
import React, { useState, Suspense } from "react";

import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import styled from "./Header.module.css";

import SearchForm from "../SearchForm/SearchForm";

import FallBackLoading from "../Loading/FallBackLoading";

const DynamicHeading = dynamic(() => import("../Heading/Heading"), {
  suspense: true
});

const Header = ({ heading1, heading1Paragraph }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <header className={styled.hero}>
      <Container>
        <article>
          <h1>hi</h1>
          {/* <Suspense fallback={<FallBackLoading />}>
            <DynamicHeading style={styled.heading1} headingText={heading1} />
          </Suspense> */}
          <p className={styled.heading1Paragraph}>{heading1Paragraph} </p>
        </article>
        <Button
          onClick={() => setIsClicked(false)}
          className={isClicked ? styled["btn-selected"] : styled["btn-oneWay"]}>
          One-way
        </Button>
        <Button
          onClick={() => setIsClicked(true)}
          className={isClicked ? styled["btn-oneWay"] : styled["btn-selected"]}>
          Return
        </Button>

        <SearchForm isClicked={isClicked} />
      </Container>
    </header>
  );
};

export default Header;
