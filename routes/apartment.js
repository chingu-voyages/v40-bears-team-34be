import express from 'express';
import {
    getAllApartments,
    getApartment,
    createApartment,
    deleteApartment,
} from '../controllers/apartment.js';
import reviewRoutes from './review.js';
import { Apartment } from '../models/Apartment.js';
import { searchQuery } from '../middlewares/search.js';
const router = express.Router();

router.use('/:apartmentId/reviews', reviewRoutes);

router
    .route('/')
    .get(searchQuery(Apartment, 'reviews'), getAllApartments)
    .post(createApartment);
router.route('/:id').get(getApartment).delete(deleteApartment);

export default router;
