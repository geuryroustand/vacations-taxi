import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseURL } from "../Helper/fetchData";

export const userApiSlice = createApi({
  reducerPath: "userApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL
  }),

  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (cookieToken) =>
        cookieToken && {
          url: "users/me",
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookieToken}`
          }
        }
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: "auth/local/register",
        method: "POST",
        body: user
      })
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: "auth/local",
        method: "POST",
        body: user
      })
    })
  })
});

export const {
  useFetchUserQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  endpoints: userEndpoints
} = userApiSlice;

export const { fetchUser, createUser, loginUser } = userEndpoints;
