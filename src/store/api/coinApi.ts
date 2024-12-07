import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const coinApi = createApi({
  reducerPath: "coinApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.coingecko.com/api/v3/",
  }),
  endpoints: (builder) => ({
    seacrhCoinByName: builder.query({
      query: (coin: string) => `search?query=${coin}`,
    }),
    getPriceById: builder.query({
      query: (id: string) => `coins/${id}`,
    }),
  }),
});

export const { useSeacrhCoinByNameQuery, useGetPriceByIdQuery } = coinApi;
