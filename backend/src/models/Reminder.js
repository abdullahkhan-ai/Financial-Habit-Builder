const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "Saving",
        "Expense",
        "Investment",
        "Budget",
      ],
      default: "Saving",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    frequency: {
      type: String,
      enum: [
        "Daily",
        "Weekly",
        "Monthly",
      ],
      required: true,
    },

    reminderTime: {
      type: String,
      required: true,
    },

    enabled: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Reminder",
  reminderSchema
);