/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
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
const Header = ({ desc, showReturnSearchForm }) => {
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const { locale, query } = useRouter();
  const queryKey = `fetchCommonContent("${locale}")`;

  const { oneWayAndRoundTrip, bookingSearch } = useSelector(
    (state) => state?.contentApiSlice?.queries[queryKey]?.data?.data?.attributes || {}
  );

  const { oneWay = "", return: roundTrip = "" } = oneWayAndRoundTrip || {};

  const heading1 = ({ children }) => <h1 className={styled.heading1}>{children}</h1>;

  const heading1Paragraph = ({ children }) => (
    <p className={styled.heading1Paragraph}>{children}</p>
  );

  useEffect(() => {
    if (query.roundtrip) {
      setIsRoundTrip(true);
    }
  }, []);

  return (
    <div className={styled.hero}>
      <Container>
        <Markdown components={{ h1: heading1, p: heading1Paragraph }}>{desc}</Markdown>

        <div>
          <Button
            onClick={() => setIsRoundTrip(false)}
            className={isRoundTrip ? styled["btn-selected"] : styled["btn-oneWay"]}>
            {oneWay}
          </Button>
          <Button
            onClick={() => setIsRoundTrip(true)}
            className={isRoundTrip ? styled["btn-oneWay"] : styled["btn-selected"]}>
            {roundTrip}
          </Button>
        </div>

        <DynamicSearchForm
          bookingSearch={bookingSearch}
          isRoundTrip={isRoundTrip}
          showReturnSearchForm={showReturnSearchForm}
        />
      </Container>
    </div>
  );
};

export default Header;
