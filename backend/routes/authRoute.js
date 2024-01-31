import express from 'express';
import {
  loginUser,
  logoutUser,
  registerUser,
} from '../controllers/authController.js';
const router = express.Router();

// api/v1/register
router.route('/register').post(registerUser);

// api/v1/login
router.route('/login').post(loginUser);

// api/v1/logout
router.route('/logout').get(logoutUser);

export default router;
