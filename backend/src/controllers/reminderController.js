const Reminder = require("../models/Reminder");

// ===============================
// Get All Reminders
// ===============================

const getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(reminders);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Create Reminder
// ===============================

const createReminder = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      frequency,
      reminderTime,
    } = req.body;

    if (!title || !frequency || !reminderTime) {
      return res.status(400).json({
        message: "Please fill all required fields.",
      });
    }

    const reminder = await Reminder.create({
      user: req.user._id,
      title,
      category: category || "Saving",
      description: description || "",
      frequency,
      reminderTime,
    });

    res.status(201).json(reminder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Toggle Reminder
// ===============================

const toggleReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found.",
      });
    }

    reminder.enabled = !reminder.enabled;

    await reminder.save();

    res.status(200).json(reminder);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Delete Reminder
// ===============================

const deleteReminder = async (req, res) => {
  try {
    const reminder = await Reminder.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!reminder) {
      return res.status(404).json({
        message: "Reminder not found.",
      });
    }

    await reminder.deleteOne();

    res.status(200).json({
      message: "Reminder deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getReminders,
  createReminder,
  toggleReminder,
  deleteReminder,
};