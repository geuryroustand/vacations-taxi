import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import styled from "./Header.module.css";
import SearchForm from "../SearchForm/SearchForm";

const Header = ({ heading1, heading2 }) => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <header className={styled.hero}>
      <Container>
        <h1 className={styled["main-heading"]}>{heading1}</h1>

        <h2 className={styled["sub-heading"]}>{heading2}</h2>

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
