import React from "react";
import styled from "./Header.module.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import SearchForm from "../SearchForm/SearchForm";

const Header = () => {
  return (
    <header className={styled.hero}>
      <Container>
        <h1 className={styled["main-heading"]}>Reliable, low cost airport transfers</h1>
        <h2 className={styled["sub-heading"]}>
          Easy airport transfers to and from your accommodation
        </h2>

        <Button className={styled["oneWay-btn"]}>One-way</Button>
        <Button className={styled["return-btn"]}>Return</Button>

        <SearchForm />
      </Container>
    </header>
  );
};

export default Header;
