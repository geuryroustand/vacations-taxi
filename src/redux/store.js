import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";
import { HYDRATE, createWrapper } from "next-redux-wrapper";

import flightInfoReducer from "./flightInfoSlice";
import searchFormSlice from "./SearchLocationEndpoints";
import { contentApiSlice } from "./ContentEndpoints";
import { userApiSlice } from "./AuthenticationEndpoints";
import { sharedRideApiSlice } from "./SharedRideEndpoints";
import { fetchUtilsApiSlice } from "./fetchUtils";

const reducers = combineReducers({
  flightInfoReducer,
  searchFormSlice,
  [userApiSlice.reducerPath]: userApiSlice.reducer,
  [contentApiSlice.reducerPath]: contentApiSlice.reducer,
  [sharedRideApiSlice.reducerPath]: sharedRideApiSlice.reducer,
  [fetchUtilsApiSlice.reducerPath]: fetchUtilsApiSlice.reducer
});

const middleware =
  process.env.NODE_ENV === "development"
    ? (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        logger,
        contentApiSlice.middleware,
        userApiSlice.middleware,
        sharedRideApiSlice.middleware,
        fetchUtilsApiSlice.middleware
      ]
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
      [contentApiSlice.reducerPath]: action.payload[contentApiSlice.reducerPath]
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
