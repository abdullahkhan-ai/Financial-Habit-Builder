const { body } = require("express-validator");

const goalValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Goal title is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Goal title must be between 3 and 100 characters."
    ),

  body("targetAmount")
    .notEmpty()
    .withMessage("Target amount is required.")
    .isFloat({ min: 0.01 })
    .withMessage("Target amount must be greater than 0."),

  body("savedAmount")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("Saved amount cannot be negative."),

  body("category")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Category is too long."),

  body("targetDate")
    .notEmpty()
    .withMessage("Target date is required.")
    .isISO8601()
    .withMessage("Invalid target date."),

  body("notes")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Notes cannot exceed 500 characters."),
];

module.exports = {
  goalValidator,
};