import { useState, useRef, useEffect } from "react";

export default function StrategicAdvisor() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I am your Strategic Advisor. Based on the current data, revenue is projected to grow. How can I help you optimize your operations today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    setMessages([
      ...messages,
      { id: Date.now(), sender: "user", text: inputValue },
    ]);
    setInputValue("");
  };

  return (
    <div className="bg-[#1F2937] rounded-xl border border-[#7F92BB]/30 shadow-xl flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#7F92BB]/20 bg-[#1F2937] z-10 relative">
        <h2 className="text-xl font-bold text-white tracking-wide">
          Strategic Advisor
        </h2>
      </div>

      <div className="flex-1 relative min-h-[300px]">
        <div className="absolute inset-0 p-6 overflow-y-auto space-y-4 scroll-smooth">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-[#8B5CF6] text-white rounded-tr-none shadow-md"
                    : "bg-[#374151] text-slate-200 border border-[#7F92BB]/20 rounded-tl-none shadow-sm"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} className="h-1" />
        </div>
      </div>

      {/* Input Area */}
      <div className="p-5 border-t border-[#7F92BB]/20 bg-[#1F2937] relative z-10">
        <div className="relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder="Ask anything..."
            className="w-full bg-[#374151] border border-[#7F92BB]/30 rounded-xl py-3.5 pl-4 pr-14 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#8B5CF6] transition-colors"
          />
          <button
            onClick={handleSend}
            className="absolute right-2 p-2 bg-[#8B5CF6] hover:bg-[#7C3AED] text-white rounded-lg transition-colors active:scale-95"
          >
            <svg
              className="w-4 h-4 transform rotate-45"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
