import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),

  tagTypes: ['Order'],

  endpoints: (builder) => ({
    createNewOrder: builder.mutation({
      query: (body) => ({
        url: '/orders/new',
        method: 'POST',
        body,
      }),
    }),

    myOrders: builder.query({
      query: () => ({
        url: '/me/orders',
      }),
    }),

    orderDetail: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
      }),
    }),

    getDashboardSales: builder.query({
      query: ({ startDate, endDate }) => ({
        url: `/admin/get_sales/?startDate=${startDate}&endDate=${endDate}`,
      }),
    }),

    stripeCheckoutSession: builder.mutation({
      query: (body) => ({
        url: '/payment/checkout_session',
        method: 'POST',
        body,
      }),
    }),

    getAdminOrders: builder.query({
      query: () => ({
        url: '/admin/orders',
      }),
    }),
  }),
});

export const {
  useCreateNewOrderMutation,
  useStripeCheckoutSessionMutation,
  useMyOrdersQuery,
  useOrderDetailQuery,
  useLazyGetDashboardSalesQuery,
  useGetAdminOrdersQuery,
} = orderApi;
