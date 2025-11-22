import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUser, FaEnvelope, FaComment } from "react-icons/fa";
import ReviewCard from "./components/ReviewCard";
import confetti from "canvas-confetti";
import "./App.css";

function App() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({
    user_name: "",
    email: "",
    message: "",
    rating: 1,
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Load reviews
  const loadReviews = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/reviews");
      setReviews(res.data.reverse());
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();

    // Cursor glow effect
    const cursor = document.createElement("div");
    cursor.classList.add("cursor-glow");
    document.body.appendChild(cursor);

    const moveCursor = (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    window.addEventListener("mousemove", moveCursor);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.body.removeChild(cursor);
    };
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSubmitted(false);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/reviews", formData);
      setFormData({ user_name: "", email: "", message: "", rating: 1 });
      setSubmitted(true);
      loadReviews();

      // Confetti animation
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    } catch (err) {
      console.error(err);
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-purple-700 mb-2 animate-bounce">
          🌟 Feedback System
        </h1>
        <p className="text-gray-600 text-lg">Share your thoughts & help us improve!</p>
      </header>

      {/* Feedback Form */}
      <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-8 mb-12 hover:scale-105 transition-transform duration-500">
        <h2 className="text-2xl font-semibold text-purple-700 mb-6 text-center">
          Submit Your Feedback
        </h2>

        {submitted && (
          <p className="bg-green-100 text-green-800 p-3 rounded mb-4 text-center animate-pulse">
            Thank you for your feedback! 💜
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <FaUser className="absolute top-3 left-3 text-gray-400" />
            <input
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              placeholder="Your Name"
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              required
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              required
            />
          </div>

          <div className="relative">
            <FaComment className="absolute top-3 left-3 text-gray-400" />
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message"
              className="w-full pl-10 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
              required
            />
          </div>

          <input
            name="rating"
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300"
            placeholder="Rating (1-5)"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-500 text-white font-semibold p-3 rounded-lg hover:shadow-xl hover:scale-105 transition transform duration-300"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Reviews Section */}
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-purple-700 mb-6 text-center animate-pulse">
          Customer Feedback
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading reviews...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <ReviewCard key={r.id} review={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
