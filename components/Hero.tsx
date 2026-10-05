"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import SectionEyebrow from "./SectionEyebrow";

const YT_ID = "VtG6c_qR-ao";
const poster = `https://i.ytimg.com/vi/${YT_ID}/maxresdefault.jpg`;

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, delay: 0.08 * i },
  }),
};

const evidence = [
  {
    figure: "80–82%",
    text: "of treated knees had not undergone replacement at about 15 years of follow-up.",
  },
  {
    figure: "2",
    text: "independent long-term studies reporting the same joint-preservation outcome.",
  },
  {
    figure: "1",
    text: "subchondral bone-marrow session, performed as a joint-preservation option.",
  },
];

export default function Hero() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const reduceMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    setMounted(true);
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  const src =
    `https://www.youtube-nocookie.com/embed/${YT_ID}` +
    `?autoplay=${reduceMotion ? 0 : 1}&mute=1&controls=0&loop=1&playlist=${YT_ID}` +
    `&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&enablejsapi=1`;

  const toggleVideo = () => {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    const func = playing ? "pauseVideo" : "playVideo";
    win.postMessage(JSON.stringify({ event: "command", func, args: "" }), "*");
    setPlaying(!playing);
  };

  return (
    <section id="top" className="relative w-full overflow-hidden bg-[#F7F6F2] text-[#16302E]">
      {/* Soft radial glow behind the video side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full bg-[#0B5C56]/[0.07] blur-3xl"
      />

      <div className="relative mx-auto max-w-[1280px] px-6 pb-20 pt-28 md:px-10 md:pt-32 lg:pb-28">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------- Left: message ---------- */}
          <div className="lg:col-span-6">
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate="show">
              <SectionEyebrow
                text="Orthopaedics  /  Joint preservation"
                darkBg={false}
              />
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              initial="hidden"
              animate="show"
              className="font-serif-display mt-7 text-[2.9rem] font-semibold leading-[1.06] tracking-[-0.015em] text-[#0B3B38] sm:text-6xl xl:text-[4.4rem]"
            >
              Preserving your own knee,{" "}
              <span className="italic text-[#0B5C56]">for longer.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              animate="show"
              className="font-sans-clean mt-7 max-w-xl text-base leading-[1.8] text-[#46605D] md:text-lg"
            >
              A single subchondral bone-marrow treatment may delay the need for
              knee replacement. In two long-term studies,{" "}
              <span className="font-medium text-[#0B3B38]">80–82% of treated knees</span>{" "}
              had not been replaced at about 15 years.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={3}
              initial="hidden"
              animate="show"
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#assess"
                className="group inline-flex items-center gap-3 rounded-full bg-[#0B3B38] px-7 py-4 text-sm font-medium text-[#F7F6F2] shadow-[0_10px_30px_-10px_rgba(11,59,56,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0B5C56] hover:shadow-[0_16px_36px_-10px_rgba(11,92,86,0.55)]"
              >
                Book a knee assessment
                <svg
                  width="15" height="10" viewBox="0 0 16 10" fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M0 5h14M10 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </a>
              <a
                href="#imaging"
                className="font-sans-clean inline-flex items-center gap-2 rounded-full border border-[#16302E]/20 px-7 py-4 text-sm font-medium text-[#0B3B38] transition-colors duration-300 hover:border-[#0B5C56]/50 hover:bg-white"
              >
                See how we diagnose
              </a>
            </motion.div>

            {/* Trust strip */}
            <motion.div
              variants={fadeUp}
              custom={4}
              initial="hidden"
              animate="show"
              className="mt-12 flex items-center gap-3 text-[#6B7F7C]"
            >
              <span className="flex -space-x-2">
                {["AS", "JM", "RK"].map((n) => (
                  <span
                    key={n}
                    className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#F7F6F2] bg-[#DDE7E5] text-[10px] font-semibold text-[#0B3B38]"
                  >
                    {n}
                  </span>
                ))}
              </span>
              <p className="font-sans-clean text-xs leading-relaxed">
                Trusted by <span className="font-medium text-[#0B3B38]">2,400+ patients</span>{" "}
                for joint-preservation care
              </p>
            </motion.div>
          </div>

          {/* ---------- Right: video panel ---------- */}
          <motion.div
            variants={fadeUp}
            custom={2}
            initial="hidden"
            animate="show"
            className="lg:col-span-6"
          >
            <div className="relative">
              {/* Offset accent frame */}
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl bg-[#0B5C56]/10"
              />

              <div className="relative overflow-hidden rounded-3xl border border-[#16302E]/10 bg-[#E6EEED] shadow-[0_30px_60px_-30px_rgba(11,59,56,0.35)]">
                <div
                  className="relative aspect-[4/3] w-full bg-cover bg-center sm:aspect-[16/11]"
                  style={{ backgroundImage: `url(${poster})` }}
                >
                  {mounted && (
                    <iframe
                      ref={iframeRef}
                      src={src}
                      title="Background video"
                      aria-hidden="true"
                      tabIndex={-1}
                      allow="autoplay; encrypted-media; picture-in-picture"
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="pointer-events-none absolute left-1/2 top-1/2 aspect-video w-[118%] max-w-none -translate-x-1/2 -translate-y-1/2 border-0"
                    />
                  )}
                </div>

                {/* Bottom bar: caption + control */}
                <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between bg-gradient-to-t from-[#0B3B38]/80 to-transparent px-5 pb-4 pt-12">
                  <p className="font-sans-clean text-[11px] uppercase tracking-[0.22em] text-white/85">
                    Subchondral treatment — arthroscopic view
                  </p>
                  <button
                    type="button"
                    onClick={toggleVideo}
                    aria-label={playing ? "Pause background video" : "Play background video"}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/30"
                  >
                    {playing ? (
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                        <rect x="0" width="3.4" height="12" /><rect x="6.6" width="3.4" height="12" />
                      </svg>
                    ) : (
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                        <path d="M0 0l10 6-10 6V0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Floating outcome chip on the panel's corner */}
              <div className="absolute -left-4 -top-5 z-30 rounded-2xl border border-[#16302E]/10 bg-white px-5 py-4 shadow-[0_16px_40px_-16px_rgba(11,59,56,0.35)] md:-left-8">
                <p className="font-serif-display text-2xl font-semibold text-[#0B5C56]">15 yrs</p>
                <p className="font-sans-clean mt-0.5 text-[11px] leading-tight text-[#6B7F7C]">
                  longest published
                  <br />
                  follow-up
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ---------- Evidence band ---------- */}
      <div className="relative border-t border-[#16302E]/10 bg-white">
        <div className="mx-auto max-w-[1280px] px-6 md:px-10">
          <div className="grid grid-cols-1 divide-y divide-[#D5DEDD] md:grid-cols-3 md:divide-x md:divide-y-0">
            {evidence.map((e, i) => (
              <motion.div
                key={e.figure}
                variants={fadeUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-60px" }}
                className="py-9 md:px-10 md:py-12 md:first:pl-0 md:last:pr-0"
              >
                <p className="font-serif-display text-4xl font-semibold tracking-tight text-[#0B5C56] md:text-5xl">
                  {e.figure}
                </p>
                <p className="font-sans-clean mt-3 max-w-[34ch] text-sm leading-relaxed text-[#46605D]">
                  {e.text}
                </p>
              </motion.div>
            ))}
          </div>
          <p className="font-sans-clean border-t border-[#D5DEDD] py-4 text-xs leading-relaxed text-[#6B7F7C]">
            Outcomes are drawn from published follow-up studies and may not
            reflect individual results. A clinical assessment is needed to
            determine suitability.
          </p>
        </div>
      </div>
    </section>
  );
}