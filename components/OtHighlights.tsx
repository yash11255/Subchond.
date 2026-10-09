"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function OtHighlights() {
  return (
    <section id="in-theatre" className="w-full bg-[#F7FAF9] py-14 md:py-20">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        {/* Operating Theatre & Action Photos of Dr. Manu Bora */}
        <div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                SURGICAL EXCELLENCE IN MOTION
              </p>
              <h3 className="font-serif-display text-2xl font-bold text-[#1B2B2A]">
                Dr. Manu Bora in the Operating Theatre
              </h3>
            </div>
            <a
              href="#ot-gallery"
              className="text-sm font-semibold text-[#0F766E] hover:text-[#C2410C] flex items-center gap-1 transition-colors"
            >
              View Full OT Surgical Gallery
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="m-carousel m-carousel-sm grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group">
              <Image
                src="/assets/ot/ot-01.webp"
                alt="Dr. Manu Bora setting up arthroscopic instruments in sterile OT"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <p className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                Sterile Setup
              </p>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group">
              <Image
                src="/assets/ot/ot-03.webp"
                alt="Dr. Manu Bora performing arthroscopic joint preservation"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <p className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                Keyhole Arthroscopy
              </p>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group">
              <Image
                src="/assets/ot/ot-07.webp"
                alt="Dr. Manu Bora guiding high-definition surgical cameras"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <p className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                Precision Navigation
              </p>
            </div>

            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-sm group">
              <Image
                src="/assets/ot/ot-05.webp"
                alt="Dr. Manu Bora reviewing joint anatomy during procedure"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
              <p className="absolute bottom-2.5 left-3 text-xs font-semibold text-white">
                Joint Bed Augmentation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
