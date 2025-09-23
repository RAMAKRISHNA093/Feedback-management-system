const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
require("dotenv").config();

const reviewRoutes = require("./routes/reviews");

const app = express();
app.use(cors());
app.use(express.json());

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
    return;
  }
  console.log("✅ Connected to MySQL database!");
});

// Health check route
app.get("/health", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) {
      console.error("❌ DB not connected:", err);
      return res.status(500).send("DB not connected");
    }
    res.send("✅ DB Connected and Backend Running");
  });
});

// Attach db to req in middleware for reviews routes
app.use("/api/reviews", (req, res, next) => {
  req.db = db;
  next();
}, reviewRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Backend is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
