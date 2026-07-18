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

const { protect } = require("../middleware/authMiddleware");

const validateRequest = require("../validators/validateRequest");

const {
  registerValidator,
  loginValidator,
} = require("../validators/authValidator");

// ================= PUBLIC ROUTES =================

router.post(
  "/register",
  registerValidator,
  validateRequest,
  registerUser
);

router.post(
  "/login",
  loginValidator,
  validateRequest,
  loginUser
);

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

// ================= PROTECTED ROUTES =================

router.put(
  "/change-password",
  protect,
  changePassword
);

module.exports = router;