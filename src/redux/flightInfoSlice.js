/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalPrice: undefined, cartSelectedText: undefined, flightInfo: undefined };

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
    }
  }
});

export const { updateTotalPrice, allFlightInfo } = flightInfoSlice.actions;

export default flightInfoSlice.reducer;
