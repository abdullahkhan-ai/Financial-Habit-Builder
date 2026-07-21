const express = require("express");

const router = express.Router();

const {
  getProfile,
  updateProfile,
} = require("../controllers/profileController");

const {
  protect,
} = require("../middleware/authMiddleware");

const validateRequest = require("../validators/validateRequest");

const {
  profileValidator,
} = require("../validators/profileValidator");

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
  profileValidator,
  validateRequest,
  updateProfile
);

module.exports = router;