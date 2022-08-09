import ErrorResponse from '../utils/errorResponse.js'
import { asyncHandler } from '../middlewares/async.js';
import { Apartment } from '../models/Apartment.js';

// @desc      Get all Apartments
// @route     GET /api/v1/apartments
// @access    Public

export const getAllApartments = asyncHandler(async (req, res, next) => {
  const apartments = await Apartment.find({});
  res.status(200).json({ message: success, data: apartments });
});

// @desc      Get a single Apartment
// @route     GET /api/v1/apartment
// @access    Public

export const getApartment = asyncHandler(async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id);
  if (!apartment) {
     return next(new ErrorResponse(`No Apartment found with that Id`, 404));
  }
  res.status(200).json({ message: success, data: apartment });
});


