require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

// Enable CORS for frontend
app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "9392525988",
  database: process.env.DB_NAME || "reviewdb",
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL database!");
});

// Health check route
app.get("/health", (req, res) => {
  db.query("SELECT 1", (err) => {
    if (err) return res.status(500).send("DB not connected");
    res.send("✅ DB Connected and Backend Running");
  });
});

// ✅ Submit feedback (fixed column name)
app.post("/api/reviews", (req, res) => {
  const { name, email, message, rating } = req.body;
  if (!name || !email || !message || !rating) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql = "INSERT INTO reviews (user_name, email, message, rating) VALUES (?, ?, ?, ?)";
  db.query(sql, [name, email, message, rating], (err, result) => {
    if (err) {
      console.error("❌ Error inserting feedback:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json({ message: "Feedback submitted successfully!" });
  });
});

// ✅ Fetch all feedback
app.get("/api/reviews", (req, res) => {
  const sql = "SELECT * FROM reviews ORDER BY id DESC";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Error fetching reviews:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.json(results);
  });
});

// Root
app.get("/", (req, res) => res.send("Backend is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
