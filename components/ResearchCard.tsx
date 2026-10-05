"use client";

import React from "react";
import { motion } from "framer-motion";
import { ResearchStudy } from "@/lib/data";

interface ResearchCardProps {
  study: ResearchStudy;
}

export default function ResearchCard({ study }: ResearchCardProps) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (study.percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7 }}
      className="bg-[#FFFFFF] border border-[#0F766E]/20 p-6 md:p-8 rounded-2xl space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
    >
      {/* Card Header */}
      <div className="space-y-1 border-b border-[#0F766E]/15 pb-4">
        <span className="text-xs font-sans-clean font-bold uppercase tracking-[0.18em] text-[#0F766E]">
          {study.studyNumber}
        </span>
        <h3 className="font-sans-clean text-base md:text-lg font-bold text-[#1B2B2A] leading-snug">
          {study.title}
        </h3>
      </div>

      {/* Grid: Study Specs & Circular Visual Gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Specs Table */}
        <div className="sm:col-span-7 space-y-3 text-xs font-sans-clean">
          <div>
            <span className="text-[#4B5F5D] block uppercase text-[10px] tracking-wider font-bold">
              Population
            </span>
            <span className="text-[#1B2B2A] font-bold">{study.population}</span>
          </div>
          <div>
            <span className="text-[#4B5F5D] block uppercase text-[10px] tracking-wider font-bold">
              Treatment
            </span>
            <span className="text-[#1B2B2A] font-bold">{study.treatment}</span>
          </div>
          <div>
            <span className="text-[#4B5F5D] block uppercase text-[10px] tracking-wider font-bold">
              Follow-up
            </span>
            <span className="text-[#1B2B2A] font-bold">{study.followUp}</span>
          </div>
          <div>
            <span className="text-[#4B5F5D] block uppercase text-[10px] tracking-wider font-bold">
              Outcome
            </span>
            <span className="text-[#C2410C] font-bold uppercase">{study.outcomeText}</span>
          </div>
        </div>

        {/* Circular Animated SVG Gauge */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center p-3 bg-[#E8F1EF] rounded-xl border border-[#0F766E]/20">
          <div className="relative w-24 h-24 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 90 90">
              {/* Background Ring */}
              <circle
                cx="45"
                cy="45"
                r={radius}
                fill="none"
                stroke="rgba(15, 118, 110, 0.15)"
                strokeWidth="6"
              />
              {/* Animated Progress Ring */}
              <motion.circle
                cx="45"
                cy="45"
                r={radius}
                fill="none"
                stroke="#0F766E"
                strokeWidth="6"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="font-serif-display text-xl md:text-2xl font-bold text-[#1B2B2A] leading-none">
                {study.percentage}%
              </span>
              <span className="text-[8px] font-sans-clean uppercase tracking-wider text-[#0F766E] font-bold">
                {study.percentageLabel}
              </span>
            </div>
          </div>

          {/* Demographic Icon Row */}
          <div className="mt-3 flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                className="w-3.5 h-3.5 text-[#0F766E]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            ))}
          </div>
          <span className="text-[9px] font-sans-clean tracking-wider text-[#4B5F5D] font-bold mt-1">
            {study.numerator} / {study.denominator}
          </span>
        </div>
      </div>

      {/* Card Footer Link */}
      <div className="pt-2 border-t border-[#0F766E]/15">
        <a
          href={study.link}
          className="inline-flex items-center gap-2 text-xs font-sans-clean font-bold uppercase tracking-[0.14em] text-[#0F766E] hover:text-[#C2410C] transition-colors group"
        >
          <span>VIEW FULL STUDY DATA</span>
          <span className="transform transition-transform group-hover:translate-x-1">&rarr;</span>
        </a>
      </div>
    </motion.div>
  );
}
