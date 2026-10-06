"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Activity, ArrowUpRight } from "lucide-react";

export interface CarePartner {
  id: string;
  number: string;
  name: string;
  role: string;
  description: string;
  href: string;
  linkLabel: string;
  accent: string; // text colour class for the role label
  image: { src: string; alt: string };
}

const PARTNERS: CarePartner[] = [
  {
    id: "orthosport",
    number: "01",
    name: "Orthosport",
    role: "Diagnosis and clinical care",
    description:
      "Dr. Manu Bora: examination, imaging review, and an appropriate discussion of joint preservation or replacement.",
    href: "https://www.orthosport.in/",
    linkLabel: "orthosport.in",
    accent: "text-[#2F7D5B]",
    image: {
      src: "/images/dr2.png",
      alt: "Dr. Manu Bora examining a patient's knee in clinic",
    },
  },
  {
    id: "threads-physio",
    number: "02",
    name: "Threads Physio",
    role: "Rehab and strength",
    description:
      "Individualised physiotherapy, regular check-ins and guided progression through in-person or online sessions.",
    href: "https://www.threadsphysio.com/our-services/online-physiotherapy/",
    linkLabel: "threadsphysio.com",
    accent: "text-[#2F6F8F]",
    image: {
      src: "/images/rehabilitate.png",
      alt: "Physiotherapist guiding a patient through knee rehabilitation and strengthening",
    },
  },
  {
    id: "reverse-clinics",
    number: "03",
    name: "Reverse Clinics",
    role: "Recovery and lifestyle",
    description:
      "Optional nutrition and supplement guidance where appropriate. No supplement replaces treatment or proves knee-regeneration claims.",
    href: "https://www.reverseclinics.com/",
    linkLabel: "reverseclinics.com",
    accent: "text-[#C2410C]",
    image: {
      src: "/assets/ot/ot-10.webp",
      alt: "Post-operative surgical care and guided recovery protocol",
    },
  },
];

/** Shows the image; falls back to a quiet placeholder if the file is missing. */
function PartnerImage({ src, alt }: { src: string; alt: string }) {
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
      sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
      onError={() => setFailed(true)}
      className="object-cover"
    />
  );
}

export default function CareTeamSection() {
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

  return (
    <section
      id="programme"
      aria-labelledby="programme-heading"
      className="relative w-full bg-gradient-to-br from-[#FAF8F5] via-[#F7FAF9] to-[#F6F1E9] py-16 font-sans-clean text-[#1B2B2A] md:py-24"
    >
      <motion.div {...reveal} className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        {/* Header */}
        <header className="mb-12 max-w-[720px] space-y-5 md:mb-16">
          <span className="inline-block rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]">
            The full programme
          </span>
          <h2
            id="programme-heading"
            className="font-serif-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
          >
            SUBCHOND is more than an injection.
          </h2>
          <p className="max-w-[62ch] text-base leading-relaxed text-[#3F5452] sm:text-lg">
            Diagnosis, an appropriate clinical decision, guided rehabilitation, strength, recovery
            and thoughtful monitoring all belong together.
          </p>
        </header>

        {/* Three parts of the programme */}
        <ol className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {PARTNERS.map((p) => (
            <li key={p.id} className="flex flex-col">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-[#E8F1EF] shadow-[0_12px_40px_rgba(27,43,42,0.10)]">
                <PartnerImage src={p.image.src} alt={p.image.alt} />
                <span
                  aria-hidden="true"
                  className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold tabular-nums shadow-sm backdrop-blur-sm"
                >
                  {p.number}
                </span>
              </div>

              <div className="mt-6 flex flex-1 flex-col">
                <p className={`text-sm font-semibold ${p.accent}`}>{p.role}</p>
                <h3 className="mt-1 font-serif-display text-2xl font-bold leading-tight tracking-tight">
                  {p.name}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[#3F5452]">{p.description}</p>

                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.name}, ${p.linkLabel} (opens in a new tab)`}
                  className="mt-auto inline-flex w-fit items-center gap-1.5 pt-5 text-[15px] font-semibold text-[#1B2B2A] underline decoration-[#1B2B2A]/30 underline-offset-4 transition-colors hover:text-[#C2410C] hover:decoration-[#C2410C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2410C]"
                >
                  {p.linkLabel}
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
            </li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}