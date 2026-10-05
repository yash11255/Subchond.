import React from "react";

interface SectionEyebrowProps {
  text: string;
  className?: string;
  darkBg?: boolean;
}

export default function SectionEyebrow({
  text,
  className = "",
  darkBg = true,
}: SectionEyebrowProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-xs md:text-sm font-sans-clean font-bold uppercase tracking-[0.18em] ${
        darkBg ? "text-[#0F766E]" : "text-[#0F766E]"
      } ${className}`}
    >
      <span className={`w-2.5 h-2.5 rounded-full ${darkBg ? "bg-[#0F766E]" : "bg-[#0F766E]"}`} />
      <span>{text}</span>
    </div>
  );
}
