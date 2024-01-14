/* eslint-disable unicorn/no-null */
/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchPrice = createAsyncThunk("flightInfo/fetchPrice", async (query, thunkAPI) => {
  try {
    const PROD = process.env.NODE_ENV === "production";
    const response = await fetch(
      `${
        PROD
          ? `${process.env.NEXT_PUBLIC_API_PROD_URL}/locations/addPrices?pickUp=${
              query.pickUp
            }&dropOff=${query.dropOff}&roundtrip=${query.roundtrip ?? false}`
          : `${process.env.NEXT_PUBLIC_API_DEV_URL}/locations/addPrices?pickUp=${
              query.pickUp
            }&dropOff=${query.dropOff}&roundtrip=${query.roundtrip ?? false}`
      }`
    );

    if (response.ok) {
      const data = await response.json();
      return { ...query, ...data, pickUpID: query.pickUp, dropOffID: query.dropOff };
    }

    return thunkAPI.rejectWithValue("Failed to fetch locations");
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const initialState = {
  totalPrice: null,
  cartSelectedText: null,
  flightInfo: null,
  bookingInfo: null,
  paymentMethod: null,
  agreedTermsAndConditions: null,
  isLoading: false,
  isError: false
};

const flightInfoSlice = createSlice({
  name: "flightInfo",
  initialState,
  reducers: {
    updateTotalPrice(state, action) {
      state.totalPrice = action.payload.totalPrice;
      state.cartSelectedText = action.payload.cartSelectedText;
    },
    allFlightInfo(state, action) {
      state.flightInfo = action.payload;
      state.totalPrice = state.flightInfo.priceTaxi1;
    },
    bookingInfo(state, action) {
      const totalPrice = state.totalPrice || state.flightInfo.priceTaxi1;

      const existingInfo = {
        ...state.bookingInfo,
        ...state.flightInfo,
        ...action.payload,
        totalPrice
      };

      delete existingInfo.priceTaxi1;
      delete existingInfo.priceTaxi2;
      delete existingInfo.priceTaxi3;
      delete existingInfo.priceTaxi4;

      state.bookingInfo = existingInfo;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrice.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchPrice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.flightInfo = action.payload;
      })
      .addCase(fetchPrice.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export const { updateTotalPrice, allFlightInfo, bookingInfo } = flightInfoSlice.actions;

export default flightInfoSlice.reducer;
