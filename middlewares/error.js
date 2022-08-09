import ErrorResponse from '../utils/errorResponse.js';

export const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Mongoose Bad Object Id || Cast Error
  if (err.name === 'CastError') {
    const message = `Resource not found with id : ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  // Mongoose Validation Error
  if (err.name === 'ValidatorError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  // Mongoose Duplicate Key
  if (err.code === 11000) {
    const message = `Your email is already registered with us, Try logging in`;
    error = new ErrorResponse(message,400)
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
};
