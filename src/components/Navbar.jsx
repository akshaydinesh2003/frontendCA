// components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow p-4 flex gap-6 text-blue-600 font-medium">
      <Link to="/">Upload</Link>
      <Link to="/my-summaries">My Summaries</Link>
    </nav>
  );
}

import LoginButton from "../components/LoginButton";

{!localStorage.getItem("user_id") ? (
  <LoginButton />
) : (
  <p className="text-sm text-gray-600">Logged in as {localStorage.getItem("user_name")}</p>
)}
