import React, { useState } from "react";
import styled from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import SearchForm from "../SearchForm/SearchForm";

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);

  const onClick = () => {
    setIsClicked(!isClicked);
  };

  return (
    <header className={styled.hero}>
      <Container>
        <h1 className={styled["main-heading"]}>Reliable, low cost airport transfers</h1>
        <h2 className={styled["sub-heading"]}>
          Easy airport transfers to and from your accommodation
        </h2>

        <Button
          onClick={onClick}
          className={isClicked ? styled["btn-selected"] : styled["btn-oneWay"]}>
          One-way
        </Button>
        <Button
          onClick={onClick}
          className={isClicked ? styled["btn-oneWay"] : styled["btn-selected"]}>
          Return
        </Button>

        <SearchForm isClicked={isClicked} />
      </Container>
    </header>
  );
};

export default Header;
