import React from "react";
import Button from "react-bootstrap/Button";
import styled from "./CustomButton.module.css";

const CustomButton = ({ buttonType, buttonText }) => {
  return (
    <Button className={styled.btn} type={buttonType}>
      {buttonText}
    </Button>
  );
};

export default CustomButton;
