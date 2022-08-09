import express from 'express';
import { getAllApartments, getApartment } from '../controllers/apartment.js';

const router = express.Router();

router.route('/').get(getAllApartments);
router.route('/:id').get(getApartment);

export default router;