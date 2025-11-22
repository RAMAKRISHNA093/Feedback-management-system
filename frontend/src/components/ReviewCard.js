import React from "react";

function ReviewCard({ review }) {
  const { user_name, email, message, rating } = review;
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-500 cursor-pointer animate-fadeIn">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-bold text-xl text-purple-700">{user_name}</h3>
        <span
          className={`font-semibold px-3 py-1 rounded-full ${
            rating >= 4
              ? "bg-green-200 text-green-800"
              : rating === 3
              ? "bg-yellow-200 text-yellow-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {rating} ⭐
        </span>
      </div>
      <p className="text-gray-700 mb-2">{message}</p>
      <p className="text-gray-400 text-sm">{email}</p>
    </div>
  );
}

export default ReviewCard;
