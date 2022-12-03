import React from "react";
import Spinner from "react-bootstrap/Spinner";

import styled from "./Loading.module.css";

const FallBackLoading = () => {
  return (
    <div className={styled.fallBackLoading}>
      <h4>Loading...</h4>
      <Spinner className={styled.spinnerColor} animation="border" role="status" size="lg">
        <span className="visually-hidden">Loading</span>
      </Spinner>
    </div>
  );
};

export default FallBackLoading;
