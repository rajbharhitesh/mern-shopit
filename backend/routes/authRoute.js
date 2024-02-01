import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
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

// api/v1/password/update
router.route('/password/update').put(authenticatedUser, updatePassword);

export default router;
