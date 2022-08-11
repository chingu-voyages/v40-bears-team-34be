import ErrorResponse from '../utils/errorResponse.js'
import { asyncHandler } from '../middlewares/async.js';
import { Apartment } from '../models/Apartment.js';

// @desc      Get all Apartments
// @route     GET /api/v1/apartments
// @access    Public

export const getAllApartments = asyncHandler(async (req, res, next) => {
  const apartments = await Apartment.find({})
      .sort({
          field: 'asc',
          createdAt: -1,
      })
    .populate({ path: 'user', select: 'name' });
      ;
  res.status(200).json({ message: 'success',count:apartments.length, data: apartments });
});

// @desc      Get a single Apartment
// @route     GET /api/v1/apartment
// @access    Public

export const getApartment = asyncHandler(async (req, res, next) => {
  const apartment = await Apartment.findById(req.params.id).populate('reviews');
  if (!apartment) {
     return next(new ErrorResponse(`No Apartment found with that Id`, 404));
  }
  res.status(200).json({ message: 'success', data: apartment });
});


// @desc      Create an Apartment
// @route     POST /api/v1/apartment
// @access    Public

export const createApartment = asyncHandler(async (req, res, next) => {
  // if (!req.user.role === 'admin') {
  //   return next(new ErrorResponse(`You are not authorized to create an apartment`,401))
  // }
  const apartment = await Apartment.create(req.body);
  res.status(200).json({message:'success',data:apartment})
});

// @desc      Delete an Apartment
// @route     DELETE /api/v1/apartment
// @access    Public

export const deleteApartment = asyncHandler(async (req, res, next) => {
    // if (!req.user.role === 'admin') {
    //   return next(new ErrorResponse(`You are not authorized to create an apartment`,401))
    // }
    const apartment = await Apartment.findById(req.params.id);
      if (!apartment) {
          return next(
              new ErrorResponse(`No Apartment found with that Id`, 404)
          );
      }
    await Apartment.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'success', data: {} });
});