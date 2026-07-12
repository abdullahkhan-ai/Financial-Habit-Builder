const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

router.post(
  "/forgot-password",
  forgotPassword
);

router.post(
  "/verify-otp",
  verifyOTP
);

router.post(
  "/reset-password",
  resetPassword
);

// Protected Routes
router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;