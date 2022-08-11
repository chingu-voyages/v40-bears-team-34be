import { asyncHandler } from '../middlewares/async.js';
import { User } from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

// @desc      Create a user
// @route     POST /api/v1/auth/users/
// @access    Public as of now

export const createUser = asyncHandler(async (req, res, next) => {
  if (req.user?.role !== 'admin' ) {
    return next(
        new ErrorResponse('You are not authorized to create a user', 401)
    );
  }
      await User.create(req.body);
      res.status(201).json({
          sucess: 'true',
          message: 'User created successfully',
      });
  
});
