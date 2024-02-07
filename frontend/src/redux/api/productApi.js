import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),
  tagTypes: ['Product', 'AdminProducts'],

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

    getAdminProduct: builder.query({
      query: () => ({
        url: `/admin/products`,
      }),
      providesTags: ['AdminProducts'],
    }),

    submitReview: builder.mutation({
      query: (body) => ({
        url: `/reviews`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    createProduct: builder.mutation({
      query: (body) => ({
        url: `/admin/products`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AdminProducts'],
    }),

    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/products/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['AdminProducts', 'Product'],
    }),

    uploadProductImages: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/products/${id}/upload_images`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProductImage: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/products/${id}/delete_image`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['Product'],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/admin/products/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminProducts'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useGetAdminProductQuery,
  useSubmitReviewMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useUploadProductImagesMutation,
  useDeleteProductImageMutation,
  useDeleteProductMutation,
} = productApi;
