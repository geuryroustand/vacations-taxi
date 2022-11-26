import { configureStore } from "@reduxjs/toolkit";
import flightInfoReducer from "./flightInfoSlice";

const store = configureStore({
  reducer: { flightInfoReducer }
});

export default store;
