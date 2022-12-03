import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "./Loading.module.css";

const Loading = () => {
  return (
    <div className={styled.loading}>
      <h4>We are searching you the best price...</h4>
      <Spinner className={styled.spinnerColor} animation="border" role="status" size="lg">
        <span className="visually-hidden">We are searching the best price for you</span>
      </Spinner>
    </div>
  );
};

export default Loading;
