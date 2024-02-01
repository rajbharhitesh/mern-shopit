import express from 'express';
import { authenticatedUser } from '../middlewares/authMiddleware.js';
import {
  getOrderDetails,
  myOrders,
  newOrder,
} from '../controllers/orderController.js';
const router = express.Router();

// api/v1/orders/new
router.route('/orders/new').post(authenticatedUser, newOrder);

// api/v1/me/orders
router.route('/me/orders').get(authenticatedUser, myOrders);

// api/v1/orders/:id
router.route('/orders/:id').get(authenticatedUser, getOrderDetails);

export default router;
