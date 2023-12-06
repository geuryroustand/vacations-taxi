import React, { useState } from "react";
import { useSelector } from "react-redux";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import Markdown from "react-markdown";

import styled from "./Header.module.css";

import FallBackLoading from "../Loading/FallBackLoading";

const DynamicSearchForm = dynamic(() => import("../SearchForm/SearchForm"), {
  loading: () => <FallBackLoading />
});
const Header = ({ desc }) => {
  const [isClicked, setIsClicked] = useState(false);

  const { locale } = useRouter();
  const queryKey = `getTranslation("${locale}")`;

  const { oneWayAndRoundTrip, bookingSearch } = useSelector(
    (state) => state?.fetchApi?.queries[queryKey]?.data?.data?.attributes || {}
  );

  const { oneWay = "", return: roundTrip = "" } = oneWayAndRoundTrip || {};

  const heading1 = ({ children }) => <h1 className={styled.heading1}>{children}</h1>;

  const heading1Paragraph = ({ children }) => (
    <p className={styled.heading1Paragraph}>{children}</p>
  );

  return (
    <div className={styled.hero}>
      <Container>
        <Markdown components={{ h1: heading1, p: heading1Paragraph }}>{desc}</Markdown>

        <Button
          onClick={() => setIsClicked(false)}
          className={isClicked ? styled["btn-selected"] : styled["btn-oneWay"]}>
          {oneWay}
        </Button>
        <Button
          onClick={() => setIsClicked(true)}
          className={isClicked ? styled["btn-oneWay"] : styled["btn-selected"]}>
          {roundTrip}
        </Button>

        <DynamicSearchForm bookingSearch={bookingSearch} isClicked={isClicked} />
      </Container>
    </div>
  );
};

export default Header;
