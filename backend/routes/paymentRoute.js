import express from 'express';
import { authenticatedUser } from '../middlewares/authMiddleware.js';
import {
  stripeCheckoutSession,
  stripeWebhook,
} from '../controllers/paymentController.js';
const router = express.Router();

// api/v1/payment/checkout_session
router
  .route('/payment/checkout_session')
  .post(authenticatedUser, stripeCheckoutSession);

// api/v1/payment/webhook
router.route('/payment/webhook').post(stripeWebhook);

export default router;
