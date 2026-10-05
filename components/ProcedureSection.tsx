"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Play } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";

interface ProcedureVideo {
  id: string;
  stage: string;
  title: string;
  tags: [string, string];
  duration: string;
  poster: string;
  youtubeId?: string;
}

const PROCEDURE_VIDEOS: ProcedureVideo[] = [
  {
    id: "before",
    stage: "Before",
    title: "Understanding the problem & imaging",
    tags: ["Orthopaedic", "MRI scan"],
    duration: "02:18",
    poster: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    youtubeId: "jCRPcKirJyw",
  },
  {
    id: "during",
    stage: "During",
    title: "How the precision treatment is performed",
    tags: ["Orthopaedic", "Procedure"],
    duration: "04:32",
    poster: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80",
    youtubeId: "IXA1DOaJk7w",
  },
  {
    id: "after",
    stage: "After",
    title: "Rehabilitation and return to active life",
    tags: ["Rehabilitation", "Recovery"],
    duration: "03:06",
    poster: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80",
    youtubeId: "PE63cvSYcFQ",
  },
];

const PROCEDURE_STILLS = [
  { label: "Sterile preparation at the knee", image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&w=600&q=80" },
  { label: "Preparing the injection", image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=600&q=80" },
  { label: "Prepared sample", image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80" },
  { label: "Operating theatre team", image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=600&q=80" },
  { label: "Sample preparation", image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=600&q=80" },
  { label: "Imaging-assisted set-up", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80" },
];

const PATIENT_VOICES: { quote: string; attribution?: string }[] = [
  { quote: "Practical, professional, insightful care and recovery.", attribution: "Verified Patient" },
  { quote: "Understanding the whole joint pathology made all the difference in my recovery.", attribution: "Sports Medicine Patient" },
];

export default function ProcedureSection() {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [voiceIndex, setVoiceIndex] = useState(0);

  const voice = PATIENT_VOICES[voiceIndex];
  const step = (dir: 1 | -1) =>
    setVoiceIndex((i) => (i + dir + PATIENT_VOICES.length) % PATIENT_VOICES.length);

  return (
    <section id="procedure-watch" className="relative w-full border-t border-b border-[#0F766E]/15 bg-[#E8F1EF] text-[#1B2B2A]">
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px]">
        {/* ------------------------------ Light panel ------------------------------ */}
        <div className="bg-[#FAF8F5] text-[#1B2B2A]">
          <div className="max-w-[1240px] mx-auto px-6 md:px-12 py-14 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
            {/* Intro */}
            <div className="lg:col-span-3 space-y-5">
              <SectionEyebrow text="07 / THE PROCEDURE" darkBg={false} />
              <h2 className="font-serif-display text-4xl sm:text-5xl uppercase tracking-tight leading-[0.95] font-bold text-[#1B2B2A]">
                Watch the procedure
              </h2>
              <p className="text-sm font-sans-clean font-medium text-[#4B5F5D] leading-relaxed max-w-xs">
                See how the treatment is performed, from pre-operation to recovery.
              </p>
              <a
                href="#assess"
                className="group inline-flex items-center gap-3 bg-[#C2410C] text-white px-5 py-3 text-xs font-sans-clean font-bold uppercase tracking-[0.14em] rounded-lg transition-colors duration-300 hover:bg-[#EA580C] shadow-md"
              >
                Request Consultation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>

            {/* Video cards */}
            <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {PROCEDURE_VIDEOS.map((v, i) => {
                const isPlaying = playingId === v.id;

                return (
                  <article
                    key={v.id}
                    className="border border-[#0F766E]/20 bg-[#FFFFFF] rounded-xl overflow-hidden shadow-md flex flex-col"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden bg-black">
                      {isPlaying ? (
                        <iframe
                          src={`https://www.youtube.com/embed/${v.youtubeId}?autoplay=1&rel=0`}
                          title={v.title}
                          className="h-full w-full border-0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      ) : (
                        <>
                          <Image
                            src={v.poster}
                            alt={`${v.stage}: ${v.title}`}
                            fill
                            sizes="(min-width: 1024px) 22vw, 90vw"
                            className="object-cover transition-transform duration-500 hover:scale-105"
                            unoptimized
                          />
                          <span className="absolute right-3 top-3 text-[11px] font-sans-clean tabular-nums text-white/90 bg-black/60 px-2 py-0.5">
                            {v.duration}
                          </span>
                          <button
                            type="button"
                            onClick={() => setPlayingId(v.id)}
                            aria-label={`Play ${v.stage}: ${v.title}`}
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex h-14 w-14 items-center justify-center rounded-full border border-white/90 bg-white/10 backdrop-blur-sm text-white transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                          >
                            <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
                          </button>
                        </>
                      )}
                    </div>

                    <div className="p-4 flex flex-col gap-3 flex-1">
                      <div className="flex items-baseline gap-3 text-[11px] font-sans-clean uppercase tracking-[0.14em]">
                        <span className="tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-[#C9D2D9]">{v.stage}</span>
                      </div>
                      <h3 className="text-sm font-sans-clean text-white leading-snug">
                        {v.title}
                      </h3>
                      <div className="mt-auto pt-2 border-t border-white/10 text-[10px] font-sans-clean uppercase tracking-[0.14em] text-[#8FA0AE]">
                        {v.tags[0]} <span className="mx-1.5 text-white/30">/</span> {v.tags[1]}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Inside the theatre strip */}
            <div className="lg:col-span-12 pt-8 border-t border-white/10">
              <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {PROCEDURE_STILLS.map((s) => (
                  <li key={s.label}>
                    <figure>
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0F1D29]">
                        <Image
                          src={s.image}
                          alt={s.label}
                          fill
                          sizes="(min-width: 1024px) 14vw, 45vw"
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <figcaption className="mt-2 text-[11px] font-sans-clean text-[#C9D2D9] leading-snug">
                        {s.label}
                      </figcaption>
                    </figure>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ----------------------------- Patient voice ----------------------------- */}
        <aside className="bg-[#F7F5F1] text-[#14181B] px-8 py-12 flex flex-col justify-between gap-10">
          <div className="space-y-6">
            <SectionEyebrow text="PATIENT VOICE" darkBg={false} />

            <div aria-hidden className="font-serif-display text-6xl leading-none text-[#14181B]">
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.blockquote
                key={voiceIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="font-serif-display italic text-xl leading-snug text-[#14181B]"
              >
                {voice.quote}
                {voice.attribution && (
                  <footer className="mt-4 not-italic text-xs font-sans-clean text-[#7A756C]">
                    {voice.attribution}
                  </footer>
                )}
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {PATIENT_VOICES.length > 1 && (
            <div className="flex items-center gap-6 text-[#14181B]">
              <button
                type="button"
                onClick={() => step(-1)}
                aria-label="Previous patient voice"
                className="p-1 hover:text-[#7C2020] transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next patient voice"
                className="p-1 hover:text-[#7C2020] transition-colors"
              >
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}