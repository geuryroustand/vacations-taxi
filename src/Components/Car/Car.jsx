/* eslint-disable jsx-a11y/anchor-is-valid */

/* eslint-disable jsx-a11y/click-events-have-key-events */

/* eslint-disable jsx-a11y/no-static-element-interactions */

import React from "react";
import Image from "next/image";
import Link from "next/link";

import styled from "./Car.module.css";

const Car = ({
  totalPassengers,
  totalSuitCases,
  cartTypeImage,
  totalPrice,
  oneWayOrRoundTrip,
  cartSelected,
  id,
  selectedText
}) => {
  return (
    <div id={id} className={`${styled.car} `} onClick={cartSelected}>
      <div className={styled.list}>
        <Image src="/images/people.svg" width="20px" height="20px" alt="total of people" />
        <span>Up to {totalPassengers} passengers</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/suitcase.svg" width="20px" height="20px" alt="total of people" />
        <span>Up to {totalSuitCases} suitcases</span>
      </div>

      <Image
        src={`/images/${cartTypeImage}`}
        width="194.4px"
        height=" 93.73px"
        alt="standard card"
      />

      <div className={styled.list}>
        <Image src="/images/check.svg" width="20px" height="20px" alt="free Cancellation" />
        <span>FREE Cancellation</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/airplane.svg" width="20px" height="20px" alt="Flight tracking" />
        <span>Flight tracking</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/noHidden.svg" width="20px" height="20px" alt="No hidden costs" />
        <span>No hidden costs</span>
      </div>

      <div className={styled.list}>
        <Image
          src="/images/trusted.svg"
          width="20px"
          height="20px"
          alt="Tried and trusted drivers"
        />
        <span>Tried and trusted drivers</span>
      </div>

      <div className={styled.list}>
        <p>Total Price:</p>
        <h3>$ {totalPrice}</h3>
      </div>

      <div className={styled.list}>
        <p>/{oneWayOrRoundTrip}</p>
        <Link href="#">{selectedText}</Link>
      </div>
    </div>
  );
};

export default Car;
