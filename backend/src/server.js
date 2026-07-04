const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();

    const app = express();

    // Middleware
    app.use(cors());
    app.use(express.json());

    // Routes
    app.use("/api/auth", require("./routes/authRoutes"));

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