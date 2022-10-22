import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const flightInfoSlice = createSlice({
  name: "flightInfo",
  initialState,
  reducers: {
    updateFlightInfo(state, action) {
      // state.pickUpDate = action.payload.pickUpDate;
      // state.pickUpDate = action.payload.pickUpTime;
      // state.dropOffDate = action.payload.dropOffDate;
      // state.dropOffTime = action.payload.dropOffTime;
      state.push(action.payload);
      // state.push(action.payload);
    }
  }
});

export const { updateFlightInfo } = flightInfoSlice.actions;

export default flightInfoSlice.reducer;
