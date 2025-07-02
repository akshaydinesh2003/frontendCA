import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HistoryPage() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("user_id") || "guest-123";

  const fetchSummaries = () => {
    fetch(`http://127.0.0.1:5000/summaries/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setSummaries(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch summaries:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSummaries();
  }, []);

  const handleDelete = async (docId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this summary?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://127.0.0.1:5000/summary/${userId}/${docId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.status === "deleted") {
        setSummaries(summaries.filter((item) => item.id !== docId));
      }
    } catch (err) {
      console.error("Failed to delete summary:", err);
    }
  };

  if (loading) return <p className="p-6 text-gray-600 animate-fade-in">Loading summaries...</p>;

  return (
    <div className="p-4 md:p-6 animate-fade-in">
      <h1 className="text-xl md:text-2xl font-bold mb-4">📂 My Uploaded Summaries</h1>

      {summaries.length === 0 ? (
        <p className="text-gray-600">No summaries found yet.</p>
      ) : (
        <ul className="space-y-4">
          {summaries.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded bg-white shadow transform transition hover:scale-[1.01] w-full sm:max-w-2xl mx-auto flex flex-col sm:flex-row sm:justify-between sm:items-center"
            >
              <div className="mb-2 sm:mb-0">
                <p className="text-gray-600 text-sm">
                  Uploaded on: {item.created_at?.seconds ? new Date(item.created_at.seconds * 1000).toLocaleString() : "Unknown"}
                </p>
                <Link
                  to={`/summary/${item.id}`}
                  className="text-blue-600 underline hover:text-blue-800 transition-colors"
                >
                  View Summary ➜
                </Link>
              </div>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-100 text-red-600 px-3 py-1 rounded hover:bg-red-200 text-sm mt-2 sm:mt-0"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
