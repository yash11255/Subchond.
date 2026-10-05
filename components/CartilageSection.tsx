"use client";

import React, { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

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
    image: "/images/cause-subchondral-bone.png",
    alt: "Illustration of the subchondral bone beneath the knee cartilage",
  },
  {
    id: "bone-marrow-lesions",
    title: "Bone marrow lesions",
    description:
      "MRI-visible changes may be linked with pain fluctuations and progression; they are not the cause in every knee.",
    image: "/images/cause-bone-marrow-lesions.png",
    alt: "Illustration of a bone marrow lesion under the knee cartilage",
  },
  {
    id: "microdamage",
    title: "Microdamage",
    description:
      "Stress-related changes may occur in the supporting bone plate and trabeculae.",
    image: "/images/cause-microdamage.png",
    alt: "Illustration of stress-related changes in the supporting bone",
  },
  {
    id: "synovial-inflammation",
    title: "Synovial inflammation",
    description:
      "Inflamed joint lining can contribute to swelling, warmth and stiffness.",
    image: "/images/cause-synovial-inflammation.png",
    alt: "Illustration of the knee joint and its lining",
  },
  {
    id: "meniscus-alignment",
    title: "Meniscus & alignment",
    description:
      "Meniscal degeneration and uneven loading can increase symptoms and alter how forces cross the joint.",
    image: "/images/cause-meniscus-alignment.png",
    alt: "Heat map of load distribution across the knee joint",
  },
  {
    id: "muscle-movement",
    title: "Muscle & movement",
    description:
      "Strength, activity tolerance and gait mechanics matter for how comfortably the knee functions.",
    image: "/images/cause-muscle-movement.png",
    alt: "Illustration of the knee joint and surrounding structures",
  },
];

const FALLBACK_IMAGE = "/assets/oa-cutaway.webp";
const ease = [0.22, 1, 0.36, 1] as const;

export default function ProblemSection() {
  const [activeId, setActiveId] = useState<string>(PAIN_CAUSES[0].id);
  const activeIndex = PAIN_CAUSES.findIndex((c) => c.id === activeId);
  const active = PAIN_CAUSES[activeIndex] ?? PAIN_CAUSES[0];

  return (
    <section
      id="problem"
      className="relative w-full border-y border-[#0F766E]/15 bg-[#FAF8F5] py-14 text-[#1B2B2A] md:py-20"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-start gap-10 px-6 md:px-12 lg:grid-cols-12 lg:gap-12">
        {/* ---------- Left: heading & intro ---------- */}
        <div className="space-y-5 lg:col-span-4 lg:sticky lg:top-24">
          <SectionEyebrow text="04 / THE PROBLEM" darkBg={false} />

          <h2 className="font-serif-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-[#1B2B2A] sm:text-5xl md:text-[3.4rem]">
            Why does an <span className="text-[#0F766E]">arthritic knee</span> hurt?
          </h2>

          <p className="font-sans-clean max-w-sm text-base font-medium leading-relaxed text-[#4B5F5D]">
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
            Hover or tap a factor to see where it acts in the joint.
          </p>
        </div>

        {/* ---------- Center: live illustration panel ---------- */}
        <div className="flex flex-col items-center lg:col-span-5 lg:sticky lg:top-24">
          <div className="relative w-full max-w-[480px] overflow-hidden rounded-2xl border border-[#0F766E]/15 bg-white shadow-[0_24px_50px_-24px_rgba(15,118,110,0.35)]">
            {/* Image area — swaps with the active cause */}
            <div className="relative aspect-[4/3] w-full">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease }}
                  className="absolute inset-0"
                >
                  <Image
                    src={active.image || FALLBACK_IMAGE}
                    alt={active.alt}
                    fill
                    sizes="(min-width: 1024px) 38vw, 92vw"
                    className="object-contain p-6"
                    priority
                    unoptimized
                  />
                </motion.div>
              </AnimatePresence>

              {/* Index badge */}
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-[#1B2B2A]/85 px-3 py-1.5 backdrop-blur-sm">
                <span className="font-sans-clean text-[11px] font-bold tabular-nums text-[#F4E9D8]">
                  {String(activeIndex + 1).padStart(2, "0")} / 06
                </span>
              </div>
            </div>

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
                    {active.title}
                  </p>
                  <p className="font-sans-clean mt-1 text-xs leading-relaxed text-[#4B5F5D]">
                    {active.description}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress dots */}
          <div className="mt-4 flex items-center gap-2">
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

          <p className="mt-3 flex items-center gap-2 font-sans-clean text-[11px] font-semibold text-[#0F766E]">
            <span className="h-2 w-2 rounded-full bg-[#0F766E]" />
            Illustrative anatomy — where each factor acts
          </p>
        </div>

        {/* ---------- Right: six contributing factors ---------- */}
        <ol className="divide-y divide-[#0F766E]/15 lg:col-span-3 lg:border-l lg:border-[#0F766E]/15 lg:pl-6">
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
                  className="group flex w-full gap-4 py-4 text-left focus-visible:outline-none"
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
                    <span
                      className={`mt-1 block font-sans-clean text-sm leading-relaxed transition-colors duration-200 sm:text-[15px] ${isActive
                          ? "font-medium text-[#1B2B2A]"
                          : "font-normal text-[#4B5F5D]"
                        }`}
                    >
                      {cause.description}
                    </span>
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