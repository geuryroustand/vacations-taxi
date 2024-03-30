import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";
import { baseURL } from "../../environment";

export const fetchUtilsApiSlice = createApi({
  reducerPath: "fetchUtilsApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action) {
    if (action.type === HYDRATE) {
      return action.payload[fetchUtilsApiSlice.reducerPath];
    }
  },
  endpoints: (builder) => ({
    fetchDataFromAnySource: builder.query({
      query: (url) => ({
        url: `${url}`,
        method: "GET"
      }),
      keepUnusedDataFor: Number.POSITIVE_INFINITY
    })
  })
});

// Export hooks for usage in functional components

export const { useFetchDataFromAnySourceQuery, endpoints: contentEndpoints } = fetchUtilsApiSlice;

// Export endpoints for use in SSR

export const { fetchDataFromAnySource } = contentEndpoints;
