const express = require("express");
const router = express.Router();

const {
  createGoal,
  getGoals,
  updateGoal,
  addSavings,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router
  .route("/")
  .get(protect, getGoals)
  .post(protect, createGoal);

router
  .route("/:id")
  .put(protect, updateGoal)
  .delete(protect, deleteGoal);

router.patch("/:id/add-savings", protect, addSavings);

module.exports = router;