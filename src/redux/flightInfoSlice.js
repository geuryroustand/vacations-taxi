/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  totalPrice: undefined,
  cartSelectedText: undefined,
  flightInfo: undefined,
  bookingInfo: undefined,
  paymentMethod: undefined,
  agreedTermsAndConditions: undefined
};

const flightInfoSlice = createSlice({
  name: "flightInfo",
  initialState,
  reducers: {
    updateTotalPrice(state, action) {
      state.totalPrice = action.payload.totalPrice;
      state.cartSelectedText = action.payload.cartSelectedText;
    },
    allFlightInfo(state, action) {
      state.flightInfo = action.payload;
    },
    bookingInfo(state, action) {
      const totalPrice = state.totalPrice || state.flightInfo.priceTaxi1;

      const existingInfo = {
        ...state.bookingInfo,
        ...state.flightInfo,
        ...action.payload,
        totalPrice
      };

      delete existingInfo.priceTaxi1;
      delete existingInfo.priceTaxi2;
      delete existingInfo.priceTaxi3;
      delete existingInfo.priceTaxi4;

      state.bookingInfo = existingInfo;
    }
  }
});

export const { updateTotalPrice, allFlightInfo, bookingInfo } = flightInfoSlice.actions;

export default flightInfoSlice.reducer;
