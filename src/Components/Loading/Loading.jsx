import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styled from "./Loading.module.css";

const Loading = ({ spinnerTitle, accessibilityTitle }) => {
  return (
    <div className={styled.loading}>
      <h4>{spinnerTitle}</h4>
      <Spinner className={styled.spinnerColor} animation="border" role="status" size="lg">
        <span className="visually-hidden">{accessibilityTitle}</span>
      </Spinner>
    </div>
  );
};

export default Loading;
