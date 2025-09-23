const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  author: String,
  text: String,
  rating: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);