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

    const initialSaved = Number(savedAmount) || 0;

    const goal = await Goal.create({
      user: req.user._id,
      title,
      targetAmount,
      savedAmount: initialSaved,
      targetDate,
      category,
      notes,
      status:
        initialSaved >= Number(targetAmount)
          ? "Completed"
          : "Active",
    });

    res.status(201).json(goal);
  } catch (error) {
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

    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    Object.assign(goal, req.body);

    goal.status =
      Number(goal.savedAmount) >= Number(goal.targetAmount)
        ? "Completed"
        : "Active";

    await goal.save();

    res.status(200).json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Add Savings
const addSavings = async (req, res) => {
  try {
    const { amount } = req.body;

    const goal = await Goal.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "Goal not found.",
      });
    }

    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    if (!amount || amount <= 0) {
      return res.status(400).json({
        message: "Invalid amount.",
      });
    }

    goal.savedAmount += Number(amount);

    if (goal.savedAmount >= goal.targetAmount) {
      goal.savedAmount = goal.targetAmount;
      goal.status = "Completed";
    } else {
      goal.status = "Active";
    }

    await goal.save();

    res.status(200).json(goal);
  } catch (error) {
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

    if (goal.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    await goal.deleteOne();

    res.status(200).json({
      message: "Goal deleted successfully.",
    });
  } catch (error) {
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