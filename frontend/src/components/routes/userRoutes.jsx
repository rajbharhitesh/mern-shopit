import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../../pages/HomePage';
import ProductPage from '../../pages/product/ProductPage';
import LoginPage from '../../pages/auth/LoginPage';
import RegisterPage from '../../pages/auth/RegisterPage';
import ProfilePage from '../../pages/user/ProfilePage';
import UpdateProfilePage from '../../pages/user/UpdateProfilePage';
import UploadAvatarPage from '../../pages/user/UploadAvatarPage';
import UpdatePasswordPage from '../../pages/user/UpdatePasswordPage';
import CartPage from '../../pages/cart/CartPage';
import ShippingPage from '../../pages/cart/ShippingPage';
import ConfirmOrderPage from '../../pages/cart/ConfirmOrderPage';
import PaymentPage from '../../pages/cart/PaymentPage';
import OrderPage from '../../pages/order/OrderPage';
import OrderDetailPage from '../../pages/order/OrderDetailPage';

const userRoutes = () => {
  return (
    <>
      <Route path="/" element={<HomePage />} />
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/cart" element={<CartPage />} />

      <Route
        path="/me/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/me/update_profile"
        element={
          <ProtectedRoute>
            <UpdateProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/me/upload_avatar"
        element={
          <ProtectedRoute>
            <UploadAvatarPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/me/update_password"
        element={
          <ProtectedRoute>
            <UpdatePasswordPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shipping"
        element={
          <ProtectedRoute>
            <ShippingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/confirm_order"
        element={
          <ProtectedRoute>
            <ConfirmOrderPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/me/orders"
        element={
          <ProtectedRoute>
            <OrderPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/me/order/:id"
        element={
          <ProtectedRoute>
            <OrderDetailPage />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default userRoutes;
