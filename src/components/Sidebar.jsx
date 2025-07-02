import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const userName = localStorage.getItem("user_name") || "Guest";

  return (
    <div className="sm:hidden fixed top-4 left-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className="bg-blue-600 text-white px-3 py-2 rounded shadow"
      >
        ☰
      </button>

      {open && (
        <div className="absolute top-12 left-0 w-48 bg-white border rounded shadow-lg flex flex-col text-sm">
          <Link to="/" className="px-4 py-2 hover:bg-blue-50">📤 Upload</Link>
          <Link to="/my-summaries" className="px-4 py-2 hover:bg-blue-50">📂 My Summaries</Link>
          <div className="border-t mt-2" />
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="text-left px-4 py-2 text-red-500 hover:bg-red-50"
          >
            Logout ({userName})
          </button>
        </div>
      )}
    </div>
  );
}
