const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    app.use(cors());

    app.use(express.json());

    // ================= AUTH =================

    app.use(
      "/api/auth",
      require("./routes/authRoutes")
    );

    // ================= INCOME =================

    app.use(
      "/api/income",
      require("./routes/incomeRoutes")
    );

    // ================= EXPENSE =================

    app.use(
      "/api/expense",
      require("./routes/expenseRoutes")
    );

    // ================= DASHBOARD =================

    app.use(
      "/api/dashboard",
      require("./routes/dashboardRoutes")
    );

    // ================= GOALS =================

    app.use(
      "/api/goals",
      require("./routes/goalRoutes")
    );

    // ================= ANALYTICS =================

    app.use(
      "/api/analytics",
      require("./routes/analyticsRoutes")
    );

    // ================= HABITS =================

    app.use(
      "/api/habits",
      require("./routes/habitRoutes")
    );

    // ================= PROFILE =================

    app.use(
      "/api/profile",
      require("./routes/profileRoutes")
    );

    // ================= ADMIN =================

    app.use(
      "/api/admin",
      require("./routes/adminRoutes")
    );

    // ================= FEEDBACK =================

    app.use(
      "/api/feedback",
      require("./routes/feedbackRoutes")
    );

    // ================= ROOT =================

    app.get("/", (req, res) => {
      res.send(
        "Financial Habit Builder Backend Running 🚀"
      );
    });

    const PORT =
      process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

  } catch (error) {
    console.error(
      "Server Startup Failed:",
      error.message
    );
  }
};

startServer();