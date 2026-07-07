const mongoose = require("mongoose");

const habitSchema = new mongoose.Schema(
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

    description: {
      type: String,
      default: "",
      trim: true,
    },

    frequency: {
      type: String,
      enum: ["Daily", "Weekly", "Monthly"],
      default: "Daily",
    },

    targetStreak: {
      type: Number,
      default: 30,
      min: 1,
    },

    currentStreak: {
      type: Number,
      default: 0,
      min: 0,
    },

    completedToday: {
      type: Boolean,
      default: false,
    },

    lastCompletedDate: {
      type: Date,
      default: null,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Reset completedToday automatically when a new day starts
habitSchema.pre("save", function (next) {
  if (this.lastCompletedDate) {
    const today = new Date().toDateString();
    const lastCompleted = new Date(
      this.lastCompletedDate
    ).toDateString();

    if (today !== lastCompleted) {
      this.completedToday = false;
    }
  }

  next();
});

module.exports = mongoose.model("Habit", habitSchema);