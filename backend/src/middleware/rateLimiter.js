const rateLimit = require("express-rate-limit");

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Max 200 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many requests. Please try again after 15 minutes.",
  },
});

// Strict limiter for authentication
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10, // Max 10 login/register attempts
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many authentication attempts. Please try again later.",
  },
});

module.exports = {
  apiLimiter,
  authLimiter,
};