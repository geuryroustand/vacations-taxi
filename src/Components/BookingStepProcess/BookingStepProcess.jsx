import React from "react";
import styled from "./BookingStepProcess.module.css";
import Image from "next/image";
import { useRouter } from "next/router";

const BookingStepProcess = ({ process }) => {
  const { pathname } = useRouter();

  const stepTwo =
    pathname === "/passengerDetails" || pathname === "/paymentDetails" ? styled.process : "";

  const stepThree = pathname === "/paymentDetails" ? styled.process : "";

  return (
    <div className={styled.bookingStepProcess}>
      <p className={`${styled.step} ${styled.process}`}>1</p>
      <p>
        <Image src="/images/arrow.svg" width="100%" height="25px" alt="arrow" />
      </p>

      <p className={`${styled.step} ${stepTwo}  `}>2</p>
      <p>
        <Image src="/images/arrow.svg" width="100%" height="25px" alt="arrow" />
      </p>

      <p className={`${styled.step} ${stepThree} `}>3</p>
    </div>
  );
};

export default BookingStepProcess;