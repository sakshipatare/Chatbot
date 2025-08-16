// src/components/Home/Chatbot/Chatbot.jsx
import React, { useState } from "react";
import axios from "axios";

const apiUrl = "http://localhost:4000/chatbot"; // change if hosted elsewhere

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [filename, setFilename] = useState("");
  const [messages, setMessages] = useState([]); // store chat history
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("all"); // "all" or "single"

  const handleAsk = async () => {
    if (!question && mode === "all") {
      alert("Please enter a question.");
      return;
    }
    if (mode === "single" && !filename) {
      alert("Please enter a filename.");
      return;
    }

    // Add user message
    setMessages((prev) => [...prev, { sender: "user", text: question }]);

    try {
      setLoading(true);

      let endpoint = `${apiUrl}/ask-all`;
      let payload = { question };

      if (mode === "single") {
        endpoint = `${apiUrl}/ask`;
        payload = { filename, question };
      }

      const res = await axios.post(endpoint, payload);

      let answer =
        res.data.answer ||
        res.data.content ||
        "No answer found. Try again with another question.";

      // Add bot response
      setMessages((prev) => [...prev, { sender: "bot", text: answer }]);
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Something went wrong. Try again." },
      ]);
    } finally {
      setLoading(false);
      setQuestion("");
    }
  };

  // Function to render text + images
  const renderMessage = (msg) => {
    // Regex to find URLs ending with common image extensions
    const parts = msg.text.split(/\s+/);
    return parts.map((part, idx) => {
      if (/\.(jpg|jpeg|png|gif|webp)$/i.test(part)) {
        return (
          <img
            key={idx}
            src={part}
            alt="chat-img"
            className="rounded-lg mt-2 max-w-[150px] border"
          />
        );
      }
      return <span key={idx} className="mr-1">{part}</span>;
    });
  };

  return (
    <div className="flex flex-col h-[80vh] max-w-md mx-auto border rounded-xl shadow-lg bg-gray-100 mt-8">
      {/* Header */}
      <div className="bg-blue-600 text-white p-3 rounded-t-xl font-semibold text-lg">
        Chatbot Assistant
      </div>

      {/* Chat Window */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-2 rounded-2xl max-w-[70%] text-sm shadow break-words ${
                msg.sender === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {renderMessage(msg)}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="px-4 py-2 rounded-2xl bg-gray-300 text-gray-700 text-sm animate-pulse">
              Typing...
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-3 bg-white border-t">
        {/* Mode Toggle */}
        <div className="flex items-center space-x-4 mb-2">
          <label className="flex items-center text-sm">
            <input
              type="radio"
              value="all"
              checked={mode === "all"}
              onChange={() => setMode("all")}
              className="mr-1"
            />
            All Docs
          </label>
          <label className="flex items-center text-sm">
            <input
              type="radio"
              value="single"
              checked={mode === "single"}
              onChange={() => setMode("single")}
              className="mr-1"
            />
            One Doc
          </label>
        </div>

        {mode === "single" && (
          <input
            type="text"
            placeholder="Enter filename (with .docx)"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
            className="border p-2 mb-2 w-full rounded-lg text-sm"
          />
        )}

        {/* Input + Button */}
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="flex-1 border p-2 rounded-lg text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          />
          <button
            onClick={handleAsk}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
