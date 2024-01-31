import express from 'express';
import {
  deleteProduct,
  getProductDetails,
  getProducts,
  newProduct,
  updateProduct,
} from '../controllers/productController.js';
import { authenticatedUser } from '../middlewares/authMiddleware.js';
const router = express.Router();

// api/v1/products
router.route('/products').get(getProducts);

// api/v1/admin/products
router.route('/admin/products').post(authenticatedUser, newProduct);

// api/v1/products/:id
router.route('/products/:id').get(getProductDetails);

// api/v1/admin/products/:id
router
  .route('/admin/products/:id')
  .put(authenticatedUser, updateProduct)
  .delete(authenticatedUser, deleteProduct);

export default router;
