const expressAsyncHandler = require('express-async-handler');
const Goal = require('../models/goal.schema.js');

/*
  @desc: Get all goals
  @route: GET /api/goals
  @access: Private
*/
const getAllGoals = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.find();
  res.status(200).json(goal);
});

/*
  @desc: Create a goal
  @route: POST /api/goals
  @access: Private
*/
const createAGoal = expressAsyncHandler(async (req, res) => {
  if (req.body.text) {
    const goal = await Goal.create({
      text: req.body.text,
    });
    res.status(200).json(goal);
  } else {
    res.status(400);
    throw new Error('Please add a text');
  }
});

/*
  @desc: Update a goal
  @route: PUT /api/goals
  @access: Private
*/
const updateAGoal = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (goal) {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updateAGoal);
  } else {
    res.status(404);
    throw new Error('Goal not found');
  }
});

/*
  @desc: Delete a goal
  @route: DELETE /api/goals
  @access: Private
*/
const deleteAGoal = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (goal) {
    await goal.remove();
    res.status(200).json({ id: req.params.id });
  } else {
    res.status(404);
    throw new Error('Goal not found');
  }
});

module.exports = {
  getAllGoals,
  createAGoal,
  updateAGoal,
  deleteAGoal,
};
