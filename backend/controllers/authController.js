import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import sendToken from '../utils/sendToken.js';
import { delete_file, upload_file } from '../utils/cloudinary.js';

/**-----------------------------------------------
 * @desc    Register user
 * @route   /api/v1/register
 * @method  POST
 * @access  Public
 ------------------------------------------------*/
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler('please provide all fields', 400));
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ErrorHandler('user already exist', 400));
  }

  const user = await User.create({ name, email, password });

  sendToken(user, 201, res);
});

/**-----------------------------------------------
 * @desc    Login user
 * @route   /api/v1/login
 * @method  POST
 * @access  Public
 ------------------------------------------------*/
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler('please provide all fields', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Invalid email or password', 401));
  }

  sendToken(user, 200, res);
});

/**-----------------------------------------------
 * @desc    Logout user
 * @route   /api/v1/logout
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({ message: 'Logout Successfull' });
});

/**-----------------------------------------------
 * @desc    Get current logged in user profile
 * @route   /api/v1/me
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const userProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);

  res.status(200).json({ user });
});

/**-----------------------------------------------
 * @desc    Update password
 * @route   /api/v1/password/update
 * @method  PUT
 * @access  Private
 ------------------------------------------------*/
const updatePassword = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('+password');

  // Check the previous user password
  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Old Password is incorrect', 400));
  }

  user.password = req.body.password;
  user.save();

  res.status(200).json({
    success: true,
  });
});

/**-----------------------------------------------
 * @desc    Update profile
 * @route   /api/v1/me/update
 * @method  PUT
 * @access  Private
 ------------------------------------------------*/
const updateProfile = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

/**-----------------------------------------------
 * @desc    Upload and Update user avatar
 * @route   /api/v1/me/upload_avatar
 * @method  PUT
 * @access  Private
 ------------------------------------------------*/
const uploadAvatar = asyncHandler(async (req, res, next) => {
  const avatarResponse = await upload_file(req.body.avatar, 'shopit/avatars');

  // remove previous avatar
  if (req.user.avatar.url) {
    await delete_file(req.user.avatar.public_id);
  }

  const user = await User.findByIdAndUpdate(req.user._id, {
    avatar: avatarResponse,
  });

  res.status(200).json({
    user,
  });
});

/**-----------------------------------------------
 * @desc    Get all users by Admin
 * @route   /api/v1/admin/users
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const allUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

/**-----------------------------------------------
 * @desc    Get User Details - ADMIN 
 * @route   /api/v1/admin/users/:id
 * @method  GET
 * @access  Private
 ------------------------------------------------*/
const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    user,
  });
});

/**-----------------------------------------------
 * @desc    Update User Details - ADMIN 
 * @route   /api/v1/admin/users/:id
 * @method  PUT
 * @access  Private
 ------------------------------------------------*/
const updateUser = asyncHandler(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
  });

  res.status(200).json({
    user,
  });
});

/**-----------------------------------------------
 * @desc    Delete User- ADMIN 
 * @route   /api/v1/admin/users/:id
 * @method  DELETE
 * @access  Private
 ------------------------------------------------*/
const deleteUser = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id: ${req.params.id}`, 404)
    );
  }

  // Remove user avatar from cloudinary
  if (user?.avatar?.public_id) {
    await delete_file(user?.avatar?.public_id);
  }

  await user.deleteOne();

  res.status(200).json({
    success: true,
  });
});

export {
  registerUser,
  loginUser,
  logoutUser,
  userProfile,
  updatePassword,
  updateProfile,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  uploadAvatar,
};
