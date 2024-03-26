import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROD } from "../../environment";

export const sharedRideApiSlice = createApi({
  reducerPath: "sharedRideApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: PROD
      ? process.env.NEXT_PUBLIC_API_PROD_URL_STRAPI
      : process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL
  }),

  endpoints: (builder) => ({
    createRequestOrPost: builder.mutation({
      query: ({ postData, token }) => ({
        url: `/share-rides`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: { data: postData }
      })
    }),
    addCommentToPost: builder.mutation({
      query: ({ url, comment, token }) => ({
        url,
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: comment
      })
    }),
    fetchRequestAndPost: builder.query({
      query: (url) => ({
        url: `${url}`,
        method: "GET"
      }),
      keepUnusedDataFor: Number.POSITIVE_INFINITY
    }),
    fetchUserComments: builder.query({
      query: (url) => ({
        url: `${url}`,
        method: "GET"
      }),
      keepUnusedDataFor: Number.POSITIVE_INFINITY
    })
  })
});

export const {
  useFetchUserCommentsQuery,
  useFetchRequestAndPostQuery,
  useCreateRequestOrPostMutation,
  useAddCommentToPostMutation,
  endpoints: sharedRideEndpoints
} = sharedRideApiSlice;

export const { createRequestOrPost, fetchUserComments } = sharedRideEndpoints;
