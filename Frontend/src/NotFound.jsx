// src/pages/NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
