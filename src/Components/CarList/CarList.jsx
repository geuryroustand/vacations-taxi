import React, { useEffect, useRef, useState, Suspense } from "react";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

import { updateTotalPrice } from "../../redux/flightInfoSlice";
import FallBackLoading from "../Loading/FallBackLoading";
import styled from "./CarList.module.css";

const DynamicCar = dynamic(() => import("../Car/Car"), {
  suspense: true
});

const CarList = () => {
  const dispatch = useDispatch();

  const { priceTaxi1, priceTaxi2, priceTaxi3, priceTaxi4, roundtrip } =
    useSelector((state) => state?.flightInfoReducer?.flightInfo) || {};

  const [taxiSelected, setTaxiSelected] = useState(0);

  const [cartList, setCartList] = useState([
    {
      id: "cart1",
      price: priceTaxi1,
      passengers: 4,
      suitcases: 4,
      image: "standard.webp",
      selectedText: "Selected vehicle"
    },
    {
      id: "cart2",
      price: priceTaxi2,
      passengers: 6,
      suitcases: 6,
      image: "minivan6.jpg",
      selectedText: "Select this vehicle"
    },
    {
      id: "cart3",
      price: priceTaxi3,
      passengers: 8,
      suitcases: 8,
      image: "minivan8.png",
      selectedText: "Select this vehicle"
    },
    {
      id: "cart4",
      price: priceTaxi4,
      passengers: 16,
      suitcases: 16,
      image: "minivan16.jpg",
      selectedText: "Select this vehicle"
    }
  ]);

  useEffect(() => {
    setCartList([
      {
        id: "cart1",
        price: priceTaxi1,
        passengers: 4,
        suitcases: 4,
        image: "standard.webp",
        selectedText: "Selected vehicle"
      },
      {
        id: "cart2",
        price: priceTaxi2,
        passengers: 6,
        suitcases: 6,
        image: "minivan6.jpg",
        selectedText: "Select this vehicle"
      },
      {
        id: "cart3",
        price: priceTaxi3,
        passengers: 8,
        suitcases: 8,
        image: "minivan8.png",
        selectedText: "Select this vehicle"
      },
      {
        id: "cart4",
        price: priceTaxi4,
        passengers: 16,
        suitcases: 16,
        image: "minivan16.jpg",
        selectedText: "Select this vehicle"
      }
    ]);
  }, [priceTaxi1, priceTaxi2, priceTaxi3, priceTaxi4]);

  const wrapperReference = useRef(null);

  // dispatch(updateTotalPrice({ totalPrice: priceTaxi1 }));
  const cartSelected = (index, price) => {
    dispatch(updateTotalPrice({ totalPrice: price }));
    setTaxiSelected(index);
  };

  const handleCartNavigation = (direction) => {
    const wrapperDiv = wrapperReference.current;
    const cartWidth = 100;
    let scrollAmount = 0;
    if (direction === "left") {
      scrollAmount = -cartWidth;
    } else if (direction === "right") {
      scrollAmount = cartWidth;
    }
    wrapperDiv.scrollBy({ left: scrollAmount, top: 0, behavior: "smooth" });
  };

  return (
    <div className={styled.navContainer}>
      <button
        title="click to check car option to the left"
        type="button"
        className={styled.navButton}
        onClick={() => handleCartNavigation("left")}>
        <AiOutlineLeft />
      </button>

      <div className={styled.cartWrapper} ref={wrapperReference}>
        {cartList.map((cart, index) => (
          <Suspense key={cart.id} fallback={<FallBackLoading />}>
            <DynamicCar
              id={cart.id}
              cartSelected={() => cartSelected(index, cart.price)}
              totalPassengers={cart.passengers}
              totalSuitCases={cart.suitcases}
              cartTypeImage={cart.image}
              totalPrice={cart.price}
              oneWayOrRoundTrip={roundtrip ? "RoundTrip" : "One way"}
              selectedText={index === taxiSelected ? "Selected vehicle" : "Select this vehicle"}
              selectedTextClassName={index === taxiSelected ?? taxiSelected}
              selectedTaxiClassName={index === taxiSelected ? "selectedCart" : ""}
            />
          </Suspense>
        ))}
      </div>

      <button
        type="button"
        title="click to check car option to the right"
        className={styled.navButton}
        onClick={() => handleCartNavigation("right")}>
        <AiOutlineRight />
      </button>
    </div>
  );
};

export default CarList;
