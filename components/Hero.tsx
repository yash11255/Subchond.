"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import KneeAnimation from "./KneeAnimation";

const YT_ID = "uNbLrxSPWS0"; // Dr. Manu Bora: "Knee Replacement Avoided for 10 Years? Understanding Subchond Bone Treatment"
const YT_ORIGIN = "https://www.youtube-nocookie.com";

const ease = [0.22, 1, 0.36, 1] as const;

// confirm: cite the two long-term studies (authors, journal, year) somewhere on the page
// and link them from the evidence band. Outcome claims need visible sources.
const evidence = [
  {
    figure: "80–82%",
    text: "of treated knees had not been replaced at about 15 years of follow-up.",
  },
  {
    figure: "2",
    text: "independent long-term studies reported the same joint-preservation outcome.",
  },
  {
    figure: "1",
    text: "subchondral bone-marrow session, performed as a joint-preservation option.",
  },
];

export default function Hero() {
  const reduceMotion = !!useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [mediaMode, setMediaMode] = useState<"diagram" | "video">("diagram");

  useEffect(() => {
    setMounted(true);
  }, [reduceMotion]);

  // Entrance animation. With reduced motion, content fades only, with no movement.
  const fadeUp = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.2 : 0.7, ease, delay: reduceMotion ? 0 : 0.08 * i },
    }),
  };


  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] font-sans-clean text-[#1B2B2A]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.12),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1200px] px-6 pb-20 pt-28 md:px-12 md:pt-32 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          {/* ---------- Left: message ---------- */}
          <div>
            <motion.span
              variants={fadeUp}
              custom={0}
              initial="hidden"
              animate="show"
              className="inline-block rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]"
            >
              Orthopaedics · Joint preservation
            </motion.span>

            <motion.p
              variants={fadeUp}
              custom={0.5}
              initial="hidden"
              animate="show"
              lang="hi"
              className="mt-5 text-lg font-semibold text-[#C2410C]"
            >
              घुटना बदलवाने से पहले, उसे बचाने की सोचिए।
            </motion.p>

            <motion.h1
              id="hero-heading"
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="font-serif-display mt-3 text-[2.75rem] font-bold leading-[1.08] tracking-tight text-[#1B2B2A] sm:text-6xl xl:text-[4.25rem]"
            >
              Preserving your own knee, <span className="text-[#0F766E]">for longer.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="mt-6 max-w-[54ch] text-base leading-relaxed text-[#3F5452] md:text-lg"
            >
              A single subchondral bone-marrow treatment may delay the need for knee replacement.
              In two long-term studies,{" "}
              <strong className="font-semibold text-[#1B2B2A]">80–82% of treated knees</strong> had
              not been replaced at about 15 years.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#assess"
                className="group inline-flex items-center gap-2.5 rounded-xl bg-[#C2410C] px-7 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#9A3412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
              >
                Book a knee assessment
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </a>
              <a
                href="#imaging"
                className="inline-flex items-center rounded-xl border border-[#1B2B2A]/20 bg-white/70 px-7 py-4 text-base font-semibold text-[#3A4A49] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2B2A]"
              >
                See how we diagnose
              </a>
            </motion.div>

            {/* Who you will see: real credentials in place of placeholder patient avatars */}
            {/* Dr. Manu Bora Authority Badge */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="show"
              className="mt-10 p-4 rounded-2xl bg-white/80 border border-[#0F766E]/20 shadow-sm backdrop-blur-sm flex items-center gap-4 max-w-md"
            >
              <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-[#0F766E] shadow-sm">
                <Image
                  src="/dr-manu-bora.jpg"
                  alt="Dr. Manu Bora, Orthopaedic Surgeon"
                  fill
                  sizes="64px"
                  className="object-cover object-top"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-serif-display font-bold text-base text-[#1B2B2A]">
                    Dr. Manu Bora
                  </span>
                  <span className="rounded bg-[#0F766E]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#0F766E] uppercase">
                    Verified Surgeon
                  </span>
                </div>
                <p className="text-xs text-[#4B5F5D] leading-snug mt-0.5">
                  Arthrex Master Instructor · Fellowships France & Spain
                </p>
                <div className="flex items-center gap-2 mt-1 text-[11px] font-semibold text-[#C2410C]">
                  <span>★ 4.9/5 Rating</span>
                  <span className="text-[#4B5F5D]/40">·</span>
                  <span className="text-[#0F766E]">10,000+ Knee & ACL Procedures</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ---------- Right: animated knee diagram / explainer video ---------- */}
          <motion.div variants={fadeUp} custom={2} initial="hidden" animate="show">
            <div className="mb-3 flex items-center gap-2">
              {([
                ["diagram", "How the knee hurts"],
                ["video", "Watch Dr. Bora explain"],
              ] as const).map(([mode, label]) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setMediaMode(mode)}
                  className={`rounded-full px-4 py-2 text-xs font-bold transition-all sm:text-sm ${
                    mediaMode === mode
                      ? "bg-[#0F766E] text-white shadow-sm"
                      : "border border-[#1B2B2A]/15 bg-white/80 text-[#1B2B2A] hover:bg-white"
                  }`}
                >
                  {mode === "video" ? "▶ " : ""}
                  {label}
                </button>
              ))}
            </div>

            <div className="relative">
              <div aria-hidden="true" className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#0F766E]/10" />

              <div className="relative overflow-hidden rounded-3xl border border-[#1B2B2A]/10 bg-gradient-to-b from-white to-[#EEF6F4] shadow-[0_30px_60px_-30px_rgba(27,43,42,0.35)]">
                {mediaMode === "diagram" ? (
                  <div className="relative aspect-[4/5] w-full p-4 sm:aspect-square lg:aspect-[4/5]">
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(rgba(15,118,110,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(15,118,110,0.06)_1px,transparent_1px)] bg-[size:28px_28px]"
                    />
                    <KneeAnimation />
                  </div>
                ) : (
                  <div className="relative aspect-video w-full bg-black lg:aspect-[4/5]">
                    {mounted && (
                      <iframe
                        src={`${YT_ORIGIN}/embed/${YT_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        title="Dr. Manu Bora explains subchondral bone treatment"
                        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                        allowFullScreen
                        className="absolute inset-0 h-full w-full border-0"
                      />
                    )}
                  </div>
                )}
              </div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-2 top-3 z-30 scale-90 origin-top-left rounded-2xl border border-[#1B2B2A]/10 bg-white px-5 py-4 md:-left-8 md:-top-5 md:scale-100 shadow-[0_16px_40px_-16px_rgba(27,43,42,0.35)] md:-left-8"
              >
                <p className="font-serif-display text-2xl font-bold text-[#0F766E]">10,000+</p>
                <p className="mt-0.5 text-sm leading-tight text-[#4B5F5D]">
                  Knees treated
                  <br />
                  by Dr. Manu Bora
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- Evidence band ---------- */}
      <div className="relative border-t border-[#1B2B2A]/10 bg-white">
        <div className="mx-auto max-w-[1200px] px-6 md:px-12">
          <h2 className="sr-only">The evidence</h2>
          <ul className="grid grid-cols-1 divide-y divide-[#1B2B2A]/10 md:grid-cols-3 md:divide-x md:divide-y-0">
            {evidence.map((e, i) => (
              <motion.li
                key={e.figure}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="py-9 md:px-10 md:py-12 md:first:pl-0 md:last:pr-0"
              >
                <p className="font-serif-display text-4xl font-bold tracking-tight text-[#0F766E] md:text-5xl">
                  {e.figure}
                </p>
                <p className="mt-3 max-w-[34ch] text-[15px] leading-relaxed text-[#3F5452]">{e.text}</p>
              </motion.li>
            ))}
          </ul>
          <p className="border-t border-[#1B2B2A]/10 py-5 text-sm leading-relaxed text-[#4B5F5D]">
            Outcomes are drawn from published follow-up studies and may not reflect individual
            results. A clinical assessment is needed to determine suitability.
          </p>
        </div>
      </div>
    </section>
  );
}