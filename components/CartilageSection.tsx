"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";
import KneeAnimation, { type KneeFocus } from "./KneeAnimation";

export interface PainCause {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export const PAIN_CAUSES: PainCause[] = [
  {
    id: "subchondral-bone-stress",
    title: "Subchondral bone stress",
    description:
      "The living, vascular, pain-sensitive bone directly beneath cartilage can undergo overload and remodeling.",
    image: "/images/bonestress.png",
    alt: "Illustration of the subchondral bone beneath the knee cartilage",
  },
  {
    id: "bone-marrow-lesions",
    title: "Bone marrow lesions",
    description:
      "MRI-visible changes may be linked with pain fluctuations and progression; they are not the cause in every knee.",
    image: "/assets/knee-bml-mri.png",
    alt: "Illustration of a bone marrow lesion under the knee cartilage",
  },
  {
    id: "microdamage",
    title: "Microdamage",
    description:
      "Stress-related changes may occur in the supporting bone plate and trabeculae.",
    image: "/assets/oa-cutaway.webp",
    alt: "Illustration of stress-related changes in the supporting bone",
  },
  {
    id: "synovial-inflammation",
    title: "Synovial inflammation",
    description:
      "Inflamed joint lining can contribute to swelling, warmth and stiffness.",
    image: "/assets/hero-anatomy.png",
    alt: "Illustration of the knee joint and its lining",
  },
  {
    id: "meniscus-alignment",
    title: "Meniscus & alignment",
    description:
      "Meniscal degeneration and uneven loading can increase symptoms and alter how forces cross the joint.",
    image: "/assets/knee-oa-xray.png",
    alt: "Heat map of load distribution across the knee joint",
  },
  {
    id: "muscle-movement",
    title: "Muscle & movement",
    description:
      "Strength, activity tolerance and gait mechanics matter for how comfortably the knee functions.",
    image: "/images/dr3.png",
    alt: "Dr. Manu Bora assessing knee movement and mechanics",
  },
];

const FOCUS: Record<string, KneeFocus> = {
  "subchondral-bone-stress": "bone",
  "bone-marrow-lesions": "bml",
  microdamage: "micro",
  "synovial-inflammation": "synovium",
  "meniscus-alignment": "meniscus",
  "muscle-movement": "muscle",
};
const ease = [0.22, 1, 0.36, 1] as const;

export default function ProblemSection() {
  const [activeId, setActiveId] = useState<string>(PAIN_CAUSES[0].id);
  const activeIndex = PAIN_CAUSES.findIndex((c) => c.id === activeId);
  const active = PAIN_CAUSES[activeIndex] ?? PAIN_CAUSES[0];
  const step = (dir: -1 | 1) =>
    setActiveId(PAIN_CAUSES[(activeIndex + dir + PAIN_CAUSES.length) % PAIN_CAUSES.length].id);
  const arrow =
    "grid h-10 w-10 place-items-center rounded-full border border-[#0F766E]/20 bg-white/95 text-[#0F766E] shadow-md backdrop-blur transition hover:scale-105 hover:bg-[#E8F1EF] active:scale-95";

  return (
    <section
      id="problem"
      className="relative w-full border-y border-[#0F766E]/15 bg-[#FAF8F5] py-14 text-[#1B2B2A] md:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-12">
        {/* ---------- Left: heading & intro ---------- */}
        <div className="space-y-5 lg:col-span-4 xl:col-span-3 lg:sticky lg:top-24">
          <SectionEyebrow text="THE PROBLEM" darkBg={false} />

          <h2 className="font-serif-display text-4xl font-bold leading-[1.05] tracking-tight text-[#1B2B2A] sm:text-5xl md:text-[3.4rem]">
            Why does an <span className="text-[#0F766E]">arthritic knee</span> hurt?
          </h2>

          <p className="font-sans-clean max-w-md text-base font-medium leading-relaxed text-[#4B5F5D]">
            Osteoarthritis is a whole-joint condition. Cartilage has little to
            no direct pain sensation; other tissues can contribute to pain,
            stiffness and loss of function.
          </p>

          <div className="rounded-xl border border-[#C2410C]/20 bg-[#FFF8EE] p-4">
            <span className="font-sans-clean mb-1 block text-xs font-bold uppercase tracking-wider text-[#C2410C]">
              The right question
            </span>
            <p className="font-sans-clean text-xs font-semibold leading-relaxed text-[#1B2B2A]">
              Not only: &ldquo;How much cartilage is left?&rdquo; But also:
              &ldquo;What is driving my pain?&rdquo;
            </p>
          </div>

          {/* Desktop hint */}
          <p className="hidden font-sans-clean text-xs text-[#4B5F5D]/70 lg:block">
            Hover a factor or use the arrows to see where it acts in the joint.
          </p>
        </div>

        {/* ---------- Center: live illustration panel ---------- */}
        <div className="flex flex-col items-center lg:col-span-4 xl:col-span-5 lg:sticky lg:top-24">
          <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-[#0F766E]/15 bg-white shadow-[0_24px_50px_-24px_rgba(15,118,110,0.35)]">
            {/* Image area — swaps with the active cause */}
            <motion.div
              className="relative aspect-square w-full touch-pan-y bg-gradient-to-b from-white to-[#EEF6F4]"
              onPanEnd={(_, info) => {
                if (Math.abs(info.offset.x) > 50) step(info.offset.x < 0 ? 1 : -1);
              }}
            >
              <KneeAnimation focus={FOCUS[active.id]} showCaption={false} className="p-4" />
              

              {/* Prev / next */}
              <button type="button" aria-label="Previous factor" onClick={() => step(-1)} className={`absolute left-3 top-1/2 z-10 -translate-y-1/2 ${arrow}`}>
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button type="button" aria-label="Next factor" onClick={() => step(1)} className={`absolute right-3 top-1/2 z-10 -translate-y-1/2 ${arrow}`}>
                <ChevronRight className="h-5 w-5" />
              </button>

              {/* Index badge */}
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-[#1B2B2A]/85 px-3 py-1.5 backdrop-blur-sm">
                <span className="font-sans-clean text-[11px] font-bold tabular-nums text-[#F4E9D8]">
                  {String(activeIndex + 1).padStart(2, "0")} / 06
                </span>
              </div>
            </motion.div>

            {/* Caption bar */}
            <div className="border-t border-[#0F766E]/10 bg-[#FAF8F5] px-5 py-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <p className="font-sans-clean text-sm font-bold text-[#0F766E]">
                    <span className="mr-2 text-[#C2410C] tabular-nums">{String(activeIndex + 1).padStart(2, "0")}</span>
                    {active.title}
                  </p>
                  <p className="font-sans-clean mt-1 text-[13px] leading-relaxed text-[#4B5F5D]">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-4 flex items-center gap-3">
            <button type="button" aria-label="Previous factor" onClick={() => step(-1)} className={`${arrow} h-8 w-8`}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-2">
            {PAIN_CAUSES.map((cause, i) => (
              <button
                key={cause.id}
                type="button"
                onClick={() => setActiveId(cause.id)}
                aria-label={cause.title}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex
                    ? "w-6 bg-[#C2410C]"
                    : "w-1.5 bg-[#0F766E]/25 hover:bg-[#0F766E]/50"
                  }`}
              />
            ))}
            </div>
            <button type="button" aria-label="Next factor" onClick={() => step(1)} className={`${arrow} h-8 w-8`}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-3 flex items-center gap-2 font-sans-clean text-[11px] font-semibold text-[#0F766E]">
            <span className="h-2 w-2 rounded-full bg-[#0F766E]" />
            Illustrative anatomy — where each factor acts
          </p>
        </div>

        {/* ---------- Right: six contributing factors ---------- */}
        <ol className="hidden divide-y divide-[#0F766E]/15 lg:col-span-4 lg:block lg:border-l lg:border-[#0F766E]/15 lg:pl-6">
          {PAIN_CAUSES.map((cause, i) => {
            const isActive = cause.id === activeId;

            return (
              <li key={cause.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(cause.id)}
                  onMouseEnter={() => setActiveId(cause.id)}
                  onFocus={() => setActiveId(cause.id)}
                  aria-pressed={isActive}
                  className="group flex w-full gap-4 py-3.5 text-left focus-visible:outline-none"
                >
                  <span
                    className={`pt-0.5 font-sans-clean text-base font-bold tabular-nums transition-colors duration-200 ${isActive ? "text-[#C2410C]" : "text-[#4B5F5D]"
                      }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1">
                    <span
                      className={`block font-sans-clean text-base font-bold transition-colors duration-200 sm:text-lg ${isActive ? "text-[#0F766E]" : "text-[#1B2B2A]"
                        }`}
                    >
                      {cause.title}
                    </span>
                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease }}
                          className="block overflow-hidden"
                        >
                          <span className="mt-1 block font-sans-clean text-sm font-medium leading-relaxed text-[#1B2B2A]">
                            {cause.description}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>

                  {/* Active marker */}
                  <span
                    aria-hidden
                    className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300 ${isActive
                        ? "scale-100 bg-[#C2410C]"
                        : "scale-50 bg-transparent"
                      }`}
                  />
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}