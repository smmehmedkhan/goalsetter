const expressAsyncHandler = require('express-async-handler');
const Goal = require('../models/goal.schema.js');
const User = require('../models/user.schema.js');

/*
  @desc: Get all goals
  @route: GET /api/goals
  @access: Private
*/
const getAllGoals = expressAsyncHandler(async (req, res) => {
  const goal = await Goal.find({ user: req.user.id });
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
      user: req.user.id,
      text: req.body.text,
    });
    await goal.save();

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

  if (!goal) {
    res.status(404);
    throw new Error('Goal not found');
  }

  const user = await User.findById(req.user.id);

  // Check user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Validate user
  if (goal.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  await updatedGoal.save();

  res.status(200).json(updatedGoal);
});

/*
  @desc: Delete a goal
  @route: DELETE /api/goals
  @access: Private
*/
const deleteAGoal = expressAsyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const goal = await Goal.findById(req.params.id);

    // Check user
    if (!user) {
      res.status(401);
      throw new Error('User not found');
    }

    // Validate user
    if (goal.user.toString() !== user.id) {
      res.status(401);
      throw new Error('User not authorized');
    }
    const result = await Goal.findByIdAndDelete(req.params.id);

    if (!result) return res.status(404).json({ message: 'Goal not found' });
    return res.status(200).send({ message: 'Goal deleted successfully' });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

module.exports = {
  getAllGoals,
  createAGoal,
  updateAGoal,
  deleteAGoal,
};
