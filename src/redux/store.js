import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import flightInfoReducer from "./flightInfoSlice";

const reducers = combineReducers({
  flightInfoReducer
});

const middleware =
  process.env.NODE_ENV === "development"
    ? (getDefaultMiddleware) => [...getDefaultMiddleware(), logger]
    : (getDefaultMiddleware) => getDefaultMiddleware();

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware
});

export default store;
