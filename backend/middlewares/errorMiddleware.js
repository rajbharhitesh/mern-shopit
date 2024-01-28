import ErrorHandler from '../utils/ErrorHandler.js';

const errorMiddleware = (err, req, res, next) => {
  let error = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Internal Server Error',
  };

  // handle invalid mongoose ID error
  if (err.name === 'CastError') {
    const message = `Resource not Found. Invalid:${err.path}`;
    error = new ErrorHandler(message, 404);
  }

  // handle validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorHandler(message, 400);
  }

  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res
      .status(error.statusCode)
      .json({ message: error.message, error: err, stack: err.stack });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    res.status(error.statusCode).json({ message: error.message });
  }
};

export { errorMiddleware };
