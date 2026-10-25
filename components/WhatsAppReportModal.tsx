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
      {/* Floating Action Button (Bottom Left) — compact WhatsApp logo, label from md up */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Send MRI on WhatsApp"
        title="Send MRI on WhatsApp"
        className="fixed bottom-5 left-4 sm:left-6 z-40 flex h-14 items-center gap-2 rounded-full bg-[#25D366] px-3.5 text-white shadow-2xl border-2 border-white/50 transition-all duration-300 hover:scale-105 hover:bg-[#20bd5a] md:px-4 font-sans-clean font-bold text-xs"
      >
        <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" fill="currentColor" aria-hidden>
          <path d="M16.04 3C8.86 3 3.03 8.82 3.03 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.96 12.96 0 0 0 16.04 29C23.2 29 29 23.18 29 16S23.2 3 16.04 3Zm0 23.6c-1.98 0-3.92-.53-5.61-1.53l-.4-.24-3.97 1.04 1.06-3.86-.26-.4A10.56 10.56 0 0 1 5.4 16c0-5.86 4.77-10.62 10.64-10.62 5.86 0 10.6 4.76 10.6 10.62 0 5.86-4.75 10.6-10.6 10.6Zm5.82-7.94c-.32-.16-1.88-.93-2.17-1.03-.3-.11-.5-.16-.72.16-.21.32-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.21-.18-.32-.02-.5.14-.65.15-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.3.31-1.12 1.09-1.12 2.66s1.15 3.09 1.3 3.3c.17.21 2.25 3.44 5.46 4.82.76.33 1.36.53 1.82.68.77.24 1.46.2 2.01.12.61-.09 1.88-.77 2.15-1.51.26-.74.26-1.38.18-1.51-.08-.13-.29-.21-.61-.37Z"/>
        </svg>
        <span className="hidden md:inline uppercase tracking-wider">WhatsApp</span>
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
