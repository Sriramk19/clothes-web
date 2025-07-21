// components/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full p-10">
      <h2 className="text-3xl font-bold mb-4 text-red-600">
        404 - Page Not Found
      </h2>
      <p className="mb-6 text-gray-700">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button
        onClick={() => navigate("/")}
        className="px-4 py-2 bg-lime-800 text-white rounded hover:bg-lime-700 transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotFound;
