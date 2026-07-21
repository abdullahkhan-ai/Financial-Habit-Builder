const express = require("express");
const router = express.Router();

const {
  createExpense,
  getExpense,
  updateExpense,
  deleteExpense,
} = require("../controllers/expenseController");

const { protect } = require("../middleware/authMiddleware");

const validateRequest = require("../validators/validateRequest");

const {
  expenseValidator,
} = require("../validators/expenseValidator");

router
  .route("/")
  .get(protect, getExpense)
  .post(
    protect,
    expenseValidator,
    validateRequest,
    createExpense
  );

router
  .route("/:id")
  .put(
    protect,
    expenseValidator,
    validateRequest,
    updateExpense
  )
  .delete(
    protect,
    deleteExpense
  );

module.exports = router;