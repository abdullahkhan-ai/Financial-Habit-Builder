const express = require("express");

const router = express.Router();

const {
  getReminders,
  createReminder,
  toggleReminder,
  deleteReminder,
} = require("../controllers/reminderController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Get all reminders
router.get(
  "/",
  protect,
  getReminders
);

// Create reminder
router.post(
  "/",
  protect,
  createReminder
);

// Toggle reminder
router.patch(
  "/:id/toggle",
  protect,
  toggleReminder
);

// Delete reminder
router.delete(
  "/:id",
  protect,
  deleteReminder
);

module.exports = router;