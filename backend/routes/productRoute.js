import express from 'express';
import { getProducts, newProduct } from '../controllers/productController.js';
const router = express.Router();

// api/v1/products
router.route('/products').get(getProducts);

// api/v1/admin/products
router.route('/admin/products').post(newProduct);

export default router;
