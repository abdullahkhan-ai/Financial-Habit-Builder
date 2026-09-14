const Goal = require("../models/Goal");

// Create Goal
const createGoal = async (req, res) => {
  try {
    const {
      title,
      targetAmount,
      savedAmount,
      targetDate,
      category,
      notes,
    } = req.body;

    if (!title || !targetAmount || !targetDate) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const goal = await Goal.create({
      user: req.user._id,
      title,
      targetAmount,
      savedAmount: savedAmount || 0,
      targetDate,
      category,
      notes,
    });

    res.status(201).json(goal);
  } catch (error) {
    console.error("Create Goal Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Goals
const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(goals);
  } catch (error) {
    console.error("Get Goals Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Goal
const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    if (
      goal.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    Object.assign(goal, req.body);

    await goal.save();

    res.status(200).json(goal);
  } catch (error) {
    console.error("Update Goal Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Savings
const addSavings = async (req, res) => {
  try {
    const { amount } = req.body;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Please enter a valid savings amount.",
      });
    }

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    if (
      goal.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    goal.savedAmount =
      Number(goal.savedAmount || 0) +
      Number(amount);

    await goal.save();

    res.status(200).json(goal);
  } catch (error) {
    console.error("Add Savings Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Goal
const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    if (
      goal.user.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      message: "Goal deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Goal Error:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createGoal,
  getGoals,
  updateGoal,
  addSavings,
  deleteGoal,
};