import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { HYDRATE } from "next-redux-wrapper";

const baseUrl = process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL;

// process.env.NODE_ENV === "production"
//   ? `${process.env.NEXT_PUBLIC_API_STRAPI_PROD_URL}`
//   : `${process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL}`;

// Todo remove the keepUnusedDataFor
export const fetchApiSlice = createApi({
  reducerPath: "fetchApi",
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  // eslint-disable-next-line consistent-return
  extractRehydrationInfo(action) {
    if (action.type === HYDRATE) {
      return action.payload[fetchApiSlice.reducerPath];
    }
  },
  endpoints: (builder) => ({
    getTranslation: builder.query({
      query: (locale) => ({
        url: `common-content?locale=${locale}&populate[TopLocations][populate]=&populate[Company][populate]=&populate[Footer][populate]=*&populate[helpCenter][populate]=&populate[blogs][populate]=&populate[bookingSearch][populate]=&populate[faq][populate]&populate[oneWayAndRoundTrip][populate]=&populate[award][populate]`,
        method: "GET"
      })
      // keepUnusedDataFor: Number.POSITIVE_INFINITY
    }),
    getContent: builder.query({
      query: (url) => ({
        url: `${url}`,
        method: "GET"
      }),
      keepUnusedDataFor: Number.POSITIVE_INFINITY
    })
  })
});

// Export hooks for usage in functional components

export const { useGetTranslationQuery, useGetContentQuery, endpoints } = fetchApiSlice;

// export endpoints for use in SSR
export const { getTranslation, getContent } = endpoints;
