"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

const otPhotos = [
  { id: "ot-01", src: "/assets/ot/ot-01.webp", title: "Sterile preparation at the knee" },
  { id: "ot-02", src: "/assets/ot/ot-02.webp", title: "Preparing the subchondral injection" },
  { id: "ot-03", src: "/assets/ot/ot-03.webp", title: "Prepared biological sample" },
  { id: "ot-04", src: "/assets/ot/ot-04.webp", title: "Operating theatre surgical team" },
  { id: "ot-05", src: "/assets/ot/ot-05.webp", title: "Autologous tissue preparation" },
  { id: "ot-06", src: "/assets/ot/ot-06.webp", title: "Imaging-assisted precision set-up" },
  { id: "ot-07", src: "/assets/ot/ot-07.webp", title: "Drawing up the targeted preparation" },
  { id: "ot-08", src: "/assets/ot/ot-08.webp", title: "Targeted subchondral delivery" },
  { id: "ot-09", src: "/assets/ot/ot-09.webp", title: "Minimally invasive procedure in progress" },
  { id: "ot-10", src: "/assets/ot/ot-10.webp", title: "Real-time imaging equipment in OT" },
  { id: "ot-11", src: "/assets/ot/ot-11.webp", title: "Aseptic sample processing" },
  { id: "ot-12", src: "/assets/ot/ot-12.webp", title: "Precision joint delivery" },
];

export default function OtGallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof otPhotos[0] | null>(null);

  return (
    <section id="ot-gallery" className="w-full bg-[#E8F1EF] text-[#1B2B2A] py-16 md:py-24 border-b border-[#0F766E]/15">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 space-y-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <SectionEyebrow text="03 / INSIDE THE OPERATING THEATRE" darkBg={false} />
            <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl uppercase font-bold text-[#1B2B2A]">
              Surgical <span className="text-[#0F766E]">Precision &amp; Setup</span>
            </h2>
            <p className="font-sans-clean text-base text-[#4B5F5D] max-w-xl">
              Photographs directly from our operating theatre. Demonstrating sterile preparation, imaging-assisted delivery, and surgical rigor.
            </p>
          </div>
          <div className="text-xs font-sans-clean font-bold uppercase tracking-widest text-[#0F766E] bg-white px-4 py-2 rounded-full border border-[#0F766E]/20 self-start md:self-auto">
            12 PROCEDURAL SNAPS
          </div>
        </div>

        {/* 12 Image Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {otPhotos.map((photo, idx) => (
            <motion.button
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="group relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-white shadow-sm border border-[#0F766E]/15 focus:outline-none focus:ring-2 focus:ring-[#0F766E]"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 16vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-2.5 flex flex-col justify-end text-left">
                <span className="text-[10px] font-sans-clean font-bold text-white/80 uppercase">
                  OT #{idx + 1}
                </span>
                <span className="text-xs font-sans-clean font-semibold text-white leading-tight line-clamp-2">
                  {photo.title}
                </span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Caption banner */}
        <div className="p-4 rounded-xl bg-white border border-[#0F766E]/15 flex items-center justify-between text-xs font-sans-clean text-[#4B5F5D]">
          <span>Illustrative photographs of the operating theatre environment. Individual procedure steps depend on patient requirements.</span>
          <span className="font-bold text-[#0F766E] uppercase hidden sm:inline">SUBCHOND™ OT PROTOCOL</span>
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm p-4 md:p-10 flex items-center justify-center cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-[#0F766E]/30"
            >
              <div className="relative aspect-[16/10] w-full bg-black">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="p-5 flex items-center justify-between bg-[#FAF8F5]">
                <div>
                  <h3 className="font-serif-display text-lg font-bold text-[#1B2B2A]">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs font-sans-clean text-[#4B5F5D]">
                    SUBCHOND™ Operating Theatre Facility • Dr. Manu Bora
                  </p>
                </div>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="px-4 py-2 bg-[#C2410C] hover:bg-[#EA580C] text-white text-xs font-bold uppercase rounded-lg transition-colors"
                >
                  CLOSE ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
