import { createSlice } from "@reduxjs/toolkit";

const initialState = { totalPrice: null };

const flightInfoSlice = createSlice({
  name: "flightInfo",
  initialState,
  reducers: {
    updateFlightInfo(state, action) {
      state.totalPrice = action.payload;
    }
  }
});

export const { updateFlightInfo } = flightInfoSlice.actions;

export default flightInfoSlice.reducer;
