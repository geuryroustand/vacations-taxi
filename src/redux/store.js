import { configureStore, combineReducers } from "@reduxjs/toolkit";
import logger from "redux-logger";

import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "reduxjs-toolkit-persist";
import storage from "reduxjs-toolkit-persist/lib/storage";

import flightInfoReducer from "./flightInfoSlice";

const persistConfig = {
  key: "root",
  storage
};

const reducers = combineReducers({
  flightInfoReducer
});

const persistedReducer = persistReducer(persistConfig, reducers);

const middleware =
  process.env.NODE_ENV === "development"
    ? (getDefaultMiddleware) => [
        ...getDefaultMiddleware({
          serializableCheck: {
            /* ignore persistance actions */
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        }),
        logger
      ]
    : (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            /* ignore persistance actions */
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
          }
        });

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware
});

export default store;

export const persistor = persistStore(store);
