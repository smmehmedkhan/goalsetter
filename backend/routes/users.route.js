import express from 'express';
import {
	registerUser,
	loginUser,
	displayUser,
} from '../controllers/user.controller.js';
import { protect } from '../middlewares/authorization.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/login', loginUser);
router.get('/me', protect, displayUser);

export default router;
