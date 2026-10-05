"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";

export interface PatientJourney {
  id: string;
  title: string;
  tag: string; // short topic label, e.g. "Knee recovery"
  duration: string;
  poster: string;
  youtubeId: string;
  steps: string[];
}

const DEFAULT_STEPS = [
  "Assessment",
  "Imaging",
  "Targeted injection",
  "Rehabilitation",
  "Follow-up",
];

// confirm: video titles, durations and step lists with Dr. Bora.
export const PATIENT_JOURNEYS: PatientJourney[] = [
  {
    id: "subchondral-injection",
    title: "Subchondral joint preservation",
    tag: "Knee recovery",
    duration: "02:32",
    poster: "https://img.youtube.com/vi/jCRPcKirJyw/hqdefault.jpg",
    youtubeId: "jCRPcKirJyw",
    steps: DEFAULT_STEPS,
  },
  {
    id: "acl-repair",
    title: "ACL reconstruction recovery",
    tag: "Sports medicine",
    duration: "03:48",
    poster: "https://img.youtube.com/vi/IXA1DOaJk7w/hqdefault.jpg",
    youtubeId: "IXA1DOaJk7w",
    steps: ["Assessment", "Imaging", "Surgery", "Rehabilitation", "Follow-up"],
  },
  {
    // id renamed from "shoulder-arthroscopy", which did not match the knee content
    id: "knee-cartilage-arthroscopy",
    title: "Knee and cartilage arthroscopy",
    tag: "Arthroscopy",
    duration: "04:15",
    poster: "https://img.youtube.com/vi/PE63cvSYcFQ/hqdefault.jpg",
    youtubeId: "PE63cvSYcFQ",
    steps: ["Assessment", "Imaging", "Arthroscopy", "Rehabilitation", "Follow-up"],
  },
  {
    id: "meniscus-knee-recovery",
    title: "Meniscus repair and joint health",
    tag: "Mobility and strength",
    duration: "03:28",
    poster: "https://img.youtube.com/vi/jaYP5nJBGQU/hqdefault.jpg",
    youtubeId: "jaYP5nJBGQU",
    steps: ["Assessment", "Imaging", "Repair", "Rehabilitation", "Follow-up"],
  },
];

const PAGE_SIZE = 4;

