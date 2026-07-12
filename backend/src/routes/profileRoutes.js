const express = require("express");

const router = express.Router();

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Get Profile
router.get(
  "/",
  protect,
  getProfile
);

// Update Profile
router.put(
  "/",
  protect,
  updateProfile
);

module.exports = router;