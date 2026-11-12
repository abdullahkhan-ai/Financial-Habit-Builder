
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const compression = require("compression");

const connectDB = require("./config/db");

const {
  apiLimiter,
  authLimiter,
} = require("./middleware/rateLimiter");

const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();

const app = express();

// ================= ENV =================

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// ================= CORS CONFIGURATION =================

const allowedOrigins = [
  "http://localhost:5173",
  "https://financial-habit-builder.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.error("CORS blocked origin:", origin);

    return callback(new Error("Not allowed by CORS"));
  },

  credentials: true,

  methods: [
    "GET",
    "POST",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
  ],

  allowedHeaders: [
    "Content-Type",
    "Authorization",
  ],
};

// ================= START SERVER =================

const startServer = async () => {
  try {
    await connectDB();

    // ================= SECURITY =================

    app.disable("x-powered-by");

    // CORS must run before API routes and rate limiters
    app.use(cors(corsOptions));

    app.use(helmet());

    app.use(compression());

    // ================= LOGGER =================

    app.use(
      morgan(
        NODE_ENV === "production"
          ? "combined"
          : "dev"
      )
    );

    // ================= BODY PARSER =================

    app.use(express.json({ limit: "5mb" }));

    app.use(
      express.urlencoded({
        extended: true,
        limit: "5mb",
      })
    );

    // ================= RATE LIMITER =================

    app.use("/api", apiLimiter);

    // ================= ROUTES =================

    app.use(
      "/api/auth",
      authLimiter,
      require("./routes/authRoutes")
    );

    app.use(
      "/api/income",
      require("./routes/incomeRoutes")
    );

    app.use(
      "/api/expense",
      require("./routes/expenseRoutes")
    );

    app.use(
      "/api/dashboard",
      require("./routes/dashboardRoutes")
    );

    app.use(
      "/api/goals",
      require("./routes/goalRoutes")
    );

    app.use(
      "/api/analytics",
      require("./routes/analyticsRoutes")
    );

    app.use(
      "/api/habits",
      require("./routes/habitRoutes")
    );

    app.use(
      "/api/reminders",
      require("./routes/reminderRoutes")
    );

    app.use(
      "/api/profile",
      require("./routes/profileRoutes")
    );

    app.use(
      "/api/admin",
      require("./routes/adminRoutes")
    );

    app.use(
      "/api/feedback",
      require("./routes/feedbackRoutes")
    );

    // ================= ROOT =================

    app.get("/", (req, res) => {
      res.send(
        "Financial Habit Builder Backend Running"
      );
    });

    // ================= HEALTH =================

    app.get("/health", (req, res) => {
      res.status(200).json({
        success: true,
        status: "OK",
        environment: NODE_ENV,
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
      });
    });

    // ================= ERROR =================

    app.use(notFound);

    app.use(errorHandler);

    // ================= SERVER =================

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT} (${NODE_ENV})`
      );

      console.log("Allowed frontend origins:", allowedOrigins);
    });

  } catch (error) {
    console.error(
      "Server Startup Failed:",
      error
    );

    process.exit(1);
  }
};

startServer();