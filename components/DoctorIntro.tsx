"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Content. Everything marked "confirm" is a placeholder to replace.   */
/* ------------------------------------------------------------------ */

// Dr. Manu Bora's real YouTube channel
const CHANNEL_URL = "https://www.youtube.com/@drmanubora";

// confirm: add real photos to /public, or delete the entries you don't have
type Slide =
  | { kind: "photo"; src: string; alt: string }
  | { kind: "channel" };

const slides: Slide[] = [
  { kind: "photo", src: "/dr-manu-bora.jpg", alt: "Dr. Manu Bora, Orthopaedic Surgeon and Joint Preservation Specialist" },
  { kind: "photo", src: "/images/dr2.png", alt: "Dr. Manu Bora in patient consultation" },
  { kind: "photo", src: "/images/dr3.png", alt: "Dr. Manu Bora evaluating MRI scan for subchondral lesions" },
  { kind: "photo", src: "/assets/ot/ot-03.webp", alt: "Dr. Manu Bora performing arthroscopic joint surgery in OT" },
  { kind: "photo", src: "/assets/ot/ot-07.webp", alt: "Dr. Manu Bora guiding high-definition surgical cameras in OT" },
  { kind: "channel" },
];

const training = [
  { title: "MBBS, MS Orthopaedics", detail: "Postgraduate surgical training" },
  { title: "Sports Injury Centre, Safdarjung Hospital", detail: "Sports injury and arthroscopy training" },
  { title: "Fellowships in France and Spain", detail: "Joint preservation and arthroscopic surgery" },
  { title: "Arthrex Master Instructor", detail: "Teaches arthroscopic and allied surgeries" },
];

// confirm: match to the conditions Dr. Bora actually treats
const treats = [
  { text: "Knee ligament and meniscus injuries", dot: "bg-[#C2410C]" },
  { text: "Cartilage damage and early arthritis", dot: "bg-[#C9A27E]" },
  { text: "Shoulder instability and rotator cuff tears", dot: "bg-[#9AA8A3]" },
  { text: "Sports injuries in athletes and weekend players", dot: "bg-[#2A9D8F]" },
];

// confirm: add hospital names and consulting days
const locations = ["Gurugram", "New Delhi", "Mumbai"];

// Real videos from youtube.com/@drmanubora
const videos = [
  {
    id: "wnXqPbEH1V4",
    title: "Subchondral BMC Joint Preservation Protocol",
    meta: "Clinical Protocol / Dr. Manu Bora",
  },
  {
    id: "IXA1DOaJk7w",
    title: "ACL Reconstruction, Bone Bruises & Fast Recovery",
    meta: "Sports Medicine / Graft Osteointegration",
  },
  {
    id: "wjfw3YFhbHI",
    title: "Can Knee Osteoarthritis Be Treated Without Surgery?",
    meta: "Adipose Stem Cell / Joint Preservation",
  },
  {
    id: "C3zfD3vMhrU",
    title: "Knee Osteoarthritis: 15-Year Long-Term Outcomes",
    meta: "Subchondral BMC / Clinical Evidence",
  },
];

/* ------------------------------------------------------------------ */
/* Icons (inline, no icon library needed)                              */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

const Svg = ({ className, children }: IconProps & { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
    {children}
  </svg>
);
const CapIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M2 9l10-5 10 5-10 5L2 9z" />
    <path d="M6 11.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-4.5" />
    <path d="M22 9v6" />
  </Svg>
);
const BuildingIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <rect x="4" y="3" width="16" height="18" rx="1.5" />
    <path d="M12 8v6M9 11h6M10 21v-3h4v3" />
  </Svg>
);
const PinIcon = ({ className }: IconProps) => (
  <Svg className={className}>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </Svg>
);
const ChevronIcon = ({ className, dir }: IconProps & { dir: "left" | "right" }) => (
  <Svg className={className}>
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} />
  </Svg>
);
const LinkedInIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M20.4 2H3.6A1.6 1.6 0 002 3.6v16.8A1.6 1.6 0 003.6 22h16.8a1.6 1.6 0 001.6-1.6V3.6A1.6 1.6 0 0020.4 2zM8 18.5H5V10h3v8.5zM6.5 8.8a1.75 1.75 0 110-3.5 1.75 1.75 0 010 3.5zM18.5 18.5h-3v-4.1c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.2h-3V10h2.9v1.2c.4-.7 1.4-1.4 2.8-1.4 3 0 3.5 2 3.5 4.5v4.2z" />
  </svg>
);
const YouTubeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
    <rect x="1" y="4.5" width="22" height="15" rx="4.5" fill="#E02424" />
    <path d="M10 9l5.5 3L10 15V9z" fill="#fff" />
  </svg>
);
const PlayIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
    <path d="M8 5.5v13l11-6.5L8 5.5z" />
  </svg>
);

