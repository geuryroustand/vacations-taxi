import React from "react";
import Image from "next/image";
import styled from "./Car.module.css";
import Link from "next/link";

const Car = () => {
  return (
    <div className={styled.car}>
      <div className={styled.list}>
        <Image src="/images/people.svg" width="20px" height="20px" alt="total of people" />
        <span>Up to 4 passengers</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/suitcase.svg" width="20px" height="20px" alt="total of people" />
        <span>Up to 4 suitcases</span>
      </div>

      <Image src="/images/standard.webp" width="194.4px" height=" 93.73px" alt="standard card" />

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
        <h3>$ 260</h3>
      </div>

      <div className={styled.list}>
        <p>/One way</p>
        <Link href="#">Select this vehicle</Link>
      </div>
    </div>
  );
};

export default Car;
