import express from 'express';
import { createUser } from '../controllers/user.js';

const router = express.Router();

router.route('/admin/new').post(createUser)

export default router;
