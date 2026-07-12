const express = require("express");

const router = express.Router();

const {
  createFeedback,
  getMyFeedback,
  getAllFeedback,
  resolveFeedback,
  deleteFeedback,
} = require("../controllers/feedbackController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

// ================= USER =================

// Submit Feedback
router.post(
  "/",
  protect,
  createFeedback
);

// View Own Feedback
router.get(
  "/my",
  protect,
  getMyFeedback
);

// ================= ADMIN =================

// View All Feedback
router.get(
  "/admin",
  protect,
  adminOnly,
  getAllFeedback
);

// Mark Feedback as Resolved
router.patch(
  "/admin/:id/resolve",
  protect,
  adminOnly,
  resolveFeedback
);

// Delete Feedback
router.delete(
  "/admin/:id",
  protect,
  adminOnly,
  deleteFeedback
);

module.exports = router;