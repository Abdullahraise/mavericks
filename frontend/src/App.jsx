import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./services/firebase";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Login from "./components/Login";
import Profile from "./components/Profile";
import ResumeUploader from "./components/ResumeUploader";
import ProgressStepper from "./components/ProgressStepper";
import LearningPathTable from "./components/LearningPathTable";
import Leaderboard from "./components/Leaderboard";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

import "./styles.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [weakSkills, setWeakSkills] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  if (!user) return <Login />;

  return (
    <Routes>
      {/* ✅ Normal User Dashboard */}
      <Route
        path="/"
        element={
          <div className="p-8 bg-gray-50 min-h-screen space-y-8">
            <h1 className="text-3xl font-bold text-center text-blue-700 mb-4">
              Mavericks Coding Platform 🚀
            </h1>

            {/* ✅ Admin Login Button */}
            <div className="text-center mb-4">
              <Link to="/admin-login">
                <button className="bg-black text-white px-4 py-2 rounded shadow hover:bg-gray-800 transition">
                  Admin Login
                </button>
              </Link>
            </div>

            <Profile user={user} />
            <ProgressStepper currentStep={2} />

            <ResumeUploader setWeakSkills={setWeakSkills} />
            {weakSkills.length > 0 && (
              <LearningPathTable weakSkills={weakSkills} />
            )}

            <Leaderboard />
          </div>
        }
      />

      {/* ✅ Admin Login Page */}
      <Route path="/admin-login" element={<AdminLogin />} />

      {/* ✅ Admin Dashboard */}
      <Route path="/admin-dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}
