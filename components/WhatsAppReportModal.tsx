"use client";

import React, { useState } from "react";
import { MessageCircle, X, Upload, Send, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function WhatsAppReportModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [hasReport, setHasReport] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hello Dr. Manu Bora's Team,%0A%0AMy Name: ${encodeURIComponent(
      name
    )}%0APhone: ${encodeURIComponent(phone)}%0AKnee Symptoms/Condition: ${encodeURIComponent(
      symptoms
    )}%0AMRI Scan Available: ${hasReport ? "Yes" : "No"}%0A%0AI would like a preliminary evaluation of my knee condition/MRI scan.`;

    const whatsappUrl = `https://wa.me/919999999999?text=${text}`;
    window.open(whatsappUrl, "_blank");
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Action Button (Bottom Left) */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Share MRI Scan on WhatsApp"
        className="fixed bottom-6 left-6 z-40 flex items-center gap-3 bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 font-sans-clean font-bold text-xs sm:text-sm border-2 border-white/40"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        <span className="uppercase tracking-wider">
          Send MRI on WhatsApp
        </span>
      </button>

      {/* WhatsApp Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="bg-[#FFFFFF] border border-[#0F766E]/30 text-[#1B2B2A] w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl relative space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-5 right-5 text-[#4B5F5D] hover:text-[#1B2B2A] transition-colors p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Header */}
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 text-xs font-sans-clean uppercase tracking-[0.14em] text-[#0F766E] font-bold bg-[#E8F1EF] px-3 py-1 rounded-full border border-[#0F766E]/30">
                  <MessageCircle className="w-4 h-4 text-[#0F766E]" />
                  WHATSAPP MRI EVALUATION
                </div>
                <h3 className="font-serif-display text-2xl sm:text-3xl text-[#1B2B2A] uppercase font-bold leading-tight">
                  Send Your MRI &amp; Scans
                </h3>
                <p className="text-xs sm:text-sm font-sans-clean text-[#4B5F5D] leading-relaxed font-medium">
                  Share your MRI report or knee X-ray directly with Dr. Manu Bora&apos;s surgical team for a preliminary evaluation.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 font-sans-clean text-xs sm:text-sm font-medium">
                <div>
                  <label className="block uppercase tracking-wider text-[#1B2B2A] mb-1 font-bold text-xs">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F7FAF9] border border-[#0F766E]/25 rounded-lg px-4 py-3 text-[#1B2B2A] placeholder-[#4B5F5D]/60 focus:outline-none focus:border-[#0F766E] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#A8A39A] mb-1 font-medium text-[10px]">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#080B0D] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#25D366] transition-colors"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#A8A39A] mb-1 font-medium text-[10px]">
                    Knee Pain / Symptoms (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Inner knee pain for 6 months, difficulty climbing stairs"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="w-full bg-[#080B0D] border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#25D366] transition-colors resize-none"
                  />
                </div>

                {/* MRI File Upload checkbox toggle */}
                <div
                  onClick={() => setHasReport(!hasReport)}
                  className={`flex items-center justify-between p-3.5 border rounded-lg cursor-pointer transition-all ${
                    hasReport
                      ? "border-[#25D366] bg-[#25D366]/10 text-white"
                      : "border-white/20 bg-[#080B0D] text-[#A8A39A]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Upload className="w-4 h-4 text-[#25D366]" />
                    <span className="text-xs font-medium">I have MRI / X-Ray scans ready to send</span>
                  </div>
                  {hasReport && <CheckCircle2 className="w-4 h-4 text-[#25D366]" />}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold uppercase tracking-[0.16em] py-3.5 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg mt-2"
                >
                  <span>CONNECT ON WHATSAPP</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
