import React from "react";
import Image from "next/image";
import styled from "./How.module.css";

const How = ({ svgName, width, height, alt }) => {
  return (
    <div className={styled.how}>
      <Image src={`/images/${svgName}.svg`} width={width} height={height} alt={alt} />
    </div>
  );
};

export default How;
