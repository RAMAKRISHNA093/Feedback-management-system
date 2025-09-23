const express = require("express");
const router = express.Router();

// GET all reviews
router.get("/", (req, res) => {
  const query = "SELECT * FROM reviews";
  req.db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

// POST new review
router.post("/", (req, res) => {
  const { user_name, email, message, rating } = req.body;
  const query =
    "INSERT INTO reviews (user_name, email, message, rating) VALUES (?, ?, ?, ?)";
  req.db.query(query, [user_name, email, message, rating], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Review added", id: results.insertId });
  });
});

module.exports = router;
