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

    app.use("/api/auth", require("./routes/authRoutes"));
    app.use("/api/income", require("./routes/incomeRoutes"));
    app.use("/api/expense", require("./routes/expenseRoutes"));
    app.use("/api/dashboard", require("./routes/dashboardRoutes"));
    app.use("/api/goals", require("./routes/goalRoutes"));
    app.use("/api/analytics", require("./routes/analyticsRoutes"));
    app.use("/api/habits", require("./routes/habitRoutes"));
    app.use("/api/admin", require("./routes/adminRoutes"));

    app.get("/", (req, res) => {
      res.send("Financial Habit Builder Backend Running 🚀");
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server Startup Failed:", error.message);
  }
};

startServer();