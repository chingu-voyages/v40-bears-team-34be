import express from 'express';
import {
    addReview,
    getReview,
    getApartmentReviews,
} from '../controllers/reviews.js';

const router = express.Router({ mergeParams: true });

router.route('/').post(addReview).get(getApartmentReviews);
router.route('/:reviewId').get(getReview);

export default router;
