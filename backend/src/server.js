const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

console.log(process.env.MONGO_URI);

connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("Financial Habit Builder Backend Running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});