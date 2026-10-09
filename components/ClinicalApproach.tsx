"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { Play } from "lucide-react";

export interface ApproachStep {
  id: string;
  name: string;
  descriptor: string;
  detail: string;
  image: string;
  alt: string;
}

// confirm: review the "detail" sentences with Dr. Bora.
export const APPROACH_STEPS: ApproachStep[] = [
  {
    id: "scan",
    name: "Scan",
    descriptor: "Assess imaging",
    detail:
      "Your weight-bearing X-rays, and an MRI if one is needed, are reviewed together to look at joint space, alignment and bone marrow lesions.",
    image: "/assets/knee-bml-mri.png",
    alt: "Clinician reviewing knee MRI and X-ray imaging",
  },
  {
    id: "understand",
    name: "Understand",
    descriptor: "Find pain contributors",
    detail:
      "Your examination and imaging are matched to your symptoms, so we know what is actually driving the pain before choosing any treatment.",
    image: "/images/dr-manu-portrait.png",
    alt: "Physician explaining knee findings to a patient",
  },
  {
    id: "target",
    name: "Target",
    descriptor: "Choose suitable care",
    detail:
      "Dr. Bora recommends the care that fits your knee. Targeted subchondral treatment is considered only when it is appropriate for you.",
    image: "/assets/ot/ot-08.webp",
    alt: "Targeted subchondral treatment planning",
  },
  {
    id: "rehab",
    name: "Rehab",
    descriptor: "Restore movement",
    detail:
      "Guided physiotherapy helps the knee settle and brings back your range of movement.",
    image: "/assets/ot/ot-12.webp",
    alt: "Patient doing guided knee rehabilitation exercises",
  },
  {
    id: "strengthen",
    name: "Strengthen",
    descriptor: "Build capacity",
    detail:
      "Strength work and weight and load management build the capacity your knee needs for daily life and sport.",
    image: "/assets/ot/ot-09.webp",
    alt: "Patient doing strength training for the knee",
  },
  {
    id: "follow-up",
    name: "Follow up",
    descriptor: "Measure progress",
    detail:
      "Regular check-ins track your pain and function, and the plan is adjusted to how your knee responds.",
    image: "/dr-manu-bora.jpg",
    alt: "Follow-up consultation reviewing progress",
  },
];

const WATCH = {
  poster: `https://i.ytimg.com/vi/9-5ei6AWDiY/hqdefault.jpg`,
  youtubeId: "9-5ei6AWDiY",
};

const DESKTOP = "(min-width: 1024px)";

