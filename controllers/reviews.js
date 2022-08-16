import ErrorResponse from '../utils/errorResponse.js';
import { asyncHandler } from '../middlewares/async.js';
import { Review } from '../models/Review.js';
import { Apartment } from '../models/Apartment.js';

// @desc      Add a review
// @route     POST /api/v1/apartments/:apartmentId/reviews
// @access    Public as of now

export const addReview = asyncHandler(async (req, res, next) => {
  req.body.apartment = req.params.apartmentId;
  // req.body.user = ``;

  const apartment = await Apartment.findById(req.params.apartmentId);
  if (!apartment) {
    return next(new ErrorResponse(`No Apartment found with that Id`,404))
  }
    const review = await Review.create(req.body);
    apartment.reviews.push(review)
    await apartment.save();


  res.status(201).json({success:true,data:review})
})

// @desc      Get all reviews
// @route     GET /api/v1/apartments/:apartmentId/reviews
// @access    Public

export const getApartmentReviews = asyncHandler(async (req, res, next) => {

    const apartment = await Apartment.findById(req.params.apartmentId);
    if (!apartment) {
        return next(new ErrorResponse(`No Apartment found with that Id`, 404));
    }
    const review = await Review.find({})
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'apartment', select: 'name city ' });;

    res.status(200).json({ success: true, data: review });
});

export const getReview = asyncHandler(async (req, res, next) => {
    const apartment = await Apartment.findById(req.params.apartmentId);
    if (!apartment) {
        return next(new ErrorResponse(`No Apartment found with that Id`, 404));
    }
    const review = await Review.findById(req.params.reviewId)
        .populate({ path: 'user', select: 'name' })
        .populate({ path: 'apartment', select: 'name city ' });
    if (!review) {
        return next(new ErrorResponse(`No such review found`, 404));
    }
    res.status(200).json({ success: true, data: review });
});




