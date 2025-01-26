const express = require('express');
const {
  getAllGoals,
  createAGoal,
  updateAGoal,
  deleteAGoal,
} = require('../controllers/goalController.js');

const router = express.Router();

router.route('/').get(getAllGoals).post(createAGoal);
router.route('/:id').put(updateAGoal).delete(deleteAGoal);

module.exports = router;
