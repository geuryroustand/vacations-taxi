import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalPrice: null, flightInfo: null };

const flightInfoSlice = createSlice({
  name: "flightInfo",
  initialState,
  reducers: {
    updateTotalPrice(state, action) {
      state.totalPrice = action.payload;
    },
    allFlightInfo(state, action) {
      state.flightInfo = action.payload;
    }
  }
});

export const { updateTotalPrice, allFlightInfo } = flightInfoSlice.actions;

export default flightInfoSlice.reducer;
