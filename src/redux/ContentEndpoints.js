import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const PROD = process.env.NODE_ENV === "production";

const baseURL = PROD
  ? process.env.NEXT_PUBLIC_API_PROD_URL_STRAPI
  : process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL;

export const contentApiSlice = createApi({
  reducerPath: "contentApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action) {
    if (action.type === HYDRATE) {
      return action.payload[contentApiSlice.reducerPath];
    }
  },
  endpoints: (builder) => ({
    fetchCommonContent: builder.query({
      query: (locale) => ({
        url: `common-content?locale=${locale}&populate[TopLocations][populate]=&populate[Company][populate]=&populate[Footer][populate]=*&populate[helpCenter][populate]=&populate[blogs][populate]=&populate[bookingSearch][populate]=&populate[faq][populate]&populate[oneWayAndRoundTrip][populate]=&populate[award][populate]&populate[DRLink][populate]&populate[carpoolLinks][populate]`,
        method: "GET"
      }),
      keepUnusedDataFor: Number.POSITIVE_INFINITY
    }),
    fetchContent: builder.query({
      query: (url) => ({
        url: `${url}`,
        method: "GET"
      }),
      keepUnusedDataFor: Number.POSITIVE_INFINITY
    })
  })
});

// Export hooks for usage in functional components

export const {
  useFetchCommonContentQuery,
  useFetchContentQuery,
  endpoints: contentEndpoints
} = contentApiSlice;

// Export endpoints for use in SSR

export const { fetchCommonContent, fetchContent } = contentEndpoints;
