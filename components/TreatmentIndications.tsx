"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, Activity, Clock, ShieldCheck, Replace } from "lucide-react";

export interface TreatmentOption {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  whoItIsFor: string[];
  keyBenefits: string[];
  recoveryTimeline: string;
  preservesNaturalJoint: boolean;
  image: { src: string; alt: string };
}

// confirm: every clinical statement below should be reviewed by Dr. Bora.
export const TREATMENT_OPTIONS: TreatmentOption[] = [
  {
    id: "subchondral-preservation",
    badge: "Joint preservation",
    title: "Subchondral joint preservation",
    subtitle: "Treating the bone under the cartilage",
    tagline: "Treat bone marrow lesions early to protect your natural knee.",
    description:
      "Bone marrow lesions are areas of stress and swelling in the bone beneath the cartilage, and a common source of persistent knee pain. This treatment targets them directly, aiming to ease pain and slow joint breakdown so a replacement can be delayed or avoided.",
    whoItIsFor: [
      "Ongoing knee pain with bone marrow lesions on MRI",
      "Early to moderate joint space narrowing in one area of the knee",
      "Active people who want to keep their natural joint",
      "People looking for options before an early knee replacement",
    ],
    keyBenefits: [
      "Keeps your own bone, cartilage and ligaments",
      "Minimally invasive procedure",
      "Designed for a quicker return to daily activities",
      "Aims to reduce deep bone pain",
    ],
    recoveryTimeline: "Protected weight-bearing for 2–3 weeks, then rehab over 6–12 weeks",
    preservesNaturalJoint: true,
    // confirm: add this image. Suggestion: the procedure, or an MRI showing a bone marrow lesion.
    image: {
      src: "/assets/treatment-subchondral.jpg",
      alt: "Dr. Bora reviewing an MRI that shows a bone marrow lesion in the knee",
    },
  },
  {
    id: "arthroscopy-ligament",
    badge: "Sports medicine",
    title: "Keyhole knee arthroscopy",
    subtitle: "ACL, meniscus and cartilage repair",
    tagline: "Repair torn or damaged tissue through small incisions.",
    description:
      "Arthroscopy uses a small camera and fine instruments passed through keyhole incisions. It is used to repair meniscus tears, reconstruct torn ACL or PCL ligaments, and treat focal cartilage damage.",
    whoItIsFor: [
      "Sports injuries with a meniscus tear or an unstable ligament",
      "Focal cartilage damage or loose fragments in the joint",
      "A knee that catches, locks or gives way",
      "Athletes and active people who need a stable knee",
    ],
    keyBenefits: [
      "Small incisions with less damage to surrounding tissue",
      "Meniscus repaired rather than removed whenever repair is possible",
      "Restores stability and confidence in movement",
      "Usually day-care or a short stay",
    ],
    // confirm: ACL reconstruction often takes longer to return to sport than a meniscus repair
    recoveryTimeline: "Guided movement starts early; return to sport in 3–6 months",
    preservesNaturalJoint: true,
    // confirm: add this image. Suggestion: arthroscopic view of the knee, or an arthroscopy in progress.
    image: {
      src: "/assets/treatment-arthroscopy.jpg",
      alt: "Arthroscopic keyhole surgery on a knee",
    },
  },
  {
    id: "knee-replacement-evaluation",
    badge: "Joint replacement",
    title: "Knee replacement and second opinion",
    subtitle: "When the joint can no longer be saved",
    tagline: "An honest check on whether replacement is truly needed.",
    description:
      "When wear is severe and preservation is no longer an option, a total or partial knee replacement can restore walking and comfort. If you have been advised to have a replacement, Dr. Bora will review your imaging and tell you whether the joint can still be saved.",
    whoItIsFor: [
      "Advanced arthritis with the joint space gone",
      "Severe pain at rest or deformity that has not improved with non-surgical care",
      "You have been advised a knee replacement and want a second opinion",
      "Bone-on-bone pain that limits your walking",
    ],
    keyBenefits: [
      "Detailed 3D imaging review of your alignment",
      "Clear criteria for whether preservation is still possible",
      "Precise alignment to help the implant last",
      "Structured rehab before and after surgery",
    ],
    recoveryTimeline: "Hospital stay of 2–4 days; walking progresses over 1–2 weeks",
    preservesNaturalJoint: false,
    // confirm: add this image. Suggestion: a knee implant, or a post-replacement X-ray.
    image: {
      src: "/assets/treatment-replacement.jpg",
      alt: "Knee replacement implant shown on an X-ray",
    },
  },
];

