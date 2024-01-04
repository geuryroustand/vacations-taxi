// memoizedFlightDetailsSelectors.js
import { createSelector } from "@reduxjs/toolkit";

const flightInfoSelector = (state) => state.flightInfoReducer.flightInfo || {};

const flightDetailsSelector = createSelector(flightInfoSelector, (flightInfo) => ({
  pickUpMemoized: flightInfo.pickUp || "",
  dropOffMemoized: flightInfo.dropOff || "",
  pickUpTimeMemoized: flightInfo.pickUpTime || "",
  pickUpDateMemoized: flightInfo.pickUpDate || "",
  pickUpIDMemoized: flightInfo.pickUpID || "",
  dropOffIDMemoized: flightInfo.dropOffID || "",
  pickUpPassengerMemoized: flightInfo.pickUpPassenger || "",
  allFlightInfoMemoized: flightInfo || ""
}));

export default flightDetailsSelector;
