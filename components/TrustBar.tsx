"use client";

import React from "react";
import { Award, ShieldCheck, MapPin, Activity, Stethoscope } from "lucide-react";

export default function TrustBar() {
  const TRUST_ITEMS = [
    {
      icon: Award,
      title: "MS Orthopaedics & Fellowship",
      subtitle: "Sports Medicine & Arthroscopy Specialist",
    },
    {
      icon: ShieldCheck,
      title: "Joint Preservation Focus",
      subtitle: "Subchondral & Natural Knee Longevity",
    },
    {
      icon: MapPin,
      title: "3 Major Clinical Centres",
      subtitle: "Gurugram · New Delhi · Mumbai",
    },
    {
      icon: Stethoscope,
      title: "Patient-Centered Care",
      subtitle: "Personalized Non-Surgical & Surgical Plans",
    },
  ];

  return (
    <div className="w-full bg-[#E8F1EF] border-y border-[#0F766E]/15 py-6 md:py-8 font-sans-clean">
      <div className="max-md:!mx-0 max-w-[1440px] mx-auto px-6 md:px-12 m-carousel m-carousel-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center">
        {TRUST_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="flex items-center gap-4 p-4 bg-[#FFFFFF] rounded-xl border border-[#0F766E]/15 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="p-3 bg-[#E8F1EF] rounded-lg text-[#0F766E] shrink-0">
                <Icon className="w-6 h-6 text-[#0F766E]" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1B2B2A]">
                  {item.title}
                </h4>
                <p className="text-xs font-medium text-[#4B5F5D]">
                  {item.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
