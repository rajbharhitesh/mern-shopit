import express from 'express';
import {
  deleteProduct,
  getProductDetails,
  getProducts,
  newProduct,
  updateProduct,
} from '../controllers/productController.js';
const router = express.Router();

// api/v1/products
router.route('/products').get(getProducts);

// api/v1/admin/products
router.route('/admin/products').post(newProduct);

// api/v1/products/:id
router.route('/products/:id').get(getProductDetails);

// api/v1/admin/products/:id
router.route('/admin/products/:id').put(updateProduct).delete(deleteProduct);

export default router;
