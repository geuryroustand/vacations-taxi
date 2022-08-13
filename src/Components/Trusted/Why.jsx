import React from "react";
import Image from "next/image";
import styled from "./Why.module.css";

export const Why = ({ svgName, alt, width, height, title, paragraph, className }) => {
  const pickClass = `${styled.svg} ${styled[`${className}`]}`;
  return (
    <div className={styled.why}>
      <div className={pickClass}>
        <Image
          src={`/images/${svgName}`}
          alt={`${alt}`}
          width={`${width}`}
          height={`${height}`}
          title="Flight tracking"
          className="first "
        />
      </div>
      <div className={styled.content}>
        <h2>{title}</h2>
        <p>{paragraph}</p>
      </div>
    </div>
  );
};
