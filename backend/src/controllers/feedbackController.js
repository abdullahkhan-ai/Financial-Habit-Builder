const Feedback = require("../models/Feedback");

// Create Feedback
const createFeedback = async (req, res) => {
  try {
    const {
      subject,
      category,
      message,
    } = req.body;

    if (!subject || !category || !message) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      subject,
      category,
      message,
    });

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// User - Get Own Feedback
const getMyFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find({
      user: req.user._id,
    })
      .sort({
        createdAt: -1,
      });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - Get All Feedback
const getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .populate("user", "name email")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - Mark Resolved
const resolveFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(
      req.params.id
    );

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found.",
      });
    }

    feedback.status = "Resolved";
    feedback.resolvedAt = new Date();

    await feedback.save();

    res.status(200).json({
      message: "Feedback marked as resolved.",
      feedback,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin - Delete Feedback
const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findById(
      req.params.id
    );

    if (!feedback) {
      return res.status(404).json({
        message: "Feedback not found.",
      });
    }

    await feedback.deleteOne();

    res.status(200).json({
      message: "Feedback deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createFeedback,
  getMyFeedback,
  getAllFeedback,
  resolveFeedback,
  deleteFeedback,
};