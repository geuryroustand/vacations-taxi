import React from "react";
import Spinner from "react-bootstrap/Spinner";

import styled from "./Loading.module.css";

const FallBackLoading = ({ isLoadingText, size, animation }) => {
  return (
    <div className={styled.fallBackLoading}>
      {!isLoadingText && <h4>Loading...</h4>}
      <Spinner
        className={styled.spinnerColor}
        animation={animation ?? "border"}
        role="status"
        size={size ?? "lg"}>
        <span className="visually-hidden">Loading</span>
      </Spinner>
    </div>
  );
};

export default FallBackLoading;
