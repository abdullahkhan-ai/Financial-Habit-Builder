const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    // ================= MIDDLEWARE =================

    app.use(cors());
    app.use(helmet());

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // ================= AUTH =================

    app.use("/api/auth", require("./routes/authRoutes"));

    // ================= INCOME =================

    app.use("/api/income", require("./routes/incomeRoutes"));

    // ================= EXPENSE =================

    app.use("/api/expense", require("./routes/expenseRoutes"));

    // ================= DASHBOARD =================

    app.use("/api/dashboard", require("./routes/dashboardRoutes"));

    // ================= GOALS =================

    app.use("/api/goals", require("./routes/goalRoutes"));

    // ================= ANALYTICS =================

    app.use("/api/analytics", require("./routes/analyticsRoutes"));

    // ================= HABITS =================

    app.use("/api/habits", require("./routes/habitRoutes"));

    // ================= REMINDERS =================

    app.use("/api/reminders", require("./routes/reminderRoutes"));

    // ================= PROFILE =================

    app.use("/api/profile", require("./routes/profileRoutes"));

    // ================= ADMIN =================

    app.use("/api/admin", require("./routes/adminRoutes"));

    // ================= FEEDBACK =================

    app.use("/api/feedback", require("./routes/feedbackRoutes"));

    // ================= ROOT =================

    app.get("/", (req, res) => {
      res.send("Financial Habit Builder Backend Running 🚀");
    });

    // ================= SERVER =================

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("❌ Server Startup Failed:", error.message);
    process.exit(1);
  }
};

startServer();