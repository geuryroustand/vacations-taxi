import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import flightInfoReducer from "./flightInfoSlice";
import { fetchApiSlice } from "./fetchApiSlice";

const reducers = combineReducers({
  flightInfoReducer,
  [fetchApiSlice.reducerPath]: fetchApiSlice.reducer
});

const middleware =
  process.env.NODE_ENV === "development"
    ? (getDefaultMiddleware) => [...getDefaultMiddleware(), logger, fetchApiSlice.middleware]
    : (getDefaultMiddleware) => getDefaultMiddleware();

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
  middleware
});

export default store;
