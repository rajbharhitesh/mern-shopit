import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated, setLoading, setUser } from '../feature/userSlice';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1' }),

  tagTypes: ['User', 'AdminUsers'],

  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: '/me',
      }),

      transformResponse: (res) => res.user,

      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser(data));
          dispatch(setIsAuthenticated(true));
          dispatch(setLoading(false));
        } catch (error) {
          dispatch(setLoading(false));
          console.log(error);
        }
      },
      providesTags: ['User'],
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: '/me/update',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    uploadAvatar: builder.mutation({
      query: (body) => ({
        url: '/me/upload_avatar',
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['User'],
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: '/password/update',
        method: 'PUT',
        body,
      }),
    }),

    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/users/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: ['AdminUsers'],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/admin/users/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AdminUsers'],
    }),

    getAdminUsers: builder.query({
      query: () => ({
        url: '/admin/users',
      }),
      providesTags: ['AdminUsers'],
    }),

    getUserDetails: builder.query({
      query: (id) => ({
        url: `/admin/users/${id}`,
      }),
      providesTags: ['AdminUsers'],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetAdminUsersQuery,
  useGetUserDetailsQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useUpdatePasswordMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
