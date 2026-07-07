const mongoose = require("mongoose");

const goalSchema = new mongoose.Schema(
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

    targetAmount: {
      type: Number,
      required: true,
      min: 1,
    },

    savedAmount: {
      type: Number,
      default: 0,
      min: 0,
    },

    targetDate: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "Emergency Fund",
        "Travel",
        "Vehicle",
        "Electronics",
        "Education",
        "Home",
        "Investment",
        "Business",
        "Other",
      ],
      default: "Other",
    },

    notes: {
      type: String,
      default: "",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Active", "Completed"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// Automatically update goal status
goalSchema.pre("save", function () {
  if (this.savedAmount >= this.targetAmount) {
    this.status = "Completed";
  } else {
    this.status = "Active";
  }
});

module.exports = mongoose.model("Goal", goalSchema);