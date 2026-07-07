const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createHabit,
  getHabits,
  updateHabit,
  completeHabit,
  deleteHabit,
} = require("../controllers/habitController");

router
  .route("/")
  .get(protect, getHabits)
  .post(protect, createHabit);

router
  .route("/:id")
  .put(protect, updateHabit)
  .delete(protect, deleteHabit);

router.patch(
  "/:id/complete",
  protect,
  completeHabit
);

module.exports = router;