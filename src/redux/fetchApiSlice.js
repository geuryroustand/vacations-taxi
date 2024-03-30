import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { HYDRATE } from "next-redux-wrapper";
import { baseURLSpecial } from "../../environment";

// Todo remove the keepUnusedDataFor
export const fetchApiSlice = createApi({
  reducerPath: "fetchApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURLSpecial
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
        url: `common-content?locale=${locale}&populate[TopLocations][populate]=&populate[Company][populate]=&populate[Footer][populate]=*&populate[helpCenter][populate]=&populate[blogs][populate]=&populate[bookingSearch][populate]=&populate[faq][populate]&populate[oneWayAndRoundTrip][populate]=&populate[award][populate]&populate[DRLink][populate]`,
        method: "GET"
      }),
      keepUnusedDataFor: Number.POSITIVE_INFINITY
    }),
    getContent: builder.query({
      query: (url) => ({
        url: `${url}`,
        method: "GET"
      }),
      keepUnusedDataFor: Number.POSITIVE_INFINITY
    }),
    getUser: builder.query({
      query: (cookieToken) =>
        cookieToken && {
          url: "users/me",
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookieToken}`
          }
        }

      // providesTags: ["Users"]
    }),

    registerUser: builder.mutation({
      query: (user) => ({
        url: "auth/local/register",
        method: "POST",
        body: user
      })
      // invalidatesTags: ["Users"]
    }),
    userLogin: builder.mutation({
      query: (user) => ({
        url: "auth/local",
        method: "POST",
        body: user
      })
      // invalidatesTags: ["Users"]
    })
  })
});

// Export hooks for usage in functional components

export const {
  useGetTranslationQuery,
  useGetContentQuery,
  useGetUserQuery,
  useRegisterUserMutation,
  useUserLoginMutation,
  endpoints
} = fetchApiSlice;

// export endpoints for use in SSR
export const { getTranslation, getContent } = endpoints;
