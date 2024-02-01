import express from 'express';
import { authenticatedUser } from '../middlewares/authMiddleware.js';
import { newOrder } from '../controllers/orderController.js';
const router = express.Router();

// api/v1/orders/new
router.route('/orders/new').post(authenticatedUser, newOrder);

export default router;
