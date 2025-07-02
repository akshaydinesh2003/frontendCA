import React, { useState } from "react";
import BASE_URL from "../config";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages([...messages, { from: "user", text: userMsg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: data.reply || "❌ No response." },
      ]);
    } catch (err) {
      console.error("❌ Chat error:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "❌ Error talking to server." },
      ]);
    }

    setLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="w-full h-full sm:w-80 sm:h-[32rem] bg-white shadow-xl border rounded-lg flex flex-col animate-slide-up fixed sm:relative bottom-0 right-0 sm:bottom-4 sm:right-4 z-50">
          <div className="bg-blue-600 text-white p-3 flex justify-between items-center rounded-t-lg">
            <span className="font-semibold">Ask CA Bot</span>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chatbot">
              ✖
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`${
                  msg.from === "user"
                    ? "text-right text-gray-800"
                    : "text-left text-blue-700"
                }`}
              >
                <p className="inline-block px-3 py-1 rounded bg-gray-100 max-w-xs break-words">
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-2 border-t flex gap-2 items-center">
            <input
              className="flex-1 border rounded px-2 py-1 text-sm"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
              disabled={loading}
              aria-label="Chatbot input"
            />
            <button
              onClick={handleSend}
              className="text-blue-600 font-bold px-2 text-lg"
              aria-label="Send"
            >
              {loading ? "..." : "➤"}
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow hover:scale-105 transition sm:fixed bottom-4 right-4"
          onClick={() => setIsOpen(true)}
          aria-label="Open Chatbot"
        >
          💬 Ask CA Bot
        </button>
      )}
    </div>
  );
}
