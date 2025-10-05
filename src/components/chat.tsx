"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Message = {
  id: number;
  type: "sent" | "received";
  text: string;
  timestamp: string;
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, type: "received", text: "Hello", timestamp: "12:40 PM" },
    { id: 2, type: "sent", text: "Hi", timestamp: "12:41 PM" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const handleSend = () => {
    if (!newMessage.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "sent",
        text: newMessage,
        timestamp: getCurrentTime(),
      },
    ]);
    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full">
      {/* Chat Container */}
      <div className="flex flex-col w-full max-w-3xl h-[calc(100vh-2rem)] bg-white overflow-hidden">
        {/* Header */}
        <div className="flex flex-row gap-2 border-b border-gray-200 items-center h-[70px] px-4">
          <Image
            width={48}
            height={48}
            src="/images/image.png"
            alt="Receiver profile picture"
            className="w-12 h-12 rounded-full object-cover"
          />
          <h1 className="text-xl font-semibold">Receiver name</h1>
        </div>

        {/* Messages Area */}
        <div
          className="flex-1 w-full px-4 py-2 overflow-y-auto"
          role="log"
          aria-live="polite"
        >
          <div className="flex flex-col gap-4 mt-2">
            {messages.map((msg) =>
              msg.type === "received" ? (
                <div key={msg.id} className="flex flex-row gap-2 items-end">
                  <div className="flex flex-col items-start max-w-xs break-words">
                    <div className="bg-gray-200 text-gray-900 rounded-lg px-3 py-2">
                      {msg.text}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  key={msg.id}
                  className="flex flex-row gap-2 items-end justify-end"
                >
                  <div className="flex flex-col items-end max-w-xs break-words">
                    <div className="bg-blue-500 text-white rounded-lg px-3 py-2">
                      {msg.text}
                    </div>
                    <span className="text-xs text-gray-400 mt-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              )
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex flex-row items-center border-t border-gray-200 px-2 gap-2 h-[70px]">
          <input
            type="text"
            aria-label="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-gray-100 h-[52px] rounded-lg px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Type a message"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            aria-label="Send message"
            className="bg-orange-500 text-white w-[100px] h-[52px] shadow-md rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
