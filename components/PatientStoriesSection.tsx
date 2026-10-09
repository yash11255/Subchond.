"use client";
import Carousel from "./Carousel";

import React from "react";
import { motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";
import { PATIENT_STORIES } from "@/lib/data";

export default function PatientStoriesSection() {
  return (
    <section
      id="stories"
      className="relative w-full bg-[#FAF8F5] text-[#1B2B2A] py-20 md:py-28 border-b border-[#0F766E]/15"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#0F766E]/15 pb-8">
          <div className="space-y-3">
            <SectionEyebrow text="FUNCTIONAL RECOVERY OUTCOMES" darkBg={false} />
            <h2 className="font-serif-display text-4xl sm:text-5xl text-[#1B2B2A] tracking-tight font-bold">
              Patient recovery stories
            </h2>
          </div>
          <p className="text-sm sm:text-base font-sans-clean text-[#4B5F5D] max-w-md font-medium leading-relaxed">
            Real functional restoration tracked through objective post-operative milestones and physical activity parameters.
          </p>
        </div>

        {/* Story Cards Grid with YouTube Thumbnails */}
        <Carousel label="Patient stories" autoPlayMs={6000} slideClass="basis-[88%] md:basis-1/2 lg:basis-1/3">
          {[
            {
              id: "wjfw3YFhbHI",
              title: "Can knee osteoarthritis be treated without surgery?",
              tag: "CLINICIAN EXPLAINER",
              desc: "Dr. Manu Bora evaluates a patient with knee pain in both knees and explains stem cell protocol options.",
              url: "https://www.youtube.com/watch?v=wjfw3YFhbHI",
              thumb: "https://img.youtube.com/vi/wjfw3YFhbHI/hqdefault.jpg",
            },
            {
              id: "jaYP5nJBGQU",
              title: "Knee osteoarthritis pain: treatment options without surgery",
              tag: "PATIENT STORY",
              desc: "A 51-year-old patient describes knee pain that limited walking and standing, and her experience post-treatment.",
              url: "https://www.youtube.com/watch?v=jaYP5nJBGQU",
              thumb: "https://img.youtube.com/vi/jaYP5nJBGQU/hqdefault.jpg",
            },
            {
              id: "KcqdCPABNF0",
              title: "Knee pain reduced without surgery: a patient's journey",
              tag: "PATIENT RECOVERY",
              desc: "A patient with early osteoarthritis after ACL injury describes her consultation, treatment, and functional recovery.",
              url: "https://www.youtube.com/watch?v=KcqdCPABNF0",
              thumb: "https://img.youtube.com/vi/KcqdCPABNF0/hqdefault.jpg",
            },
          ].map((video, idx) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="h-full bg-[#FFFFFF] border border-[#0F766E]/20 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[16/9] w-full bg-black overflow-hidden"
                >
                  {/* YouTube Thumbnail Image */}
                  <img
                    src={video.thumb}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-[#C2410C] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      ▶
                    </div>
                  </div>
                </a>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-sans-clean uppercase font-bold tracking-wider text-[#0F766E] bg-[#E8F1EF] px-2.5 py-1 rounded inline-block">
                    {video.tag}
                  </span>
                  <h3 className="font-serif-display text-lg font-bold text-[#1B2B2A] leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-xs font-sans-clean text-[#4B5F5D] leading-relaxed">
                    {video.desc}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-sans-clean font-bold uppercase tracking-wider text-[#C2410C] hover:text-[#EA580C]"
                >
                  WATCH VIDEO STORY ↗
                </a>
              </div>
            </motion.div>
          ))}
        </Carousel>

      </div>
    </section>
  );
}
