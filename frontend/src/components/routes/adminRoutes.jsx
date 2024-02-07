import { Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import DashboardPage from '../../pages/admin/DashboardPage';
import ProductPage from '../../pages/admin/ProductPage';
import CreateProductPage from '../../pages/admin/CreateProductPage';
import UpdateProductPage from '../../pages/admin/UpdateProductPage';

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
    </>
  );
};

export default adminRoutes;
