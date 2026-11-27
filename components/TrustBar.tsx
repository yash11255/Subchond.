"use client";

import React from "react";
import { Award, ShieldCheck, MapPin, Stethoscope } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function TrustBar() {
  const reduceMotion = useReducedMotion();
  const TRUST_ITEMS = [
    {
      icon: Award,
      title: "MS Orthopaedics",
      subtitle: "Sports Medicine & Arthroscopy Specialist",
      tone: { background: "#E2F2ED", foreground: "#0F766E" },
    },
    {
      icon: ShieldCheck,
      title: "Joint Preservation Focus",
      subtitle: "Subchondral & Natural Knee Longevity",
      tone: { background: "#E5F0F7", foreground: "#245D7A" },
    },
    {
      icon: MapPin,
      title: "3 Major Clinical Centres",
      subtitle: "Gurugram · New Delhi · Mumbai",
      tone: { background: "#FFF0E4", foreground: "#A34218" },
    },
    {
      icon: Stethoscope,
      title: "Patient-Centered Care",
      subtitle: "Personalized Non-Surgical & Surgical Plans",
      tone: { background: "#EAF2E7", foreground: "#4B7256" },
    },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-[#E2F0EC] via-[#EFF5F0] to-[#E5EEF5] border-y border-[#0F766E]/15 py-6 md:py-8 font-sans-clean">
      <div className="max-md:!mx-0 max-w-[1440px] mx-auto px-6 md:px-12 m-carousel m-carousel-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        {TRUST_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={idx}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: reduceMotion ? 0 : idx * 0.08 }}
              className="trust-card flex items-center gap-4 p-4 bg-[#FFFFFF] rounded-xl border border-[#0F766E]/15 border-t-2 shadow-sm"
              style={{ borderTopColor: item.tone.foreground }}
            >
              <div className="p-3 rounded-lg shrink-0" style={{ backgroundColor: item.tone.background, color: item.tone.foreground }}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B2B2A]">
                  {item.title}
                </h4>
                <p className="text-xs font-medium text-[#4B5F5D]">
                  {item.subtitle}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
