import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SummaryPage() {
  const { docId } = useParams();
  const userId = localStorage.getItem("user_id") || "guest-123";
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/summary/${userId}/${docId}`)
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, [docId]);

  if (!data) return <p className="p-6 animate-fade-in">Loading summary...</p>;

  return (
    <div className="p-4 md:p-6 space-y-6 animate-slide-up">
      <h1 className="text-xl md:text-2xl font-bold text-green-700">📝 Summary</h1>
      <ul className="list-disc pl-6 text-gray-800 animate-fade-in space-y-1">
        {data.summary.map((pt, i) => <li key={i}>{pt}</li>)}
      </ul>

      <h2 className="text-lg md:text-xl font-bold text-blue-700">❓ MCQs</h2>
      <ul className="space-y-4 animate-fade-in">
        {data.mcqs.map((q, i) => (
          <li key={i} className="p-4 border bg-white rounded max-w-full sm:max-w-2xl">
            <p className="font-medium mb-1">{q.question}</p>
            <ul className="pl-4 list-disc space-y-1">
              {q.options.map((opt, idx) => (
                <li key={idx}>{opt}</li>
              ))}
            </ul>
            <p className="text-green-600 font-semibold mt-2">✅ {q.answer}</p>
          </li>
        ))}
      </ul>

      <h2 className="text-lg md:text-xl font-bold text-indigo-700">📘 GK Points</h2>
      <ul className="list-disc pl-6 text-gray-700 animate-fade-in space-y-1">
        {data.gk_points.map((pt, i) => <li key={i}>{pt}</li>)}
      </ul>
    </div>
  );
}