/** Shows the treatment image; falls back to a quiet placeholder if the file is missing. */
function TreatmentImage({
  src,
  alt,
  sizes,
  priority,
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
}) {
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

export default function TreatmentIndications() {
  const reduce = !!useReducedMotion();
  const [selectedId, setSelectedId] = useState<string>(TREATMENT_OPTIONS[0].id);
  const active = TREATMENT_OPTIONS.find((t) => t.id === selectedId) || TREATMENT_OPTIONS[0];

  return (
    <section
      id="procedure"
      aria-labelledby="treatment-heading"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#FAF8F5] via-[#F7FAF9] to-[#F6F1E9] py-16 text-[#1B2B2A] md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(194,65,12,0.07),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1100px] space-y-12 px-6 font-sans-clean md:px-12">
        {/* Header */}
        <div className="max-w-[760px] space-y-5">
          <span className="inline-block rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]">
            Treatment options
          </span>
          <h2
            id="treatment-heading"
            className="font-serif-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
          >
            Treatment matched to what is actually wrong with your knee
          </h2>
          <p className="max-w-[62ch] text-base leading-relaxed text-[#3F5452] sm:text-lg">
            Not every knee problem needs a replacement. Dr. Bora looks at whether joint
            preservation, arthroscopic repair or replacement is the safest and most effective
            choice for you and the way you live.
          </p>
        </div>

        {/* Selector: one card per treatment, each with its own image */}
        <div role="tablist" aria-label="Treatment options" className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {TREATMENT_OPTIONS.map((option) => {
            const isActive = option.id === selectedId;
            return (
              <button
                key={option.id}
                role="tab"
                id={`tab-${option.id}`}
                aria-selected={isActive}
                aria-controls="treatment-panel"
                onClick={() => setSelectedId(option.id)}
                className={`overflow-hidden rounded-2xl border bg-white text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] ${isActive
                  ? "border-[#0F766E] ring-2 ring-[#0F766E]/20"
                  : "border-[#1B2B2A]/10 hover:border-[#0F766E]/40"
                  }`}
              >
                <span className="relative block aspect-[16/9] w-full overflow-hidden bg-[#E8F1EF]">
                  <TreatmentImage
                    key={option.image.src}
                    src={option.image.src}
                    alt=""
                    sizes="(max-width: 768px) 90vw, 340px"
                  />
                  {!isActive && <span aria-hidden="true" className="absolute inset-0 bg-white/30" />}
                </span>
                <span className="block space-y-1 p-5">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${isActive ? "bg-[#0F766E] text-white" : "bg-[#E8F1EF] text-[#0F766E]"
                      }`}
                  >
                    {option.badge}
                  </span>
                  <span className="block pt-1 font-serif-display text-xl font-bold leading-snug">
                    {option.title}
                  </span>
                  <span className="block text-sm text-[#4B5F5D]">{option.subtitle}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Detail */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            id="treatment-panel"
            role="tabpanel"
            aria-labelledby={`tab-${active.id}`}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 gap-8 rounded-3xl bg-white p-5 shadow-[0_12px_40px_rgba(27,43,42,0.10)] md:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-10"
          >
            {/* Left: image, join status, recovery */}
            <div className="space-y-4">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-[#E8F1EF] sm:aspect-[5/4] lg:aspect-[4/5]">
                <TreatmentImage
                  key={active.image.src}
                  src={active.image.src}
                  alt={active.image.alt}
                  sizes="(max-width: 1024px) 90vw, 440px"
                  priority
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 px-3.5 py-1.5 text-sm font-semibold shadow-sm backdrop-blur-sm">
                  {active.preservesNaturalJoint ? (
                    <>
                      <ShieldCheck className="h-4 w-4 text-[#0F766E]" aria-hidden="true" />
                      Keeps your natural joint
                    </>
                  ) : (
                    <>
                      <Replace className="h-4 w-4 text-[#C2410C]" aria-hidden="true" />
                      Replaces the joint
                    </>
                  )}
                </span>
              </div>

              <div className="flex items-start gap-3 rounded-2xl border border-[#C2410C]/25 bg-[#FFF8EE] p-4">
                <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#C2410C]" aria-hidden="true" />
                <div>
                  <p className="text-sm font-semibold text-[#C2410C]">Typical recovery</p>
                  <p className="mt-0.5 text-[15px] font-medium leading-snug">{active.recoveryTimeline}</p>
                </div>
              </div>
            </div>

            {/* Right: description, lists, CTA */}
            <div className="flex flex-col gap-6">
              <div className="space-y-3">
                <p className="text-sm font-semibold text-[#C2410C]">{active.tagline}</p>
                <h3 className="font-serif-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                  {active.title}
                </h3>
                <p className="max-w-[60ch] text-base leading-relaxed text-[#3F5452]">
                  {active.description}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-8 border-t border-[#1B2B2A]/10 pt-6 sm:grid-cols-2">
                <div>
                  <h4 className="flex items-center gap-2 text-base font-semibold text-[#2F7D5B]">
                    <Activity className="h-5 w-5" aria-hidden="true" />
                    Who it may suit
                  </h4>
                  <ul className="mt-3 space-y-3">
                    {active.whoItIsFor.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-[15px] leading-snug">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="flex items-center gap-2 text-base font-semibold text-[#2F6F8F]">
                    <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                    What to expect
                  </h4>
                  <ul className="mt-3 space-y-3">
                    {active.keyBenefits.map((b) => (
                      <li key={b} className="flex items-start gap-2.5 text-[15px] leading-snug">
                        <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#C2410C]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-auto space-y-3 pt-2">
                <a
                  href="#assess"
                  className="inline-flex items-center justify-center rounded-xl bg-[#C2410C] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#9A3412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
                >
                  Check if you are a candidate
                </a>
                <p className="text-sm text-[#4B5F5D]">
                  Recovery times are estimates. Dr. Bora confirms the right option after examining
                  you and reviewing your imaging.
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}