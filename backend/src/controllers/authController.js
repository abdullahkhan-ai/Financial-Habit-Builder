const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const crypto = require("crypto");

const generateToken = require("../utils/generateToken");
const sendEmail = require("../utils/sendEmail");

// =========================
// Register User
// =========================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const existingUser = await User.findOne({
      email,
    }).select("_id");

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Register Error:", error);

    return res.status(500).json({
      message: "Registration failed.",
    });
  }
};

// =========================
// Login User
// =========================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

    const user = await User.findOne({
      email,
    }).select(
      "_id name email role password"
    );

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Login failed.",
    });
  }
};

// =========================
// Change Password
// =========================

const changePassword = async (req, res) => {
  try {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = req.body;

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      return res.status(400).json({
        message: "Please fill all fields.",
      });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        message:
          "Password must be at least 6 characters.",
      });
    }

    const user = await User.findById(
      req.user._id
    ).select("password");

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message:
          "Current password is incorrect.",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    return res.status(200).json({
      message:
        "Password updated successfully.",
    });
  } catch (error) {
    console.error(
      "Change Password Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to update password.",
    });
  }
};

// =========================
// Forgot Password
// =========================

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    }

    const user = await User.findOne({
      email,
    });
        if (!user) {
      return res.status(404).json({
        message: "No account found with this email.",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    user.resetOTP = hashedOTP;
    user.resetOTPExpire =
      Date.now() + 10 * 60 * 1000;
    user.resetVerified = false;

    await user.save();

    const html = `
      <div style="font-family:Arial,sans-serif;padding:30px">
        <h2>FinHabit Password Reset</h2>

        <p>Your One-Time Password (OTP) is:</p>

        <h1 style="letter-spacing:8px;">${otp}</h1>

        <p>This OTP is valid for <strong>10 minutes</strong>.</p>

        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `;

    await sendEmail(
      user.email,
      "FinHabit Password Reset",
      html
    );

    return res.status(200).json({
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.error(
      "Forgot Password Error:",
      error
    );

    return res.status(500).json({
      message: "Failed to send OTP.",
    });
  }
};

// =========================
// Verify OTP
// =========================

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        message: "Email and OTP are required.",
      });
    }

    const user = await User.findOne({
      email,
    }).select(
      "resetOTP resetOTPExpire resetVerified"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const hashedOTP = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");

    if (
      user.resetOTP !== hashedOTP ||
      user.resetOTPExpire < Date.now()
    ) {
      return res.status(400).json({
        message: "Invalid or expired OTP.",
      });
    }

    user.resetVerified = true;

    await user.save();

    return res.status(200).json({
      message: "OTP verified successfully.",
    });
  } catch (error) {
    console.error(
      "Verify OTP Error:",
      error
    );

    return res.status(500).json({
      message: "OTP verification failed.",
    });
  }
};

// =========================
// Reset Password
// =========================

const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message:
          "Email and password are required.",
      });
    }

    const user = await User.findOne({
      email,
    }).select(
      "password resetOTP resetOTPExpire resetVerified"
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (!user.resetVerified) {
      return res.status(400).json({
        message:
          "Please verify your OTP first.",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    user.resetOTP = null;
    user.resetOTPExpire = null;
    user.resetVerified = false;

    await user.save();

    return res.status(200).json({
      message:
        "Password reset successfully.",
    });
  } catch (error) {
    console.error(
      "Reset Password Error:",
      error
    );

    return res.status(500).json({
      message:
        "Password reset failed.",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  changePassword,
  forgotPassword,
  verifyOTP,
  resetPassword,
};