import express from 'express';
import {
  authenticatedUser,
  authorizeRoles,
} from '../middlewares/authMiddleware.js';
import {
  allOrders,
  deleteOrder,
  getOrderDetails,
  myOrders,
  newOrder,
  updateOrder,
} from '../controllers/orderController.js';
const router = express.Router();

// api/v1/orders/new
router.route('/orders/new').post(authenticatedUser, newOrder);

// api/v1/me/orders
router.route('/me/orders').get(authenticatedUser, myOrders);

// /api/v1/admin/orders
router
  .route('/admin/orders')
  .get(authenticatedUser, authorizeRoles('admin'), allOrders);

// /api/v1/admin/orders/:id
router
  .route('/admin/orders/:id')
  .put(authenticatedUser, authorizeRoles('admin'), updateOrder)
  .delete(authenticatedUser, authorizeRoles('admin'), deleteOrder);

// api/v1/orders/:id
router.route('/orders/:id').get(authenticatedUser, getOrderDetails);

export default router;
