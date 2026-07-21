const { body } = require("express-validator");

const habitValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Habit title is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Habit title must be between 3 and 100 characters"),

  body("frequency")
    .trim()
    .notEmpty()
    .withMessage("Frequency is required")
    .isIn(["Daily", "Weekly", "Monthly"])
    .withMessage("Frequency must be Daily, Weekly or Monthly"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),
];

module.exports = {
  habitValidator,
};