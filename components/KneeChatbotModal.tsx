"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const PRESET_PROMPTS = [
  "What is Subchondral Joint Preservation?",
  "ACL Repair vs Total Knee Replacement?",
  "How to submit my MRI scan?",
  "Book a second opinion with Dr. Bora",
];

const BOT_RESPONSES: Record<string, string> = {
  "What is Subchondral Joint Preservation?":
    "Subchondral Joint Preservation is a specialized clinical approach pioneered by Dr. Manu Bora. It targets the bone marrow lesions and subchondral bone directly beneath joint cartilage to prevent premature knee replacement and preserve natural joint longevity.",
  "ACL Repair vs Total Knee Replacement?":
    "Treatment depends on whether pain originates from ligament damage, cartilage wear, or subchondral bone stress. Dr. Bora utilizes weight-bearing X-rays and 3T MRI mapping to assess whether joint preservation or minimally invasive arthroscopy can save the knee without total replacement.",
  "How to submit my MRI scan?":
    "You can submit your MRI reports and X-rays directly via our WhatsApp evaluation modal (button on bottom-left) or email us at info@drmanubora.com for a preliminary clinical review.",
  "Book a second opinion with Dr. Bora":
    "Dr. Manu Bora conducts second-opinion consultations at his centres in Gurugram, New Delhi, and Mumbai. Click 'ASSESS MY KNEE' in the navigation bar to schedule an evaluation.",
};

export default function KneeChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "init",
      sender: "bot",
      text: "Hello! I am Dr. Manu Bora's AI Knee Assistant. How can I help you understand knee symptoms, MRI reports, or joint preservation today?",
      timestamp: "Just now",
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");

    // Simulate bot response
    setTimeout(() => {
      let reply =
        BOT_RESPONSES[query] ||
        "Dr. Bora's approach focuses on identifying the root cause of knee pain—whether subchondral bone edema, cartilage fibrillation, or ligament instability. Would you like to share your MRI scan via WhatsApp for a personalized evaluation?";

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 600);
  };

  return (
    <>
      {/* Floating Launcher Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Knee AI Assistant"
        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-[#7C2020] hover:bg-[#962828] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 font-sans-clean border border-white/20"
      >
        <Sparkles className="w-5 h-5 text-white" />
        <span className="text-xs font-semibold uppercase tracking-wider hidden sm:inline-block">
          AI Knee Assistant
        </span>
      </button>

      {/* Floating Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-20 right-6 z-50 w-[90vw] sm:w-[380px] h-[520px] bg-[#FFFFFF] border border-[#0F766E]/30 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-[#1B2B2A] font-sans-clean"
          >
            {/* Header */}
            <div className="bg-[#0F766E] p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#FFFFFF]/20 flex items-center justify-center border border-white/30">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                    Dr. Bora AI Assistant
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-emerald-200 uppercase tracking-wider font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Online &bull; Clinical Guide</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs bg-[#F7FAF9]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${
                    msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${
                      msg.sender === "user" ? "bg-[#C2410C] text-white" : "bg-[#0F766E] text-white"
                    }`}
                  >
                    {msg.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div
                    className={`max-w-[78%] p-3 rounded-xl leading-relaxed text-xs font-medium ${
                      msg.sender === "user"
                        ? "bg-[#C2410C] text-white rounded-tr-none"
                        : "bg-[#E8F1EF] text-[#1B2B2A] border border-[#0F766E]/15 rounded-tl-none"
                    }`}
                  >
                    <p>{msg.text}</p>
                    <span className="text-[8px] opacity-70 block text-right mt-1 font-bold">
                      {msg.timestamp}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2 border-t border-[#0F766E]/15 bg-[#FAF8F5] overflow-x-auto flex gap-2 no-scrollbar">
              {PRESET_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => handleSendMessage(prompt)}
                  className="text-[10px] uppercase font-bold tracking-wider bg-[#E8F1EF] hover:bg-[#0F766E] hover:text-white text-[#0F766E] border border-[#0F766E]/20 px-3 py-1.5 rounded-full shrink-0 transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Input Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 bg-[#FFFFFF] border-t border-[#0F766E]/15 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about knee pain or MRI..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-[#F7FAF9] border border-[#0F766E]/25 rounded-full px-4 py-2 text-xs font-medium text-[#1B2B2A] placeholder-[#4B5F5D]/60 focus:outline-none focus:border-[#0F766E]"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="bg-[#0F766E] hover:bg-[#115E59] p-2.5 rounded-full text-white transition-colors shadow-md"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
