// src/pages/Home.jsx

import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">🚀 Welcome to Mavericks Portal</h1>
      <p className="text-lg mb-10 text-center max-w-xl">
        This platform helps users track their learning progress and admins assign modules and monitor progress effectively.
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => navigate("/login")}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          User Login
        </button>

        <button
          onClick={() => navigate("/admin-login")}
          className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
        >
          Admin Login
        </button>
      </div>
    </div>
  );
}
