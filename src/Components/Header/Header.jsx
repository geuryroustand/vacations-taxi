import React, { useState } from "react";

import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import styled from "./Header.module.css";

// import SearchForm from "../SearchForm/SearchForm";

import FallBackLoading from "../Loading/FallBackLoading";

const DynamicSearchForm = dynamic(() => import("../SearchForm/SearchForm"), {
  loading: () => <FallBackLoading />
});
const Header = ({ heading1, heading1Paragraph }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div className={styled.hero}>
      <Container>
        {heading1 && heading1Paragraph !== "" && (
          <article>
            <h1 className={styled.heading1}>{heading1}</h1>
            <p className={styled.heading1Paragraph}>{heading1Paragraph} </p>
          </article>
        )}

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

        <DynamicSearchForm isClicked={isClicked} />
      </Container>
    </div>
  );
};

export default Header;
