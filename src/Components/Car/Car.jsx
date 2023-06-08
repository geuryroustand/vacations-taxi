import React from "react";
import Image from "next/image";
import styled from "./Car.module.css";

const Car = ({
  totalPassengers,
  totalSuitCases,
  cartTypeImage,
  totalPrice,
  oneWayOrRoundTrip,
  cartSelected,
  id,
  selectedText,
  selectedTaxiClassName,
  selectedTextClassName
}) => {
  const addClass = selectedTaxiClassName
    ? ` ${styled.car} ${selectedTaxiClassName}`
    : `${styled.car}`;

  const addClassText = selectedTextClassName
    ? `${styled.selectedText} ${styled.selectedTextClass}`
    : `${styled.selectedText}`;

  return (
    <button type="button" id={id} className={addClass} onClick={cartSelected}>
      <div className={styled.list}>
        <Image src="/images/people.svg" width="20" height="20" alt="total of people" />
        <span>Up to {totalPassengers} passengers</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/suitcase.svg" width="20" height="20" alt="total of people" />
        <span>Up to {totalSuitCases} suitcases</span>
      </div>

      <Image src={`/images/${cartTypeImage}`} width="194.4" height="93.73" alt="standard card" />

      <div className={styled.list}>
        <Image src="/images/check.svg" width="20" height="20" alt="free Cancellation" />
        <span>FREE Cancellation</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/airplane.svg" width="20" height="20" alt="Flight tracking" />
        <span>Flight tracking</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/noHidden.svg" width="20" height="20" alt="No hidden costs" />
        <span>No hidden costs</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/trusted.svg" width="20" height="20" alt="Tried and trusted drivers" />
        <span>Tried and trusted drivers</span>
      </div>

      <div className={styled.list}>
        <p>Total Price:</p>
        <h3>$ {totalPrice}</h3>
      </div>

      <div className={styled.list}>
        <p>/{oneWayOrRoundTrip}</p>
        <p className={addClassText}>{selectedText}</p>
      </div>
    </button>
  );
};

export default Car;
