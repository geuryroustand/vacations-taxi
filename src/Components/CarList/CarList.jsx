import React from "react";
import Car from "../Car/Car";
import styled from "./CarList.module.css";
const CarList = () => {
  return (
    <div className={styled.list}>
      <Car />
      <Car />
    </div>
  );
};

export default CarList;
