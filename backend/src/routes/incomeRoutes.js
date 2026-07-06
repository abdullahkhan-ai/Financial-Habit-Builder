const express = require("express");
const router = express.Router();

const {
  createIncome,
  getIncome,
  updateIncome,
  deleteIncome,
} = require("../controllers/incomeController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getIncome)
  .post(protect, createIncome);

router
  .route("/:id")
  .put(protect, updateIncome)
  .delete(protect, deleteIncome);

module.exports = router;