export default function PatientJourneysSection() {
  const reduce = !!useReducedMotion();
  const [activeId, setActiveId] = useState<string>(PATIENT_JOURNEYS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [page, setPage] = useState(0);

  const totalPages = Math.max(1, Math.ceil(PATIENT_JOURNEYS.length / PAGE_SIZE));
  const visible = PATIENT_JOURNEYS.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  const active = PATIENT_JOURNEYS.find((j) => j.id === activeId) ?? PATIENT_JOURNEYS[0];

  const selectJourney = (id: string) => {
    setActiveId(id);
    setIsPlaying(false);
  };

  const fade = {
    initial: reduce ? false : ({ opacity: 0 } as const),
    animate: { opacity: 1 },
    exit: reduce ? { opacity: 1 } : { opacity: 0 },
  };

  return (
    <section
      id="patient-journeys"
      aria-labelledby="journeys-heading"
      className="relative w-full bg-gradient-to-br from-[#FAF8F5] via-[#F7FAF9] to-[#F6F1E9] py-16 font-sans-clean text-[#1B2B2A] md:py-24"
    >
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        {/* Header */}
        <header className="mb-10 max-w-[720px] space-y-5 md:mb-14">
          <span className="inline-block rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]">
            Patient stories
          </span>
          <h2
            id="journeys-heading"
            className="font-serif-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
          >
            Real people. Real recovery.
            <br />
            <span className="text-[#0F766E]">With the clinical context.</span>
          </h2>
          {/* confirm: wording depends on what the videos actually show */}
          <p className="max-w-[62ch] text-base leading-relaxed text-[#3F5452] sm:text-lg">
            Watch how patients recovered, alongside the steps of care each one went through.
          </p>
        </header>

        {/* Player + story details */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-0">
          <div className="lg:pr-10">
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#12302D] shadow-[0_12px_40px_rgba(27,43,42,0.10)]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id + (isPlaying ? "-video" : "-poster")}
                  {...fade}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  {isPlaying ? (
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${active.youtubeId}?autoplay=1&rel=0`}
                      title={active.title}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <Image
                      src={active.poster}
                      alt={`Preview of the video: ${active.title}`}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      className="object-cover"
                      priority
                      unoptimized
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              {!isPlaying && (
                <>
                  <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    aria-label={`Play video: ${active.title}`}
                    className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#12302D] shadow-lg transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
                  >
                    <Play className="h-6 w-6 translate-x-[1px]" fill="currentColor" aria-hidden="true" />
                  </button>
                  <div className="pointer-events-none absolute bottom-4 left-5 right-5 text-white">
                    <p className="text-lg font-semibold leading-snug">{active.title}</p>
                    <p className="text-sm text-white/80">
                      {active.tag} · {active.duration}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="lg:border-l lg:border-[#1B2B2A]/10 lg:pl-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduce ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div>
                  <p className="text-sm font-semibold text-[#C2410C]">{active.tag}</p>
                  <h3 className="mt-1 font-serif-display text-3xl font-bold leading-tight tracking-tight">
                    {active.title}
                  </h3>
                </div>

                <div>
                  <h4 className="text-base font-semibold text-[#2F6F8F]">Steps in this patient&rsquo;s care</h4>
                  <ol className="relative mt-4 space-y-4">
                    <span aria-hidden="true" className="absolute bottom-3 left-[13px] top-3 w-px bg-[#0F766E]/30" />
                    {active.steps.map((step, i) => (
                      <li key={step} className="relative flex items-center gap-4">
                        <span className="relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-[#0F766E] bg-white text-sm font-semibold tabular-nums text-[#0F766E]">
                          {i + 1}
                        </span>
                        <span className="text-base">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {!isPlaying && (
                  <button
                    type="button"
                    onClick={() => setIsPlaying(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-[#C2410C] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#9A3412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
                  >
                    <Play className="h-4 w-4" fill="currentColor" aria-hidden="true" />
                    Watch this story
                  </button>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* More stories */}
        <div className="mt-12 border-t border-[#1B2B2A]/10 pt-8 md:mt-14">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h3 className="font-serif-display text-xl font-bold">More patient stories</h3>
            {totalPages > 1 && (
              <div className="flex items-center gap-2 text-sm text-[#4B5F5D]">
                <button
                  type="button"
                  aria-label="Previous stories"
                  disabled={page === 0}
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#1B2B2A]/15 bg-white transition-colors hover:border-[#0F766E] disabled:opacity-30 disabled:hover:border-[#1B2B2A]/15"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <span className="tabular-nums" aria-live="polite">
                  {page + 1} of {totalPages}
                </span>
                <button
                  type="button"
                  aria-label="Next stories"
                  disabled={page >= totalPages - 1}
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  className="grid h-9 w-9 place-items-center rounded-full border border-[#1B2B2A]/15 bg-white transition-colors hover:border-[#0F766E] disabled:opacity-30 disabled:hover:border-[#1B2B2A]/15"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}
          </div>

          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visible.map((j) => {
              const isActive = j.id === active.id;
              return (
                <li key={j.id}>
                  <button
                    type="button"
                    onClick={() => selectJourney(j.id)}
                    aria-pressed={isActive}
                    className={`group block w-full overflow-hidden rounded-2xl border bg-white text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] ${isActive
                        ? "border-[#0F766E] ring-2 ring-[#0F766E]/20"
                        : "border-[#1B2B2A]/10 hover:border-[#0F766E]/40"
                      }`}
                  >
                    <span className="relative block aspect-video w-full overflow-hidden bg-[#12302D]">
                      <Image
                        src={j.poster}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover"
                        unoptimized
                      />
                      <span className="absolute inset-0 grid place-items-center">
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-[#12302D]">
                          <Play className="h-3.5 w-3.5 translate-x-[0.5px]" fill="currentColor" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="absolute bottom-2 right-2 rounded bg-black/80 px-1.5 py-0.5 text-xs font-medium tabular-nums text-white">
                        {j.duration}
                      </span>
                    </span>
                    <span className="block p-4">
                      <span className="block text-sm text-[#4B5F5D]">{j.tag}</span>
                      <span className="mt-0.5 block text-[15px] font-semibold leading-snug">{j.title}</span>
                      {isActive && (
                        <span className="mt-2 block text-sm font-semibold text-[#0F766E]">Now showing</span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <p className="mt-8 max-w-[70ch] text-sm leading-relaxed text-[#4B5F5D]">
          Patient experiences are individual and may not predict your outcome. Treatment decisions
          depend on clinical assessment.
        </p>
      </div>
    </section>
  );
}