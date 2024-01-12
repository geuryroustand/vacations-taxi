/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchLocations = createAsyncThunk(
  "locations/fetchLocations",
  async (searchedTerm, thunkAPI) => {
    try {
      const PROD = process.env.NODE_ENV === "production";
      const response = await fetch(
        `${
          PROD
            ? `${
                process.env.NEXT_PUBLIC_API_PROD_URL
              }/locations/search?location=${searchedTerm.trim()}`
            : `${
                process.env.NEXT_PUBLIC_API_DEV_URL
              }/locations/search?location=${searchedTerm.trim()}`
        }`
      );
      if (!response.ok) throw new Error("Not found, contact us here to help you");
      const getDestinations = await response.json();
      return getDestinations;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const searchFormSlice = createSlice({
  name: "searchForm",
  initialState: {
    searchResults: [],
    isLoading: false,
    isError: false,
    noSearch: true
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocations.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchLocations.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.searchResults = action.payload;
        state.noSearch = !false;
      })
      .addCase(fetchLocations.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  }
});

export default searchFormSlice.reducer;
