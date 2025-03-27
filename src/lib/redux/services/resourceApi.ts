import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const resourceApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dev.hartdev.ru/api/piermont",
  }),
  endpoints: (builder) => ({
    getApartments: builder.query<
      unknown,
      {
        floor: number;
        liter: "a" | "b" | "v";
      }
    >({
      query: ({ floor = 1, liter = "a" }) =>
        `get-apartments-by-floor-piermont?floor=${floor}&liter=${liter}`,
    }),
  }),
});

export const { getApartments } = resourceApi;
