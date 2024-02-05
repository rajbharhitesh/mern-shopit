import { configureStore } from '@reduxjs/toolkit';
import { productApi } from './api/productApi';
import { authApi } from './api/authApi';
import { userApi } from './api/userApi';
import userReducer from './feature/userSlice';
import cartReducer from './feature/cartSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    cart: cartReducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      authApi.middleware,
      userApi.middleware,
    ]),
});
