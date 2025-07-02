import React, { useState } from "react";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const userName = localStorage.getItem("user_name") || "Guest";

  return (
    <div className="relative hidden sm:block">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 rounded text-blue-700 hover:bg-blue-50 transition"
      >
        {userName} ⌄
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg w-40 text-sm z-50">
          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
