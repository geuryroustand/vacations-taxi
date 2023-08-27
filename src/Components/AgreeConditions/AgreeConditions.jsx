import React from "react";
import styled from "./AgreeConditions.module.css";

const AgreeConditions = ({ children }) => {
  return <div className={styled.main}>{children}</div>;
};

export default AgreeConditions;
