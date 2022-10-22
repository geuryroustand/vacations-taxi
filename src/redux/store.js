import { configureStore } from "@reduxjs/toolkit";
import flightInfoReducer from "./flightInfoSlice";

export const store = configureStore({
  reducer: { flightInfoReducer }
});
