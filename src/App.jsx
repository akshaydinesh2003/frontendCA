import React from "react";
import { Routes, Route, useLocation, Navigate, Link } from "react-router-dom";
import UploadPage from "./pages/UploadPage";
import SummaryPage from "./pages/SummaryPage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import Chatbot from "./components/Chatbot";
import Sidebar from "./components/Sidebar";
import UserDropdown from "./components/UserDropdown";

function ProtectedRoute({ children }) {
  const uid = localStorage.getItem("user_id");
  return uid ? children : <Navigate to="/login" replace />;
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 animate-fade-in">
      
      {/* ✅ Responsive Sidebar & Navbar */}
      {location.pathname !== "/login" && (
        <>
          <Sidebar />
          <nav className="hidden sm:flex justify-between items-center px-6 py-4 bg-white shadow">
            <div className="flex gap-6 text-blue-600 font-medium">
              <Link to="/">Upload</Link>
              <Link to="/my-summaries">My Summaries</Link>
            </div>
            <UserDropdown />
          </nav>
        </>
      )}

      {/* ✅ Routes */}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <UploadPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-summaries"
          element={
            <ProtectedRoute>
              <HistoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/summary/:docId"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Chatbot />
    </div>
  );
}
