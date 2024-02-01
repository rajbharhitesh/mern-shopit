import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  userProfile,
} from '../controllers/authController.js';
import { authenticatedUser } from '../middlewares/authMiddleware.js';
const router = express.Router();

// api/v1/register
router.route('/register').post(registerUser);

// api/v1/login
router.route('/login').post(loginUser);

// api/v1/logout
router.route('/logout').get(logoutUser);

// api/v1/me
router.route('/me').get(authenticatedUser, userProfile);

export default router;
