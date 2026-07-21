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

const validateRequest = require("../validators/validateRequest");

const {
  habitValidator,
} = require("../validators/habitValidator");

router
  .route("/")
  .get(protect, getHabits)
  .post(
    protect,
    habitValidator,
    validateRequest,
    createHabit
  );

router
  .route("/:id")
  .put(
    protect,
    habitValidator,
    validateRequest,
    updateHabit
  )
  .delete(
    protect,
    deleteHabit
  );

router.patch(
  "/:id/complete",
  protect,
  completeHabit
);

module.exports = router;