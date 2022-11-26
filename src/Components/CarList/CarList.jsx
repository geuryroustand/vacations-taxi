import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTotalPrice } from "../../redux/flightInfoSlice";
import Car from "../Car/Car";
import styled from "./CarList.module.css";

const CarList = () => {
  const dispatch = useDispatch();

  let queryId;
  let queryId2;
  let queryId3;
  let queryId4;

  const reference = useRef(queryId4);

  const { priceTaxi1, priceTaxi2, priceTaxi3, priceTaxi4, roundtrip } = useSelector(
    (state) => state.flightInfoReducer.flightInfo
  );

  const oneWayOrRoundTrip = roundtrip ? "RoundTrip" : "One way";

  useEffect(() => {
    queryId = document?.getElementById("cart1");
    queryId.classList.add("selectedCart");
    queryId2 = document?.getElementById("cart2");
    queryId3 = document?.getElementById("cart3");
    queryId4 = document?.getElementById("cart4");
  }, []);

  const cartSelected = (event, price, selected) => {
    dispatch(updateTotalPrice({ totalPrice: +price, cartSelectedText: selected }));

    const wrapperDiv = reference.current;

    const wrapperDidWidth = wrapperDiv.scrollWidth;

    let scrollToLeft = wrapperDiv.scrollLeft;

    switch (event.currentTarget.id) {
      case "cart2": {
        queryId?.classList.remove("selectedCart");
        queryId3?.classList.remove("selectedCart");
        queryId4?.classList.remove("selectedCart");

        scrollToLeft += 100;

        if (scrollToLeft >= wrapperDidWidth) {
          scrollToLeft = wrapperDidWidth;
        }

        wrapperDiv.scrollLeft = scrollToLeft;

        event.currentTarget.classList.add("selectedCart");

        // queryId?.removeAttribute("selectedCart");
        // queryId3?.removeAttribute("selectedCart");
        // queryId4?.removeAttribute("selectedCart");
        // event.currentTarget.setAttribute("id", "selectedCart");

        break;
      }
      case "cart3": {
        queryId?.classList.remove("selectedCart");
        queryId2?.classList.remove("selectedCart");
        queryId4?.classList.remove("selectedCart");

        event.currentTarget.classList.add("selectedCart");

        // queryId?.removeAttribute("selectedCart");
        // queryId2?.removeAttribute("selectedCart");
        // queryId4?.removeAttribute("selectedCart");
        // event.currentTarget.setAttribute("id", "selectedCart");

        break;
      }
      case "cart4": {
        queryId?.classList.remove("selectedCart");
        queryId2?.classList.remove("selectedCart");
        queryId3?.classList.remove("selectedCart");

        event.currentTarget.classList.add("selectedCart");

        // queryId?.removeAttribute("selectedCart");
        // queryId2?.removeAttribute("selectedCart");
        // queryId3?.removeAttribute("selectedCart");

        // event.currentTarget.setAttribute("id", "selectedCart");

        break;
      }
      default: {
        queryId2?.classList.remove("selectedCart");
        queryId3?.classList.remove("selectedCart");
        queryId4?.classList.remove("selectedCart");

        queryId?.classList.add("selectedCart");

        scrollToLeft -= 100;
        if (scrollToLeft <= 0) {
          scrollToLeft = 0;
        }
        wrapperDiv.scrollLeft = scrollToLeft;

        // setCartSelectedText(selected);

        // queryId2?.removeAttribute("selectedCart");
        // queryId3?.removeAttribute("selectedCart");
        // queryId4?.removeAttribute("selectedCart");

        // event.currentTarget.setAttribute("id", "selectedCart");
      }
    }
  };

  return (
    <div className={styled.list} ref={reference}>
      <Car
        id="cart1"
        cartSelected={(event) => cartSelected(event, priceTaxi1, "Selected vehicle")}
        totalPassengers={4}
        totalSuitCases={4}
        cartTypeImage="standard.webp"
        totalPrice={priceTaxi1}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        selectedText="Selected vehicle"
      />

      <Car
        id="cart2"
        cartSelected={(event) => cartSelected(event, priceTaxi2, "Selected vehicle")}
        totalPassengers={6}
        totalSuitCases={6}
        cartTypeImage="minivan6.jpg"
        totalPrice={priceTaxi2}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        selectedText="Selected vehicle"
      />

      <Car
        id="cart3"
        cartSelected={(event) => cartSelected(event, priceTaxi3, "Selected vehicle")}
        totalPassengers={8}
        totalSuitCases={8}
        cartTypeImage="minivan8.png"
        totalPrice={priceTaxi3}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        selectedText="Select this vehicle"
      />
      <Car
        id="cart4"
        cartSelected={(event) => cartSelected(event, priceTaxi4)}
        totalPassengers={16}
        totalSuitCases={16}
        cartTypeImage="minivan16.jpg"
        totalPrice={priceTaxi4}
        oneWayOrRoundTrip={oneWayOrRoundTrip}
        selectedText="Select this vehicle"
      />
    </div>
  );
};

export default CarList;
