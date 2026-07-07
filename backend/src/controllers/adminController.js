const User = require("../models/User");
const Income = require("../models/Income");
const Expense = require("../models/Expense");
const Habit = require("../models/Habit");

const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    const incomes = await Income.find();
    const expenses = await Expense.find();

    const activeHabits = await Habit.countDocuments({
      isActive: true,
    });

    const totalIncome = incomes.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    const totalExpense = expenses.reduce(
      (sum, item) => sum + item.amount,
      0
    );

    res.status(200).json({
      totalUsers,
      totalIncome,
      totalExpense,
      activeHabits,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete User
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Delete all user's related data
    await Income.deleteMany({
      user: user._id,
    });

    await Expense.deleteMany({
      user: user._id,
    });

    await Habit.deleteMany({
      user: user._id,
    });

    // Delete user
    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getUsers,
  deleteUser,
};