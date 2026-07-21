const { body } = require("express-validator");

const goalValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Goal title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Goal title must be between 3 and 100 characters"),

  body("targetAmount")
    .notEmpty()
    .withMessage("Target amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Target amount must be greater than 0"),

  body("deadline")
    .notEmpty()
    .withMessage("Deadline is required")
    .isISO8601()
    .withMessage("Invalid deadline"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),
];

const addSavingsValidator = [
  body("amount")
    .notEmpty()
    .withMessage("Savings amount is required")
    .isFloat({ gt: 0 })
    .withMessage("Savings amount must be greater than 0"),
];

module.exports = {
  goalValidator,
  addSavingsValidator,
};