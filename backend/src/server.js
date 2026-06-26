const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.post("/api/auth/login", (req, res) => {
  console.log(req.body);
  res.json({ success: true });
});

app.post("/test", (req, res) => {
  res.json({
    success: true,
    message: "Test route working",
  });
});
app.listen(5000, () => {
  console.log("Server running");
});