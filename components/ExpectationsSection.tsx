"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowUpRight, BedDouble, ClipboardCheck, Dumbbell, Footprints } from "lucide-react";

interface Phase {
  id: string;
  label: string;
  time: string;
  description: string;
  image: { src: string; alt: string };
  icon: React.ComponentType<{ className?: string }>;
}

// confirm: add these images to /public/assets/. Suggestions are in the comments.
// Keep the imagery calm and realistic. Avoid triumphant "cured" scenes, since results are not assured.
const HEADER_IMAGE = {
  // suggestion: a relaxed consultation between Dr. Bora and a patient looking at a knee scan
  src: "/assets/ot/ot-12.webp",
  alt: "Dr. Manu Bora examining a patient's knee",
};

const PHASES: Phase[] = [
  {
    id: "early",
    label: "Early phase",
    time: "Days to weeks",
    description:
      "Procedure-related soreness may need time to settle. Follow the mobility and load instructions provided.",
    // suggestion: a person resting at home with the leg supported, or walking gently with support
    icon: BedDouble, image: { src: "", alt: "Patient resting at home with the leg supported after a knee procedure" },
  },
  {
    id: "review",
    label: "Review window",
    time: "6–12 weeks",
    description:
      "Clinicians may review changes in pain, function and rehab progress. This is not a guaranteed benefit timeline.",
    // suggestion: a clinician and patient reviewing progress in clinic
    icon: ClipboardCheck, image: { src: "", alt: "Clinician reviewing a patient's knee pain and function at a follow-up visit" },
  },
  {
    id: "rehab",
    label: "Rehab and function",
    time: "3–6 months",
    description:
      "Progressive strength, walking tolerance and daily activity may continue to develop.",
    // suggestion: guided strengthening or a walking exercise with a physiotherapist
    icon: Dumbbell, image: { src: "", alt: "Patient doing a guided knee strengthening exercise with a physiotherapist" },
  },
  {
    id: "long-term",
    label: "Long term",
    time: "Ongoing",
    description:
      "Monitor your symptoms, function, activity goals and imaging when clinically useful.",
    // suggestion: an active but ordinary scene, such as a daily walk, or a routine imaging check
    icon: Footprints, image: { src: "", alt: "Person on a regular walk, keeping active as part of long-term knee care" },
  },
];

/** Shows the image; falls back to a quiet placeholder if the file is missing. */
function PhaseImage({ src, alt, sizes, priority }: { src: string; alt: string; sizes: string; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="grid h-full w-full place-items-center bg-[#E8F1EF] text-[#0F766E]/50">
        <Activity className="h-10 w-10" aria-hidden="true" />
      </div>
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className="object-cover"
    />
  );
}

export default function ExpectationsSection() {
  const reduce = useReducedMotion();

  // One reveal for the whole section
  const reveal = reduce
    ? {}
    : {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, ease: "easeOut" as const },
    };

  const handleAssessClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector("#assess");
    if (!target) return;
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: Element) => void } }).lenis;
    if (lenis) lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section
      id="expectations"
      aria-labelledby="expectations-heading"
      className="relative w-full bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] py-16 font-sans-clean text-[#1B2B2A] md:py-24"
    >
      <motion.div {...reveal} className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        {/* Header: text + image */}
        <header className="mb-14 grid grid-cols-1 items-center gap-10 md:mb-20 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14">
          <div className="space-y-5">
            <span className="inline-block rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]">
              Expectations
            </span>
            <h2
              id="expectations-heading"
              className="font-serif-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
            >
              When might you notice improvement?
            </h2>
            <p className="max-w-[62ch] text-base leading-relaxed text-[#3F5452] sm:text-lg">
              Response is variable, and pain relief after cell-based procedures is not assured.
              Progress also depends on disease severity, loading, rehabilitation and other factors.
            </p>
            <a
              href="https://subchond.com/#assessment"
              onClick={handleAssessClick}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#C2410C] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#9A3412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
            >
              Discuss my knee
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl [&_img]:object-[center_30%] bg-[#E8F1EF] shadow-[0_12px_40px_rgba(27,43,42,0.10)]">
            <PhaseImage
              src={HEADER_IMAGE.src}
              alt={HEADER_IMAGE.alt}
              sizes="(min-width: 1024px) 440px, 90vw"
              priority
            />
          </div>
        </header>

        {/* Timeline: vertical on mobile, four columns from lg. Each phase has its own image. */}
        <ol className="m-carousel relative grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8">
          {/* Line that fades out, because the last phase has no end point */}
          <span
            aria-hidden="true"
            className="max-md:hidden absolute bottom-2 left-[11px] top-2 w-px bg-gradient-to-b from-[#0F766E]/60 to-[#0F766E]/10 lg:bottom-auto lg:left-0 lg:right-0 lg:top-[11px] lg:h-px lg:w-auto lg:bg-gradient-to-r"
          />

          {PHASES.map((p, i) => {
            const last = i === PHASES.length - 1;
            return (
              <li key={p.id} className="relative pl-10 lg:pl-0 lg:pt-12">
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0.5 grid h-6 w-6 place-items-center rounded-full border-2 bg-[#FAF8F5] lg:top-0 ${last ? "border-[#C2410C]" : "border-[#0F766E]"
                    }`}
                >
                  <span className={`h-2 w-2 rounded-full ${last ? "bg-[#C2410C]" : "bg-[#0F766E]"}`} />
                </span>

                <p className={`text-sm font-semibold ${last ? "text-[#C2410C]" : "text-[#0F766E]"}`}>
                  {p.label}
                </p>
                <h3 className="mt-1 font-serif-display text-3xl font-bold leading-tight tracking-tight">
                  {p.time}
                </h3>

                <motion.div
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.12, ease: "easeOut" }}
                  className={`mt-4 grid h-14 w-14 place-items-center rounded-2xl ${last ? "bg-[#FFF1E6] text-[#C2410C]" : "bg-[#DDF1E8] text-[#0F766E]"}`}
                >
                  <p.icon className="h-7 w-7" aria-hidden="true" />
                </motion.div>

                <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-[#3F5452]">
                  {p.description}
                </p>
              </li>
            );
          })}
        </ol>
      </motion.div>
    </section>
  );
}