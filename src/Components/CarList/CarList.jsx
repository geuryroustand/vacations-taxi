import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalPrice } from "../../redux/flightInfoSlice";
import Car from "../Car/Car";
import styled from "./CarList.module.css";

const CarList = (props) => {
  const [cartClicked, setCartClicked] = useState(false);

  const dispatch = useDispatch();

  let queryId;
  let queryId2;
  let queryId3;
  let queryId4;

  const ref = useRef(queryId4);

  // dispatch(updateTotalPrice(+props?.priceTaxi1));

  const { priceTaxi1, priceTaxi2, priceTaxi3, priceTaxi4, roundtrip } = useSelector(
    (state) => state.flightInfoReducer.flightInfo
  );

  const oneWayOrRoundTrip = roundtrip ? "RoundTrip" : "One way";

  useEffect(() => {
    queryId = document?.getElementById("cart1");
    queryId.classList.add(styled.selected);
    queryId2 = document?.getElementById("cart2");
    queryId3 = document?.getElementById("cart3");
    queryId4 = document?.getElementById("cart4");
  }, []);

  const cartSelected = (e, price, selected) => {
    dispatch(updateTotalPrice(+price));

    let wrapperDiv = ref.current;

    const wrapperDidWidth = wrapperDiv.scrollWidth;

    let scrollToLeft = wrapperDiv.scrollLeft;

    if (e.currentTarget.id === "cart2") {
      queryId?.classList.remove(styled.selected);
      queryId3?.classList.remove(styled.selected);
      queryId4?.classList.remove(styled.selected);

      scrollToLeft += 100;

      if (scrollToLeft >= wrapperDidWidth) {
        scrollToLeft = wrapperDidWidth;
      }

      wrapperDiv.scrollLeft = scrollToLeft;

      e.currentTarget.classList.add(styled.selected);
    } else if (e.currentTarget.id === "cart3") {
      queryId?.classList.remove(styled.selected);
      queryId2?.classList.remove(styled.selected);
      queryId4?.classList.remove(styled.selected);

      e.currentTarget.classList.add(styled.selected);
    } else if (e.currentTarget.id === "cart4") {
      queryId?.classList.remove(styled.selected);
      queryId2?.classList.remove(styled.selected);
      queryId3?.classList.remove(styled.selected);

      e.currentTarget.classList.add(styled.selected);
    } else {
      queryId2?.classList.remove(styled.selected);
      queryId3?.classList.remove(styled.selected);
      queryId4?.classList.remove(styled.selected);

      queryId?.classList.add(styled.selected);

      scrollToLeft -= 100;
      if (scrollToLeft <= 0) {
        scrollToLeft = 0;
      }
      wrapperDiv.scrollLeft = scrollToLeft;
    }
  };

  return (
    <div className={styled.list} ref={ref}>
      <Car
        id="cart1"
        cartSelected={(e) => cartSelected(e, priceTaxi1, "Selected vehicle")}
        totalPassengers={4}
        totalSuitCases={4}
        cartTypeImage={"standard.webp"}
        totalPrice={priceTaxi1}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        cartClicked={cartClicked}
      />

      <Car
        id="cart2"
        cartSelected={(e) => cartSelected(e, priceTaxi2, "Selected vehicle")}
        totalPassengers={6}
        totalSuitCases={6}
        cartTypeImage={"minivan6.jpg"}
        totalPrice={priceTaxi2}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        cartClicked={cartClicked}
      />

      <Car
        id="cart3"
        cartSelected={(e) => cartSelected(e, priceTaxi3, "Selected vehicle")}
        totalPassengers={8}
        totalSuitCases={8}
        cartTypeImage={"minivan8.png"}
        totalPrice={priceTaxi3}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        cartClicked={cartClicked}
      />
      <Car
        id="cart4"
        cartSelected={(e) => cartSelected(e, priceTaxi4, "Selected vehicle")}
        totalPassengers={16}
        totalSuitCases={16}
        cartTypeImage={"minivan16.jpg"}
        totalPrice={priceTaxi4}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        cartClicked={cartClicked}
      />
    </div>
  );
};

export default CarList;