/* ------------------------------------------------------------------ */
/* Carousel: photos, then a YouTube slide                              */
/* ------------------------------------------------------------------ */

function ProfileCarousel({ reduce }: { reduce: boolean }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = slides.length;

  const go = (i: number) => setIndex((i + count) % count);

  useEffect(() => {
    if (reduce || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), 5500);
    return () => clearInterval(t);
  }, [reduce, paused, count]);

  const btn =
    "absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-[#1B2B2A] shadow transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F766E]";

  return (
    <div
      role="group"
      aria-roledescription="carousel"
      aria-label="Photos and videos of Dr. Bora"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(index - 1);
        if (e.key === "ArrowRight") go(index + 1);
      }}
    >
      <div className="relative aspect-[8/7] w-full overflow-hidden rounded-2xl bg-[#E8F1EF]">
        <div
          className="flex h-full transition-transform duration-500 ease-out motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}`}
              aria-hidden={i !== index}
              className="relative h-full min-w-full"
            >
              {s.kind === "photo" ? (
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 1024px) 90vw, 360px"
                  className="object-cover object-top"
                />
              ) : (
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={i === index ? 0 : -1}
                  className="flex h-full flex-col items-center justify-center gap-3 bg-[#12302D] px-8 text-center text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white"
                >
                  <YouTubeIcon className="h-14 w-14" />
                  <span className="font-serif-display text-xl font-bold">Watch Dr. Bora on YouTube</span>
                  <span className="font-sans-clean text-sm text-white/80">
                    Free explainers on knee and shoulder problems
                  </span>
                  <span className="mt-1 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-sans-clean text-sm font-semibold text-[#12302D]">
                    <PlayIcon className="h-4 w-4" /> Open the channel
                  </span>
                </a>
              )}
            </div>
          ))}
        </div>

        <button type="button" aria-label="Previous slide" onClick={() => go(index - 1)} className={`${btn} left-3`}>
          <ChevronIcon dir="left" className="h-5 w-5" />
        </button>
        <button type="button" aria-label="Next slide" onClick={() => go(index + 1)} className={`${btn} right-3`}>
          <ChevronIcon dir="right" className="h-5 w-5" />
        </button>
      </div>

      <div className="mt-3 flex justify-center gap-2" role="tablist" aria-label="Choose slide">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show slide ${i + 1}`}
            onClick={() => go(i)}
            className={`h-2 rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] ${i === index ? "w-6 bg-[#0F766E]" : "w-2 bg-[#0F766E]/25 hover:bg-[#0F766E]/50"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function DoctorIntro() {
  const reduce = !!useReducedMotion();

  // One reveal for the whole section
  const reveal = reduce
    ? {}
    : {
      initial: { opacity: 0, y: 16 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, margin: "-80px" },
      transition: { duration: 0.6, ease: "easeOut" as const },
    };

  const colHead = "flex items-center gap-2 text-lg font-semibold uppercase tracking-wide";

  return (
    <section
      id="about"
      aria-labelledby="doctor-name"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] py-16 text-[#1B2B2A] md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.10),transparent_70%)]"
      />

      <motion.div {...reveal} className="relative mx-auto max-w-[1100px] px-6 md:px-12">
        {/* 1. Profile carousel + introduction */}
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[360px_minmax(0,1fr)] lg:gap-14">
          <figure className="mx-auto w-full max-w-[400px] rounded-3xl bg-white p-4 shadow-[0_12px_40px_rgba(27,43,42,0.10)] lg:mx-0">
            <ProfileCarousel reduce={reduce} />
            <figcaption className="px-2 pb-3 pt-4 text-center font-sans-clean">
              <span className="block text-2xl font-semibold text-[#2F6F8F]">Dr. Manu Bora</span>
              <span className="mt-1 block text-[15px] leading-snug text-[#4B5F5D]">
                Orthopaedic Surgeon
                <br />
                Arthrex Master Instructor
              </span>
              <span className="mt-4 flex items-center justify-center gap-4 text-[#2F6F8F]">
                {/* confirm: real LinkedIn URL */}
                <a href="#" aria-label="Dr. Bora on LinkedIn" className="rounded p-1 hover:text-[#1D4F68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6F8F]">
                  <LinkedInIcon className="h-6 w-6" />
                </a>
                <a href={CHANNEL_URL} target="_blank" rel="noopener noreferrer" aria-label="Dr. Bora on YouTube" className="rounded p-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6F8F]">
                  <YouTubeIcon className="h-7 w-7" />
                </a>
                <a href="#locations" aria-label="Clinic locations" className="rounded p-1 hover:text-[#1D4F68] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#2F6F8F]">
                  <PinIcon className="h-6 w-6" />
                </a>
              </span>
            </figcaption>
          </figure>

          <div className="flex flex-col items-start gap-5 font-sans-clean">
            <span className="rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]">
              Your surgeon
            </span>

            <h2 id="doctor-name" className="max-w-[18ch] text-4xl font-bold leading-[1.1] tracking-tight text-[#111] sm:text-5xl">
              Knee and Shoulder Care: Preserving Your Own Joint
            </h2>

            <div className="max-w-[62ch] space-y-4 text-base leading-relaxed text-[#2E3B3A]">
              <p>
                Dr. Manu Bora is an orthopaedic surgeon specialising in treating sports injuries
                and early joint damage with arthroscopic (keyhole) surgery and biological
                procedures designed to protect the bone and cartilage you already have.
              </p>
              <p>
                He teaches arthroscopic techniques to other surgeons, and trained in France and
                Spain as well as at the Sports Injury Centre, Safdarjung Hospital. He also explains
                common knee and shoulder problems in plain language on his YouTube channel.
              </p>
            </div>

            <blockquote className="max-w-[62ch] border-l-[3px] border-[#C2410C] pl-4 font-serif-display text-lg leading-snug">
              <span className="font-sans-clean font-bold uppercase text-[#C2410C]">Preserve</span>{" "}
              when appropriate.{" "}
              <span className="font-sans-clean font-bold uppercase text-[#C2410C]">Replace</span>{" "}
              when necessary.
              <br />
              I want every patient to understand their whole joint and get the right treatment at
              the right time.
            </blockquote>

            <div className="flex flex-wrap gap-3 pt-1">
              <a href="#contact-appointment" className="inline-flex items-center rounded-xl bg-[#C2410C] px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#9A3412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]">
                Book a consultation
              </a>
              <a href="#services" className="inline-flex items-center rounded-xl border border-[#1B2B2A]/20 bg-white/70 px-6 py-3 text-base font-semibold text-[#3A4A49] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2B2A]">
                See treatments
              </a>
            </div>
          </div>
        </div>

        {/* 2. Credentials */}
        <div className="mt-14 border-t border-[#1B2B2A]/10 pt-10 font-sans-clean">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-[#1B2B2A]/10">
            <div className="md:pr-8">
              <h3 className={`${colHead} text-[#2F7D5B]`}>
                <CapIcon className="h-5 w-5" /> Training
              </h3>
              <ul className="mt-5 space-y-4">
                {training.map((t) => (
                  <li key={t.title}>
                    <span className="block text-[15px] font-semibold">{t.title}</span>
                    <span className="block text-sm text-[#4B5F5D]">{t.detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:px-8">
              <h3 className={`${colHead} text-[#2F6F8F]`}>
                <BuildingIcon className="h-5 w-5" /> What he treats
              </h3>
              <ul className="mt-5 space-y-3">
                {treats.map((t) => (
                  <li key={t.text} className="flex items-start gap-3 text-[15px]">
                    <span aria-hidden="true" className={`mt-2 h-2 w-2 shrink-0 rounded-full ${t.dot}`} />
                    <span>{t.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div id="locations" className="md:pl-8">
              <h3 className={`${colHead} text-[#C2410C]`}>
                <PinIcon className="h-5 w-5" /> Where he consults
              </h3>
              <ul className="mt-5 space-y-4">
                {locations.map((city) => (
                  <li key={city} className="flex items-start gap-3">
                    <PinIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#6B7C7A]" />
                    <span>
                      <span className="block text-[15px] font-semibold">{city}</span>
                      <span className="block text-sm text-[#4B5F5D]">Clinic and surgery</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 3. YouTube channel */}
        <div className="mt-14 grid grid-cols-1 gap-8 rounded-3xl bg-[#12302D] p-6 font-sans-clean text-white sm:p-8 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10">
          <div className="flex flex-col items-start gap-4">
            <YouTubeIcon className="h-10 w-10" />
            <h3 className="font-serif-display text-2xl font-bold leading-tight">
              Learn about your joints before you visit
            </h3>
            <p className="text-[15px] leading-relaxed text-white/80">
              Dr. Bora explains injuries, treatment options and recovery in plain language on his
              YouTube channel.
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-base font-semibold text-[#12302D] transition-colors hover:bg-[#E8F1EF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Visit the channel
            </a>
          </div>

          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {videos.map((v, i) => (
              <li key={i}>
                <a
                  href={v.id ? `https://www.youtube.com/watch?v=${v.id}` : CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                >
                  <span className="relative block aspect-video overflow-hidden rounded-xl bg-white/10">
                    {v.id && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    )}
                    <span className="absolute inset-0 grid place-items-center">
                      <span className="grid h-11 w-11 place-items-center rounded-full bg-[#E02424] text-white shadow-lg">
                        <PlayIcon className="h-5 w-5" />
                      </span>
                    </span>
                  </span>
                  <span className="mt-3 block text-sm text-white/70">{v.meta}</span>
                  <span className="mt-0.5 block text-[15px] font-semibold leading-snug group-hover:underline">
                    {v.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}