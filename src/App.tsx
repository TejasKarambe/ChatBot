import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import useChatBot from "./hooks/useChatbot";
import { LuBot } from "react-icons/lu";
import { FiCopy } from "react-icons/fi";

function App() {
  const [input, setInput] = useState("");
  const { messages, sendMessage } = useChatBot();

  const handleSend = () => {
    if (input.trim() === "") return;
    sendMessage(input);
    setInput("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md rounded-2xl shadow-lg border border-gray-200 flex flex-col h-[600px]">

        {/* Header - sticky */}
        <div className="bg-blue-200 text-gray-800 text-lg font-semibold p-4 rounded-t-2xl flex items-center justify-center gap-2 sticky top-0 z-10">
          <LuBot />
          React + OpenAI Chatbot
        </div>

        {/* Chat Area - scrollable */}
        <div className="flex-1 p-4 overflow-y-auto bg-white flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 p-3 rounded-lg max-w-[80%] relative group ${msg.sender === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-200 text-gray-800 self-start"
                }`}
            >
              {msg.text}

              {/* Copy button only for bot */}
              {msg.sender === "bot" && (
                <button
                  onClick={() => navigator.clipboard.writeText(msg.text)}
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-300"
                  title="Copy"
                >
                  <FiCopy size={16} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Input Area - sticky bottom */}
        <div className="flex items-center gap-2 border-t p-3 sticky bottom-0 bg-white">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={handleSend}
            className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white"
          >
            <IoMdSend />
          </button>
        </div>
      </div>
    </div>

  );
}

export default App;
