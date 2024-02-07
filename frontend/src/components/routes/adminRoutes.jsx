import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '../../pages/admin/DashboardPage';
import ProductPage from '../../pages/admin/ProductPage';
import CreateProductPage from '../../pages/admin/CreateProductPage';
import UpdateProductPage from '../../pages/admin/UpdateProductPage';
import UploadProductImages from '../../pages/admin/UploadProductImages';
import OrderPage from '../../pages/admin/OrderPage';
import UpdateOrderPage from '../../pages/admin/UpdateOrderPage';

const adminRoutes = () => {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute admin={true}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products"
        element={
          <ProtectedRoute admin={true}>
            <ProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/product/new"
        element={
          <ProtectedRoute admin={true}>
            <CreateProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateProductPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/products/:id/upload_images"
        element={
          <ProtectedRoute admin={true}>
            <UploadProductImages />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders"
        element={
          <ProtectedRoute admin={true}>
            <OrderPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/orders/:id"
        element={
          <ProtectedRoute admin={true}>
            <UpdateOrderPage />
          </ProtectedRoute>
        }
      />
    </>
  );
};

export default adminRoutes;
