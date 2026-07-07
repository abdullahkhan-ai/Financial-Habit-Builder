const Habit = require("../models/Habit");

// Create Habit
const createHabit = async (req, res) => {
  try {
    const {
      title,
      description,
      frequency,
      targetStreak,
    } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Habit title is required.",
      });
    }

    const habit = await Habit.create({
      user: req.user._id,
      title,
      description,
      frequency,
      targetStreak,
    });

    res.status(201).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Habits
const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({
      user: req.user._id,
      isActive: true,
    }).sort({
      createdAt: -1,
    });

    const today = new Date().toDateString();

    const updatedHabits = habits.map((habit) => {
      const habitObj = habit.toObject();

      habitObj.completedToday =
        habit.lastCompletedDate &&
        new Date(habit.lastCompletedDate).toDateString() ===
          today;

      return habitObj;
    });

    res.status(200).json(updatedHabits);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Habit
const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found.",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    Object.assign(habit, req.body);

    await habit.save();

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Complete Today's Habit
const completeHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found.",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    const today = new Date();
    const todayString = today.toDateString();

    // Already completed today
    if (
      habit.lastCompletedDate &&
      new Date(habit.lastCompletedDate).toDateString() ===
        todayString
    ) {
      return res.status(400).json({
        message: "Habit already completed today.",
      });
    }

    // Streak Logic
    if (habit.lastCompletedDate) {
      const lastDate = new Date(habit.lastCompletedDate);

      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (
        lastDate.toDateString() ===
        yesterday.toDateString()
      ) {
        habit.currentStreak += 1;
      } else {
        habit.currentStreak = 1;
      }
    } else {
      habit.currentStreak = 1;
    }

    habit.completedToday = true;
    habit.lastCompletedDate = today;

    await habit.save();

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Habit
const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findById(req.params.id);

    if (!habit) {
      return res.status(404).json({
        message: "Habit not found.",
      });
    }

    if (habit.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized.",
      });
    }

    await habit.deleteOne();

    res.status(200).json({
      message: "Habit deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHabit,
  getHabits,
  updateHabit,
  completeHabit,
  deleteHabit,
};