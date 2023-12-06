import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

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

// const store = configureStore({
//   reducer: reducers,
//   devTools: process.env.NODE_ENV !== "production",
//   middleware
// });
// const masterReducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state
//     };
//     return action.payload[reducerPath];
//   }
//   return reducers(state, action);
// };

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state
    };
    return {
      ...nextState, // Use nextState to merge the current state
      [fetchApiSlice.reducerPath]: action.payload[fetchApiSlice.reducerPath]
    };
  }
  return reducers(state, action);
};

export const makeStore = () =>
  configureStore({
    reducer: masterReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware
  });

export default createWrapper(makeStore, { debug: true });
