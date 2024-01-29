import asyncHandler from '../middlewares/asyncHandler.js';
import User from '../models/userModel.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import sendToken from '../utils/sendToken.js';

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

export { registerUser, loginUser };
