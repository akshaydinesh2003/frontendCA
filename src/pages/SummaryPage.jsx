import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BASE_URL from "../config";

export default function SummaryPage() {
  const { docId } = useParams();
  const navigate = useNavigate();
  const userId = localStorage.getItem("user_id");

  const [data, setData] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }

    fetch(`${BASE_URL}/summary/${userId}/${docId}`)
      .then((res) => res.json())
      .then(setData)
      .catch((err) => {
        console.error("❌ Failed to fetch summary:", err);
      });
  }, [docId, userId, navigate]);

  if (!data)
    return <p className="p-6 animate-fade-in text-gray-600">Loading summary...</p>;

  return (
    <div className="p-4 md:p-6 space-y-6 animate-slide-up max-w-4xl mx-auto">
      <h1 className="text-xl md:text-2xl font-bold text-green-700">📝 Summary</h1>
      <ul className="list-disc pl-6 text-gray-800 space-y-1">
        {data.summary?.map((pt, i) => (
          <li key={i}>{pt}</li>
        ))}
      </ul>

      <h2 className="text-lg md:text-xl font-bold text-blue-700">❓ MCQs</h2>
      <ul className="space-y-4">
        {data.mcqs?.map((q, i) => (
          <li key={i} className="p-4 border bg-white rounded shadow">
            <p className="font-medium mb-1">{q.question}</p>
            <ul className="pl-4 list-disc space-y-1">
              {q.options?.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
            <p className="text-green-600 font-semibold mt-2">✅ {q.answer}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-lg md:text-xl font-bold text-indigo-700">📘 GK Points</h2>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        {data.gk_points?.map((pt, i) => (
          <li key={i}>{pt}</li>
        ))}
      </ul>
    </div>
  );
}
