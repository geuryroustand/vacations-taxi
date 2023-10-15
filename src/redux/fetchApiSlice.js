import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_API_STRAPI_PROD_URL}`
    : `${process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL}`;

export const fetchApiSlice = createApi({
  reducerPath: "fetchApi",
  baseQuery: fetchBaseQuery({
    baseUrl
  }),
  endpoints: (builder) => ({
    getTranslation: builder.query({
      query: () => ({
        url: "common-content?populate[TopLocations][populate]=*&populate[Company][populate]=*&populate[Footer][populate]=*&locale=en",
        method: "GET"
      })
    })
  })
});

export const { useGetTranslationQuery } = fetchApiSlice;
