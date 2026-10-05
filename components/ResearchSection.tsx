"use client";

import React from "react";
import SectionEyebrow from "./SectionEyebrow";
import SecondaryLink from "./SecondaryLink";
import ResearchCard from "./ResearchCard";
import { RESEARCH_STUDIES } from "@/lib/data";

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="relative w-full bg-[#FAF8F5] text-[#0F172A] py-20 md:py-28 border-b border-[#0F172A]/10"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left Column: Headline & Links */}
        <div className="lg:col-span-5 space-y-6">
          <SectionEyebrow text="08 / THE SCIENCE" darkBg={false} />

          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#0F172A] uppercase tracking-tight leading-[0.92] font-bold">
            BEYOND <br />
            THE CLAIMS.
          </h2>

          <h3 className="text-sm md:text-base font-sans-clean font-bold uppercase tracking-[0.14em] text-[#991B1B]">
            WHAT DOES THE RESEARCH ACTUALLY SAY?
          </h3>

          <div className="space-y-3 pt-4 border-t border-[#141414]/15">
            <div>
              <SecondaryLink href="#evidence" darkBg={false}>
                EXPLORE THE EVIDENCE
              </SecondaryLink>
            </div>
            <div>
              <SecondaryLink href="#limitations" darkBg={false}>
                UNDERSTAND THE LIMITATIONS
              </SecondaryLink>
            </div>
          </div>
        </div>

        {/* Right Column: Research Cards */}
        <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_STUDIES.map((study) => (
            <ResearchCard key={study.id} study={study} />
          ))}
        </div>

      </div>
    </section>
  );
}
