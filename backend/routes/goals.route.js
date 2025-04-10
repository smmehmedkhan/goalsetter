import express from 'express';
import {
	getAllGoals,
	createAGoal,
	updateAGoal,
	deleteAGoal,
} from '../controllers/goal.controller.js';
import { protect } from '../middlewares/authorization.js';

const router = express.Router();

router.route('/').get(protect, getAllGoals).post(protect, createAGoal);
router.route('/:id').put(protect, updateAGoal).delete(protect, deleteAGoal);

export default router;
