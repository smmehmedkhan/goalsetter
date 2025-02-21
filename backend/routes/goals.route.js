const express = require('express');
const {
  getAllGoals,
  createAGoal,
  updateAGoal,
  deleteAGoal,
} = require('../controllers/goal.controller.js');
const { protect } = require('../middlewares/authorization.js');

const router = express.Router();

router.route('/').get(protect, getAllGoals).post(protect, createAGoal);
router.route('/:id').put(protect, updateAGoal).delete(protect, deleteAGoal);

module.exports = router;
