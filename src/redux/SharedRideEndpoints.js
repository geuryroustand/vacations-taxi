import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../Helper/fetchData";

export const sharedRideApiSlice = createApi({
  reducerPath: "sharedRideApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL
  }),

  endpoints: (builder) => ({
    createRequestOrPost: builder.mutation({
      query: ({ postData, token }) => ({
        url: "http://localhost:1337/api/share-rides",
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