export default function ClinicalApproach() {
  const reduce = !!useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const total = APPROACH_STEPS.length;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // On desktop the step follows scroll position
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (reduce || typeof window === "undefined" || !window.matchMedia(DESKTOP).matches) return;
    const index = Math.min(total - 1, Math.max(0, Math.floor(latest * total)));
    setActiveIndex((prev) => (prev === index ? prev : index));
  });

  // Clicking a step scrolls to it on desktop (so scroll and click never fight), or just selects it
  const goTo = (i: number) => {
    const el = containerRef.current;
    if (!reduce && el && window.matchMedia(DESKTOP).matches) {
      const top = window.scrollY + el.getBoundingClientRect().top;
      const range = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + range * ((i + 0.5) / total), behavior: "smooth" });
    } else {
      setActiveIndex(i);
    }
  };

  const active = APPROACH_STEPS[activeIndex];
  const sticky = !reduce;

  return (
    <section
      id="approach"
      aria-labelledby="approach-heading"
      className="relative w-full bg-gradient-to-br from-[#FAF8F5] via-[#F7FAF9] to-[#F6F1E9] font-sans-clean text-[#1B2B2A]"
    >
      {/* ------------------------- Pathway ------------------------- */}
      <div ref={containerRef} className={`relative ${sticky ? "lg:min-h-[240vh]" : ""}`}>
        <div
          className={`flex w-full items-center overflow-hidden py-16 lg:py-10 ${sticky ? "lg:sticky lg:top-0 lg:h-screen" : "lg:py-24"
            }`}
        >
          <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-6 md:px-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
            {/* Left: introduction */}
            <div className="space-y-5">
              <span className="inline-block rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]">
                Your care pathway
              </span>
              <h2
                id="approach-heading"
                className="font-serif-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
              >
                Six steps from scan to follow-up
              </h2>
              <p className="font-serif-display text-xl font-bold leading-snug text-[#0F766E]">
                A physician-led joint preservation pathway, not a one-size-fits-all procedure.
              </p>
              <p className="max-w-[44ch] text-base leading-relaxed text-[#4B5F5D]">
                Examination and imaging guide every decision. Targeted subchondral treatment is
                considered only when it is appropriate, alongside strengthening, weight and load
                management, and follow-up.
              </p>
            </div>

            {/* Right: image, step detail, rail */}
            <div className="space-y-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#12302D] shadow-[0_12px_40px_rgba(27,43,42,0.10)] lg:aspect-[16/10]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={active.image}
                      alt=""
                      aria-hidden
                      fill
                      sizes="40vw"
                      className="scale-110 object-cover blur-2xl brightness-90"
                      unoptimized
                    />
                    <Image
                      src={active.image}
                      alt={active.alt}
                      fill
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-contain"
                      priority={activeIndex === 0}
                      unoptimized
                    />
                  </motion.div>
                </AnimatePresence>
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-semibold shadow-sm backdrop-blur-sm">
                  Step {activeIndex + 1} of {total}
                </span>
              </div>

              {/* Step detail: fixed height on desktop so the layout never jumps */}
              <div className="lg:min-h-[96px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-serif-display text-2xl font-bold">
                      {active.name}
                      <span className="ml-3 font-sans-clean text-base font-medium text-[#C2410C]">
                        {active.descriptor}
                      </span>
                    </h3>
                    <p className="mt-2 max-w-[62ch] text-base leading-relaxed text-[#3F5452]">
                      {active.detail}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Pathway rail */}
              <div className="relative">
                <div aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-[#1B2B2A]/15 lg:block" />
                <div
                  aria-hidden="true"
                  style={{ width: `calc(${(activeIndex / total) * 100}% + 7px)` }}
                  className="absolute left-0 top-[6px] hidden h-[3px] rounded-full bg-[#0F766E] transition-[width] duration-500 motion-reduce:transition-none lg:block"
                />

                <ol className="relative grid grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
                  {APPROACH_STEPS.map((step, i) => {
                    const isActive = i === activeIndex;
                    const isDone = i < activeIndex;
                    return (
                      <li key={step.id}>
                        <button
                          type="button"
                          onClick={() => goTo(i)}
                          aria-current={isActive ? "step" : undefined}
                          className="group w-full text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F766E]"
                        >
                          <span
                            className={`relative z-10 block h-[15px] w-[15px] rounded-full border-2 transition-all duration-300 ${isActive
                                ? "scale-110 border-[#C2410C] bg-[#C2410C] ring-4 ring-[#C2410C]/20"
                                : isDone
                                  ? "border-[#0F766E] bg-[#0F766E]"
                                  : "border-[#1B2B2A]/30 bg-[#FAF8F5] group-hover:border-[#0F766E]"
                              }`}
                          />
                          <span className="mt-3 block text-sm tabular-nums text-[#6B7C7A]">{i + 1}</span>
                          <span
                            className={`block text-[15px] font-semibold transition-colors ${isActive ? "text-[#1B2B2A]" : "text-[#4B5F5D] group-hover:text-[#1B2B2A]"
                              }`}
                          >
                            {step.name}
                          </span>
                          <span className="mt-0.5 block text-sm leading-snug text-[#4B5F5D]">
                            {step.descriptor}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------- Video ------------------------- */}
      <div className="border-t border-[#1B2B2A]/10">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-6 py-16 md:px-12 md:py-24 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
          <div className="space-y-4">
            <h3 className="font-serif-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Watch how the pathway works
            </h3>
            <p className="max-w-[44ch] text-base leading-relaxed text-[#4B5F5D]">
              Learn why finding the right subchondral region matters, and how the full programme
              goes beyond a single procedure.
            </p>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#12302D] shadow-[0_12px_40px_rgba(27,43,42,0.10)]">
            {isPlaying ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${WATCH.youtubeId}?autoplay=1&rel=0`}
                title="How SUBCHOND works"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <>
                <Image
                  src={WATCH.poster}
                  alt="Preview of the video about how SUBCHOND works"
                  fill
                  sizes="(min-width: 1024px) 65vw, 100vw"
                  className="object-cover"
                  unoptimized
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/35" />
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  aria-label="Play video: how SUBCHOND works"
                  className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-[#12302D] shadow-xl transition-transform duration-300 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white motion-reduce:transition-none"
                >
                  <Play className="h-7 w-7 translate-x-[1px]" fill="currentColor" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}