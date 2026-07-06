const Income = require("../models/Income");

// @desc    Create Income
// @route   POST /api/income
// @access  Private
const createIncome = async (req, res) => {
  try {
    const { source, amount, category, date, notes } = req.body;

    if (!source || !amount || !category) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const income = await Income.create({
      user: req.user._id,
      source,
      amount,
      category,
      date,
      notes,
    });

    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Get All Income
// @route   GET /api/income
// @access  Private
const getIncome = async (req, res) => {
  try {
    const income = await Income.find({
      user: req.user._id,
    }).sort({
      date: -1,
    });

    res.status(200).json(income);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Update Income
// @route   PUT /api/income/:id
// @access  Private
const updateIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedIncome = await Income.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updatedIncome);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// @desc    Delete Income
// @route   DELETE /api/income/:id
// @access  Private
const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);

    if (!income) {
      return res.status(404).json({
        message: "Income not found",
      });
    }

    if (income.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await income.deleteOne();

    res.status(200).json({
      message: "Income deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createIncome,
  getIncome,
  updateIncome,
  deleteIncome,
};