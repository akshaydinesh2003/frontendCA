import React, { useState } from "react";
import BASE_URL from "../config";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const userId = localStorage.getItem("user_id") || "guest-123";

  const handleUpload = async () => {
    if (!file) return alert("Please select a PDF");

    setLoading(true);
    setStatus("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", userId);

    try {
      const res = await fetch(`${BASE_URL}/process-pdf`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.status === "success") {
        setStatus("✅ PDF processed successfully!");
      } else {
        setStatus("❌ Failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Upload error:", err);
      setStatus("❌ Error uploading PDF");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 animate-fade-in text-center">
      <h1 className="text-xl md:text-2xl font-bold mb-6">Upload Current Affairs PDF</h1>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4 max-w-xs w-full"
      />

      <button
        onClick={handleUpload}
        className="w-full max-w-xs bg-blue-600 text-white px-6 py-2 rounded hover:scale-105 transition-transform disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="loader h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Uploading...
          </div>
        ) : (
          "Upload PDF"
        )}
      </button>

      {status && (
        <p className="mt-4 font-medium text-sm md:text-base text-gray-800">{status}</p>
      )}
    </div>
  );
}
