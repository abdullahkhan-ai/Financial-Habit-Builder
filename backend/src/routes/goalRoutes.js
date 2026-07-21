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

const validateRequest = require("../validators/validateRequest");

const {
  goalValidator,
  addSavingsValidator,
} = require("../validators/goalValidator");

router
  .route("/")
  .get(protect, getGoals)
  .post(
    protect,
    goalValidator,
    validateRequest,
    createGoal
  );

router
  .route("/:id")
  .put(
    protect,
    goalValidator,
    validateRequest,
    updateGoal
  )
  .delete(
    protect,
    deleteGoal
  );

router.patch(
  "/:id/add-savings",
  protect,
  addSavingsValidator,
  validateRequest,
  addSavings
);

module.exports = router;