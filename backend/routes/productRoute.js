import express from 'express';
import {
  createReview,
  deleteProduct,
  deleteReview,
  getProductDetails,
  getProductReviews,
  getProducts,
  newProduct,
  updateProduct,
} from '../controllers/productController.js';
import {
  authenticatedUser,
  authorizeRoles,
} from '../middlewares/authMiddleware.js';
const router = express.Router();

// api/v1/products
router.route('/products').get(getProducts);

// api/v1/reviews
router
  .route('/reviews')
  .get(authenticatedUser, getProductReviews)
  .put(authenticatedUser, createReview)
  .delete(authenticatedUser, deleteReview);

// api/v1/admin/products
router
  .route('/admin/products')
  .post(authenticatedUser, authorizeRoles('admin'), newProduct);

// api/v1/products/:id
router.route('/products/:id').get(getProductDetails);

// api/v1/admin/products/:id
router
  .route('/admin/products/:id')
  .put(authenticatedUser, authorizeRoles('admin'), updateProduct)
  .delete(authenticatedUser, authorizeRoles('admin'), deleteProduct);

export default router;
