import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { PROD } from "../../environment";

export const userApiSlice = createApi({
  reducerPath: "userApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: PROD
      ? process.env.NEXT_PUBLIC_API_PROD_URL_STRAPI
      : process.env.NEXT_PUBLIC_API_STRAPI_DEV_URL
  }),

  endpoints: (builder) => ({
    fetchUser: builder.query({
      query: (cookieToken) =>
        cookieToken && {
          url: `/users/me`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${cookieToken}`
          }
        }
    }),

    fetchUserProvider: builder.query({
      query: ({ providerName, accessToken }) =>
        providerName &&
        accessToken && {
          url: `/auth/${providerName}/callback?access_token=${accessToken}`,
          method: "GET"
        },
      keepUnusedDataFor: Number.POSITIVE_INFINITY
    }),

    createUser: builder.mutation({
      query: (user) => ({
        url: `/auth/local/register`,
        method: "POST",
        body: user
      })
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: `/auth/local`,
        method: "POST",
        body: user
      })
    })
  })
});

export const {
  useFetchUserQuery,
  useFetchUserProviderQuery,
  useCreateUserMutation,
  useLoginUserMutation,
  endpoints: userEndpoints
} = userApiSlice;

export const { fetchUser, createUser, loginUser } = userEndpoints;
