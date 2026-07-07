const express = require("express");

const router = express.Router();

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getUsers,
  deleteUser,
} = require("../controllers/adminController");

// Dashboard Statistics
router.get(
  "/dashboard",
  protect,
  adminOnly,
  getDashboardStats
);

// Get All Users
router.get(
  "/users",
  protect,
  adminOnly,
  getUsers
);

// Delete User
router.delete(
  "/users/:id",
  protect,
  adminOnly,
  deleteUser
);

module.exports = router;