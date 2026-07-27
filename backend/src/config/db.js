const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(
      process.env.MONGO_URI,
      {
        maxPoolSize: 20,
        minPoolSize: 5,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      }
    );

    console.log(
      `✅ MongoDB Connected: ${conn.connection.host}`
    );

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Error:", err);
    });

    mongoose.connection.on(
      "disconnected",
      () => {
        console.warn(
          "⚠️ MongoDB Disconnected"
        );
      }
    );

    mongoose.connection.on(
      "reconnected",
      () => {
        console.log(
          "✅ MongoDB Reconnected"
        );
      }
    );
  } catch (error) {
    console.error(
      "❌ MongoDB Connection Failed:",
      error
    );

    process.exit(1);
  }
};

module.exports = connectDB;