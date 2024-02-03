import express from 'express';
import {
  allUsers,
  deleteUser,
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
  updatePassword,
  updateProfile,
  updateUser,
  uploadAvatar,
  userProfile,
} from '../controllers/authController.js';
import {
  authenticatedUser,
  authorizeRoles,
} from '../middlewares/authMiddleware.js';
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

// api/v1/me/update
router.route('/me/update').put(authenticatedUser, updateProfile);

// api/v1/me/update
router.route('/me/upload_avatar').put(authenticatedUser, uploadAvatar);

//api/v1/admin/users
router
  .route('/admin/users')
  .get(authenticatedUser, authorizeRoles('admin'), allUsers);

//api/v1/admin/users/:id
router
  .route('/admin/users/:id')
  .get(authenticatedUser, authorizeRoles('admin'), getUserDetails)
  .put(authenticatedUser, authorizeRoles('admin'), updateUser)
  .delete(authenticatedUser, authorizeRoles('admin'), deleteUser);

export default router;
