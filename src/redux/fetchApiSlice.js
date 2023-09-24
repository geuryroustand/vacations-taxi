import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getCookieToken } from "../Helper/auth";

const baseUrl =
  process.env.NODE_ENV === "production"
    ? `${process.env.NEXT_PUBLIC_API_STRAPI_PROD_URL}`
    : `${process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL}`;

const cookieToken = getCookieToken();

export const fetchApiSlice = createApi({
  reducerPath: "fetchApi",
  // tagTypes: ["Users"],
  baseQuery: fetchBaseQuery({
    baseUrl
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState().auth.token;

    //   // If we have a token set in state, let's assume that we should be passing it.
    //   if (token) {
    //     headers.set("authorization", `Bearer ${token}`);
    //   }

    //   return headers;
    // }
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "users/me",
        method: "GET",
        headers: {
          Authorization: `Bearer ${cookieToken}`
        }
      })

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

    // getProduct: builder.query({
    //   query: (product) => `products/search?q=${product}`
    // })
  })
});

export const { useGetUserQuery, useRegisterUserMutation, useUserLoginMutation } = fetchApiSlice;
