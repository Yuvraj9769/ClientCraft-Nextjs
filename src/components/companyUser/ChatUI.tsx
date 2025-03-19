/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import CompanyUserLayout from "./CompanyUserLayout";

interface Message {
  text: string;
  sender: "user" | "bot";
}

const ChatUI = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const res = await axios.post("/api/companyUser/chat", {
        prompt: input,
      });

      console.log(res.data);

      const botMessage: Message = { text: res.data.data, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send message");
    } finally {
      setLoading(false);
    }

    setInput("");
  };

  return (
    <CompanyUserLayout>
      <div className="w-full inline-flex items-center justify-center p-2">
        <div className="p-4 border rounded-lg w-full md:w-1/2 flex flex-col dark:bg-slate-900 bg-slate-50 my-4 items-center justify-center gap-4">
          <h2 className="text-xl font-bold text-black dark:text-slate-50 my-2">
            AI Assistant
          </h2>
          <div className="h-[300px] overflow-y-auto border rounded-md w-full p-2 dark:bg-slate-800 bg-slate-50 flex flex-col gap-2">
            {messages.map((msg, index) => (
              <p
                key={index}
                className={`text-black dark:text-slate-50 w-1/2 box-border p-2 ${
                  msg.sender === "user"
                    ? "text-right self-end"
                    : "text-left self-start"
                }`}
              >
                <strong>{msg.sender === "user" ? "You: " : "AI: "}</strong>{" "}
                {msg.text}
              </p>
            ))}
            {loading && (
              <p className="text-black dark:text-slate-50">AI is thinking...</p>
            )}
          </div>
          <div className="flex mt-2 items-center justify-center w-full gap-3">
            <input
              type="text"
              className="border p-2 flex-1 rounded-md"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-600"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </CompanyUserLayout>
  );
};

export default ChatUI;
