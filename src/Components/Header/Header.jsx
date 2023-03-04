import React, { useState, Suspense } from "react";

import dynamic from "next/dynamic";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useTranslation } from "next-i18next";

import styled from "./Header.module.css";

import SearchForm from "../SearchForm/SearchForm";

import FallBackLoading from "../Loading/FallBackLoading";

const DynamicHeading = dynamic(() => import("../Heading/Heading"), {
  suspense: true
});

const Header = ({ heading1, heading2 }) => {
  const [isClicked, setIsClicked] = useState(false);
  const { t } = useTranslation("home");

  return (
    <header className={styled.hero}>
      <Container>
        <Suspense fallback={<FallBackLoading />}>
          <DynamicHeading style={styled["main-heading"]} headingText={heading1} />
        </Suspense>

        <h2 className={styled["sub-heading"]}>{heading2}</h2>

        <Button
          onClick={() => setIsClicked(false)}
          className={isClicked ? styled["btn-selected"] : styled["btn-oneWay"]}>
          {t("oneWay")}
        </Button>
        <Button
          onClick={() => setIsClicked(true)}
          className={isClicked ? styled["btn-oneWay"] : styled["btn-selected"]}>
          {t("return")}
        </Button>

        <SearchForm isClicked={isClicked} />
      </Container>
    </header>
  );
};

export default Header;
