// pages/LoginPage.jsx
import React, { useEffect } from "react";
import LoginButton from "../components/LoginButton";

export default function LoginPage() {
  useEffect(() => {
  const uid = localStorage.getItem("user_id");
  if (uid) {
    window.location.href = "/";
  }
}, []);


  return (
    <div className="h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-2xl font-bold mb-4">Please sign in to continue</h1>
      <LoginButton />
    </div>
  );
}
