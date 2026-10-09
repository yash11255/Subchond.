"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Physiotherapy: a seated knee-extension exercise, the shin swinging about the knee. */
export function PhysioIllustration() {
  const reduce = !!useReducedMotion();
  return (
    <div className="relative grid h-full w-full place-items-center bg-gradient-to-br from-[#E0F2FE] to-[#EEF6F4]">
      <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Animated knee strengthening exercise">
        <rect x="40" y="150" width="120" height="14" rx="7" fill="#94A3B8" />
        <rect x="52" y="164" width="10" height="56" fill="#94A3B8" />
        <rect x="138" y="164" width="10" height="56" fill="#94A3B8" />
        {/* torso + head */}
        <path d="M78 150 L88 70" stroke="#2F6F8F" strokeWidth="22" strokeLinecap="round" />
        <circle cx="92" cy="44" r="18" fill="#C68B59" />
        {/* thigh */}
        <path d="M80 140 L170 140" stroke="#1E3A5F" strokeWidth="22" strokeLinecap="round" />
        {/* knee joint glow */}
        <motion.circle cx="170" cy="140" r="16" fill="#14B8A6" animate={reduce ? { opacity: 0.3 } : { opacity: [0.15, 0.5, 0.15], r: [14, 20, 14] }} transition={{ duration: 2.4, repeat: Infinity }} />
        {/* shin rotating around knee */}
        <motion.g
          style={{ transformOrigin: "170px 140px" }}
          animate={reduce ? { rotate: 0 } : { rotate: [0, -70, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M170 140 L170 215" stroke="#1E3A5F" strokeWidth="20" strokeLinecap="round" />
          <path d="M170 215 L196 215" stroke="#C68B59" strokeWidth="12" strokeLinecap="round" />
          <rect x="158" y="196" width="24" height="12" rx="4" fill="#C2410C" />
        </motion.g>
        <circle cx="170" cy="140" r="9" fill="#F8FAFC" stroke="#1E3A5F" strokeWidth="3" />
      </svg>
      <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#2F6F8F] shadow-sm">
        Guided strengthening
      </span>
    </div>
  );
}

/** Nutrition: a thali-style bowl with ingredients gently floating above it. */
export function NutritionIllustration() {
  const reduce = !!useReducedMotion();
  const items = [
    { x: 110, c: "#16A34A", r: 12, d: 0 },
    { x: 150, c: "#F59E0B", r: 10, d: 0.5 },
    { x: 190, c: "#DC2626", r: 11, d: 1 },
    { x: 225, c: "#84CC16", r: 9, d: 1.5 },
  ];
  return (
    <div className="relative grid h-full w-full place-items-center bg-gradient-to-br from-[#FFF1E6] to-[#FFF8EE]">
      <svg viewBox="0 0 320 240" className="h-full w-full" role="img" aria-label="Animated nutrition illustration">
        {items.map((it) => (
          <motion.circle
            key={it.x}
            cx={it.x}
            cy={110}
            r={it.r}
            fill={it.c}
            animate={reduce ? {} : { cy: [118, 80, 118] }}
            transition={{ duration: 3, delay: it.d, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
        <motion.path
          d="M140 70 C150 50 170 50 175 35"
          stroke="#16A34A"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          animate={reduce ? {} : { pathLength: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <path d="M70 130 H250 C250 185 210 205 160 205 C110 205 70 185 70 130 Z" fill="#C2410C" />
        <path d="M70 130 H250" stroke="#9A3412" strokeWidth="6" strokeLinecap="round" />
        <path d="M95 150 C130 165 190 165 225 150" stroke="#FDBA74" strokeWidth="4" fill="none" opacity="0.6" />
      </svg>
      <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#C2410C] shadow-sm">
        Recovery nutrition
      </span>
    </div>
  );
}
