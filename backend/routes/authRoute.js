import express from 'express';
import { loginUser, registerUser } from '../controllers/authController.js';
const router = express.Router();

// api/v1/register
router.route('/register').post(registerUser);

// api/v1/login
router.route('/login').post(loginUser);

export default router;
