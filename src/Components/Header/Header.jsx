import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import styled from "./Header.module.css";
import SearchForm from "../SearchForm/SearchForm";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <header className={styled.hero}>
      <Container>
        <h1 className={styled["main-heading"]}>Reliable, low cost airport transfers</h1>
        <h2 className={styled["sub-heading"]}>
          Easy airport transfers to and from your accommodation
        </h2>

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
