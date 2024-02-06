import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Product'],

  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => ({
        url: '/products',
        params: {
          page: params.page,
          keyword: params.keyword,
          category: params.category,
          'price[gte]': params.min,
          'price[lte]': params.max,
          'ratings[gte]': params.ratings,
        },
      }),
    }),

    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
      }),
      providesTags: ['Product'],
    }),

    submitReview: builder.mutation({
      query: (body) => ({
        url: `/reviews`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useSubmitReviewMutation,
} = productApi;
