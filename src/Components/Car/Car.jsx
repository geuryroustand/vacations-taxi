import Image from "next/image";
import styled from "./Car.module.css";

const Car = ({
  totalPassengers,
  totalSuitCases,
  cartTypeImage,
  originalPrice,
  discountPrice,
  oneWayOrRoundTrip,
  cartSelected,
  id,
  selectedText,
  selectedTaxiClassName,
  selectedTextClassName,
  cards
}) => {
  const addClass = selectedTaxiClassName
    ? ` ${styled.car} ${selectedTaxiClassName}`
    : `${styled.car}`;

  const addClassText = selectedTextClassName
    ? `${styled.selectedText} ${styled.selectedTextClass}`
    : `${styled.selectedText}`;

  const {
    passenger = "",
    suitcase = "",
    upTo = "",
    cancellation = "",
    flight = "",
    noHidden = "",
    regularPrice,
    discountedPrice,
    trusted = ""
  } = cards || {};

  return (
    <button type="button" id={id} className={addClass} onClick={cartSelected}>
      <div className={styled.list}>
        <Image src="/images/people.svg" width={26} height={26} alt="total of people" />
        <span>
          {upTo} {totalPassengers} {passenger}
        </span>
      </div>

      <div className={styled.list}>
        <Image src="/images/suitcase.svg" width={26} height={26} alt="total of people" />
        <span>
          {upTo} {totalSuitCases} {suitcase}
        </span>
      </div>

      <Image src={`/images/${cartTypeImage}`} width={194} height={94} alt="standard card" />

      <div className={styled.list}>
        <Image src="/images/check.svg" width={26} height={26} alt={cancellation} />
        <span>{cancellation}</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/airplane.svg" width={26} height={26} alt={flight} />
        <span>{flight}</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/noHidden.svg" width={26} height={26} alt={noHidden} />
        <span>{noHidden}</span>
      </div>

      <div className={styled.list}>
        <Image src="/images/trusted.svg" width={26} height={26} alt={trusted} />
        <span>{trusted} </span>
      </div>
      <div>
        {originalPrice && (
          <div className={styled.list}>
            <p>{regularPrice}</p>
            <h3 className={styled.originalPrice}>$ {originalPrice}</h3>
          </div>
        )}
        {discountPrice && (
          <div className={styled.list}>
            <p>{discountedPrice}</p>
            <h3>$ {discountPrice}</h3>
          </div>
        )}
      </div>

      <div className={styled.list}>
        <p>/{oneWayOrRoundTrip}</p>
        <p className={addClassText}>{selectedText}</p>
      </div>
    </button>
  );
};

export default Car;
