"use client";

import React from "react";
import Image from "next/image";
import { ClinicalStepData } from "@/lib/data";

interface ClinicalStepProps {
  step: ClinicalStepData;
  isActive: boolean;
  onClick: () => void;
}

export default function ClinicalStep({
  step,
  isActive,
  onClick,
}: ClinicalStepProps) {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center group cursor-pointer transition-all duration-500"
    >
      {/* Circle Image Wrapper */}
      <div
        className={`relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border transition-all duration-500 flex items-center justify-center ${
          isActive
            ? "border-[#7C2020] ring-4 ring-[#7C2020]/30 scale-105 shadow-[0_0_25px_rgba(124,32,32,0.4)]"
            : "border-white/20 opacity-40 hover:opacity-80 scale-95"
        }`}
      >
        <Image
          src={step.image}
          alt={step.title}
          fill
          className="object-cover filter brightness-105 contrast-110"
          sizes="120px"
        />
        {/* Subtle radial inner shadow */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/50 pointer-events-none" />
      </div>

      {/* Step Number & Title */}
      <div className="mt-3 text-center space-y-0.5">
        <span className="text-[10px] font-sans-clean font-medium tracking-widest text-[#7C2020] block">
          {step.stepNumber}
        </span>
        <h4
          className={`text-xs md:text-sm font-sans-clean font-semibold uppercase tracking-wider transition-colors duration-300 ${
            isActive ? "text-white" : "text-[#A8A39A]"
          }`}
        >
          {step.title}
        </h4>
      </div>
    </div>
  );
}
