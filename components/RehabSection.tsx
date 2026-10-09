"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";
import PrimaryButton from "./PrimaryButton";

export default function RehabSection() {
  return (
    <section
      id="assess"
      className="relative w-full bg-[#FFF8EE] text-[#1B2B2A] py-24 md:py-32 overflow-hidden border-b border-[#0F766E]/15"
    >
      {/* Background radial highlight */}
      <div className="absolute right-1/2 bottom-0 w-[500px] h-[500px] bg-[#E8F1EF]/80 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 relative z-10">
        
        <div className="lg:col-span-8 space-y-6">
          <SectionEyebrow text="KNEE ASSESSMENT & REHABILITATION" darkBg={false} />

          <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl text-[#1B2B2A] tracking-tight leading-[1.05] font-bold">
            Ready to look <br />
            <span className="text-[#0F766E]">beyond the surface?</span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl font-sans-clean font-medium text-[#4B5F5D] max-w-xl leading-relaxed">
            Schedule a comprehensive orthopaedic evaluation with Dr. Manu Bora.
            Review your MRI scans, biomechanical alignment, and subchondral joint health.
          </p>
        </div>

        <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center space-y-4">
          <PrimaryButton href="https://drmanubora.com/contact" className="w-full sm:w-auto text-center">
            ASSESS MY KNEE NOW
          </PrimaryButton>

          <span className="text-xs sm:text-sm font-sans-clean uppercase tracking-[0.16em] text-[#C2410C] font-bold">
            SECOND OPINION &amp; MRI REVIEW AVAILABLE
          </span>
        </div>

      </div>
    </section>
  );
}
