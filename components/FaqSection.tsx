"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, MessageSquare } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";

export interface FaqItem {
  question: string;
  answer: string;
  category: "General" | "Imaging" | "Treatment" | "Recovery";
}

export const FAQS: FaqItem[] = [
  {
    category: "General",
    question: "Do I need a total knee replacement, or can my natural joint be preserved?",
    answer:
      "Not every patient with severe knee pain requires knee replacement. If joint space narrowing is moderate and pain originates from subchondral bone marrow lesions (BMLs) or localized cartilage wear, joint preservation procedures can target the subchondral bone to relieve pain and safeguard your natural joint biology.",
  },
  {
    category: "Imaging",
    question: "Why are standing X-rays ordered before an MRI scan?",
    answer:
      "Weight-bearing X-rays show how your knee joint space clears under full body weight. Standing radiographs evaluate mechanical alignment (varus or valgus angles) and true joint space narrowing. An MRI is ordered when detailed soft tissue findings (cartilage thickness, bone marrow edema, meniscus integrity) will change your specific treatment strategy.",
  },
  {
    category: "Treatment",
    question: "What is Subchondral Joint Preservation?",
    answer:
      "Subchondral Joint Preservation is a specialized procedure pioneered by Dr. Manu Bora that targets the living subchondral bone plate and bone marrow lesions directly beneath cartilage. By repairing micro-trabecular stress zones and bone edema, pain is relieved while preserving 100% of your natural bone and joint cartilage.",
  },
  {
    category: "Recovery",
    question: "How long is the recovery timeline after joint preservation or arthroscopy?",
    answer:
      "Because joint preservation procedures are ultra-minimally invasive, patients typically use protected weight-bearing for 2 to 3 weeks followed by structured rehabilitation. Most patients return to full daily activities within 6 to 12 weeks, compared to 3-6 months for traditional total knee replacement.",
  },
  {
    category: "General",
    question: "How can I obtain a second opinion on my MRI or recommended surgery with Dr. Manu Bora?",
    answer:
      "You can submit your MRI reports and standing X-rays directly through our online evaluation portal or WhatsApp diagnostic feature. Dr. Bora's clinical team reviews your scans and symptoms to evaluate whether joint preservation or minimally invasive care is clinically indicated.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="relative w-full bg-[#FAF8F5] text-[#1B2B2A] py-20 md:py-32 border-b border-[#0F766E]/15"
    >
      <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Heading */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          <SectionEyebrow text="10 / PATIENT EDUCATION & FAQS" darkBg={false} />

          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight leading-[0.95] text-[#1B2B2A] font-bold">
            Frequently Asked Questions.
          </h2>

          <p className="text-base sm:text-lg font-sans-clean font-medium text-[#4B5F5D] leading-relaxed">
            Clear, transparent answers to help you understand your knee condition, diagnostic options, and joint preservation pathways.
          </p>

          <div className="p-6 bg-[#E8F1EF] rounded-xl border border-[#0F766E]/20 space-y-3">
            <div className="flex items-center gap-2 text-[#0F766E] font-bold text-sm">
              <HelpCircle className="w-5 h-5 text-[#0F766E]" />
              <span>HAVE A SPECIFIC QUESTION?</span>
            </div>
            <p className="text-xs sm:text-sm text-[#4B5F5D] font-medium leading-relaxed">
              Our clinical team is available to evaluate your MRI scan or answer questions regarding your knee treatment options.
            </p>
            <a
              href="#assess"
              className="inline-block text-xs font-sans-clean uppercase font-bold tracking-wider text-[#C2410C] hover:underline pt-1"
            >
              REQUEST AN EVALUATION &rarr;
            </a>
          </div>
        </div>

        {/* Right Column: Accordion */}
        <div className="lg:col-span-7 space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`border rounded-xl transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#FFFFFF] border-[#0F766E] shadow-md"
                    : "bg-[#FFFFFF]/80 border-[#0F766E]/15 hover:border-[#0F766E]/30"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-sans-clean uppercase font-bold tracking-wider text-[#0F766E]">
                      {faq.category}
                    </span>
                    <h3 className="text-base sm:text-lg font-sans-clean font-bold text-[#1B2B2A] leading-snug">
                      {faq.question}
                    </h3>
                  </div>
                  <div
                    className={`p-2 rounded-full transition-transform duration-300 shrink-0 ${
                      isOpen ? "bg-[#0F766E] text-white rotate-180" : "bg-[#E8F1EF] text-[#0F766E]"
                    }`}
                  >
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base font-sans-clean text-[#4B5F5D] leading-relaxed border-t border-[#0F766E]/10 font-medium">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
