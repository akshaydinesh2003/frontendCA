// components/LoginButton.jsx
import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

export default function LoginButton() {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      localStorage.setItem("user_id", user.uid);
      localStorage.setItem("user_name", user.displayName);
      localStorage.setItem("user_email", user.email);
      window.location.href = "/"; // Redirect to home after login
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="bg-blue-600 text-white px-6 py-2 rounded hover:scale-105 transition-transform"
    >
      Sign in with Google
    </button>
  );
}
