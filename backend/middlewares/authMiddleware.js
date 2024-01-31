import asyncHandler from './asyncHandler.js';
import ErrorHandler from '../utils/ErrorHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// check if user is authenticated or not
const authenticatedUser = asyncHandler(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Login to access this resource', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  next();
});

export { authenticatedUser };
