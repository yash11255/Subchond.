"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CheckCircle2, MousePointerClick, Stethoscope } from "lucide-react";

export interface ImagingFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  xPos: number; // % from left of the image
  yPos: number; // % from top of the image
  tag: string;
}

type Modality = "xray" | "mri";

const XRAY_FEATURES: ImagingFeature[] = [
  {
    id: "joint-space",
    title: "Joint space width",
    subtitle: "How much cartilage is left",
    description:
      "Taken while you stand, the X-ray shows the real gap between the thigh bone and shin bone under your body weight. A narrow gap means the cartilage has worn down.",
    xPos: 48,
    yPos: 42,
    tag: "Key measure",
  },
  {
    id: "bone-alignment",
    title: "Leg alignment",
    subtitle: "Where your weight passes through the knee",
    description:
      "A standing X-ray shows whether your weight runs through the centre of the knee or overloads one side (bow-legged or knock-kneed alignment). This changes which treatments make sense.",
    xPos: 55,
    yPos: 68,
    tag: "Structure",
  },
  {
    id: "sclerosis",
    title: "Subchondral sclerosis",
    subtitle: "Denser bone under worn cartilage",
    description:
      "Bone just beneath worn cartilage thickens and looks brighter on X-ray. It is a sign that this part of the joint is under extra mechanical stress.",
    xPos: 38,
    yPos: 55,
    tag: "Bone response",
  },
];

const MRI_FEATURES: ImagingFeature[] = [
  {
    id: "bml-edema",
    title: "Bone marrow lesions",
    subtitle: "Stress and swelling inside the bone",
    description:
      "Fluid-bright areas in the bone, seen on T2/STIR sequences, sit directly under stressed cartilage. They are often a key source of knee pain and are not visible on X-ray.",
    xPos: 42,
    yPos: 48,
    tag: "Often painful",
  },
  {
    id: "cartilage-defects",
    title: "Cartilage defects",
    subtitle: "Thickness and damage, directly visible",
    description:
      "MRI maps the cartilage itself. It shows thinning, partial-thickness cracks, and areas where the bone surface beneath is exposed.",
    xPos: 52,
    yPos: 36,
    tag: "Soft tissue",
  },
  {
    id: "meniscus-tear",
    title: "Meniscus and extrusion",
    subtitle: "The knee's shock absorber",
    description:
      "Shows meniscus tears and wear, and whether the meniscus has been pushed out past the edge of the joint, where it can no longer share load properly.",
    xPos: 62,
    yPos: 52,
    tag: "Structure",
  },
  {
    id: "synovium",
    title: "Synovial inflammation",
    subtitle: "Joint lining and fluid",
    description:
      "Shows an inflamed joint lining and extra fluid in the knee, which can explain swelling, stiffness and aching even when the X-ray looks stable.",
    xPos: 34,
    yPos: 32,
    tag: "Inflammation",
  },
];

const MODALITIES: Record<
  Modality,
  { tab: string; caption: string; src: string; alt: string; features: ImagingFeature[] }
> = {
  xray: {
    tab: "Weight-bearing X-ray",
    caption: "Standing X-ray of the knee",
    src: "/assets/knee-oa-xray.png",
    alt: "Weight-bearing X-ray of a knee showing joint space and alignment",
    features: XRAY_FEATURES,
  },
  mri: {
    tab: "3T MRI scan",
    caption: "T2 / STIR MRI of the knee",
    src: "/assets/knee-bml-mri.png",
    alt: "3T MRI of a knee showing a bone marrow lesion and stress beneath the cartilage",
    features: MRI_FEATURES,
  },
};

const xrayShows = [
  "Narrowing of the joint space under body weight",
  "Leg alignment (bow-legged or knock-kneed)",
  "Bone spurs and thickened bone under the cartilage",
];
const mriShows = [
  "Bone marrow lesions and swelling inside the bone",
  "Cartilage loss and focal defects",
  "Meniscus tears and extrusion",
  "Inflamed joint lining and fluid",
];

export default function ImagingSection() {
  const reduce = !!useReducedMotion();
  const [activeTab, setActiveTab] = useState<Modality>("xray");
  const [selectedId, setSelectedId] = useState<string>(XRAY_FEATURES[0].id);

  const current = MODALITIES[activeTab];

  const handleTabChange = (tab: Modality) => {
    setActiveTab(tab);
    setSelectedId(MODALITIES[tab].features[0].id);
  };

  const handleAssessClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const target = document.querySelector("#assess");
    if (!target) return;
    e.preventDefault();
    const lenis = (window as unknown as { lenis?: { scrollTo: (t: Element) => void } }).lenis;
    if (lenis) lenis.scrollTo(target);
    else target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  const cta =
    "inline-flex items-center justify-center rounded-xl bg-[#C2410C] px-6 py-3.5 font-sans-clean text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#9A3412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]";

  return (
    <section
      id="imaging"
      aria-labelledby="imaging-heading"
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#F7FAF9] via-[#FAF8F4] to-[#F6F1E9] py-16 text-[#1B2B2A] md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-0 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.10),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1100px] space-y-14 px-6 font-sans-clean md:px-12">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-[720px] space-y-5">
            <span className="inline-block rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]">
              Diagnostic imaging
            </span>
            <h2
              id="imaging-heading"
              className="font-serif-display text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl"
            >
              X-ray shows the space.
              <br />
              <span className="text-[#0F766E]">MRI shows more of the story.</span>
            </h2>
            <p className="max-w-[62ch] text-base leading-relaxed text-[#3F5452] sm:text-lg">
              Weight-bearing X-rays are the starting point for judging joint space and alignment.
              An MRI adds a detailed look at bone marrow lesions, cartilage, meniscus and synovium,
              and is worth doing when that detail will change your plan.
            </p>
          </div>
          <a href="https://subchond.com/#assessment" onClick={handleAssessClick} className={`${cta} shrink-0`}>
            Assess my imaging
          </a>
        </div>

        {/* Interactive viewer */}
        <div className="rounded-3xl bg-white p-5 shadow-[0_12px_40px_rgba(27,43,42,0.10)] md:p-8">
          <div className="flex flex-col gap-4 border-b border-[#1B2B2A]/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[15px] text-[#4B5F5D]">
              <MousePointerClick className="h-5 w-5 text-[#0F766E]" aria-hidden="true" />
              Switch scans, then select a marker to see what it shows.
            </p>

            <div role="tablist" aria-label="Imaging type" className="inline-flex rounded-xl bg-[#E8F1EF] p-1.5">
              {(Object.keys(MODALITIES) as Modality[]).map((key) => {
                const selected = activeTab === key;
                return (
                  <button
                    key={key}
                    role="tab"
                    id={`tab-${key}`}
                    aria-selected={selected}
                    aria-controls="imaging-panel"
                    onClick={() => handleTabChange(key)}
                    className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F766E] sm:px-5 ${selected ? "bg-[#0F766E] text-white shadow-sm" : "text-[#1B2B2A] hover:text-[#0F766E]"
                      }`}
                  >
                    {MODALITIES[key].tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            id="imaging-panel"
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            className="grid grid-cols-1 gap-8 pt-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10"
          >
            {/* Image with hotspots */}
            <div>
              <div className="flex min-h-[380px] items-center justify-center overflow-hidden rounded-2xl bg-[#0A0E0E] p-4 sm:min-h-[460px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={reduce ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="relative aspect-[4/5] w-full max-w-[420px]"
                  >
                    <Image
                      src={current.src}
                      alt={current.alt}
                      fill
                      priority
                      sizes="(max-width: 1024px) 90vw, 420px"
                      className="object-contain"
                    />

                    {current.features.map((f) => {
                      const selected = selectedId === f.id;
                      return (
                        <button
                          key={f.id}
                          onClick={() => setSelectedId(f.id)}
                          aria-label={f.title}
                          aria-pressed={selected}
                          style={{ left: `${f.xPos}%`, top: `${f.yPos}%` }}
                          className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                          <span className="relative flex h-8 w-8 items-center justify-center">
                            {selected && (
                              <span className="absolute inline-flex h-full w-full rounded-full bg-[#F97316]/60 motion-safe:animate-ping" />
                            )}
                            <span
                              className={`relative inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold transition-transform ${selected
                                  ? "scale-110 bg-[#C2410C] text-white ring-2 ring-white"
                                  : "bg-white/90 text-[#0F766E] ring-1 ring-white/60 group-hover:scale-110"
                                }`}
                            >
                              +
                            </span>
                          </span>
                          <span
                            className={`pointer-events-none absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/85 px-2.5 py-1 text-xs font-medium text-white transition-opacity ${selected ? "opacity-100" : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                              }`}
                          >
                            {f.title}
                          </span>
                        </button>
                      );
                    })}
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* confirm: change this note if these are real patient images */}
              <p className="mt-3 text-sm text-[#4B5F5D]">
                {current.caption}. Example image for illustration; marker positions are approximate.
              </p>
            </div>

            {/* Findings list: selecting one expands its explanation */}
            <div className="flex flex-col gap-3">
              <h3 className="font-serif-display text-xl font-bold">What this scan can show</h3>
              <ul className="space-y-2">
                {current.features.map((f) => {
                  const active = selectedId === f.id;
                  return (
                    <li key={f.id}>
                      <button
                        onClick={() => setSelectedId(f.id)}
                        aria-expanded={active}
                        className={`w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F766E] ${active
                            ? "border-[#0F766E] bg-[#E8F1EF]"
                            : "border-[#1B2B2A]/10 bg-white hover:border-[#0F766E]/40"
                          }`}
                      >
                        <span className="flex items-start justify-between gap-3">
                          <span>
                            <span className="block text-[15px] font-semibold">{f.title}</span>
                            <span className="mt-0.5 block text-sm text-[#4B5F5D]">{f.subtitle}</span>
                          </span>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold ${active ? "bg-[#0F766E] text-white" : "bg-[#E8F1EF] text-[#0F766E]"
                              }`}
                          >
                            {f.tag}
                          </span>
                        </span>
                        {active && (
                          <span className="mt-3 block border-t border-[#0F766E]/20 pt-3 text-sm leading-relaxed text-[#1B2B2A]">
                            {f.description}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        {/* Comparison: two columns on one surface */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-0 md:divide-x md:divide-[#1B2B2A]/10">
          <div className="md:pr-10">
            <p className="text-sm font-semibold text-[#0F766E]">Usually the first scan</p>
            <h3 className="mt-1 font-serif-display text-2xl font-bold">Weight-bearing X-ray</h3>
            <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-[#3F5452]">
              Taken while you stand, so the gap between the bones reflects the load your knee
              carries every day. It tells us how much joint space is left and how your leg is
              aligned.
            </p>
            <p className="mt-5 text-sm font-semibold">What it shows</p>
            <ul className="mt-2 space-y-2.5">
              {xrayShows.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:pl-10">
            <p className="text-sm font-semibold text-[#C2410C]">When it will change the plan</p>
            <h3 className="mt-1 font-serif-display text-2xl font-bold">3T MRI</h3>
            <p className="mt-3 max-w-[52ch] text-base leading-relaxed text-[#3F5452]">
              A detailed, cross-sectional view of the soft tissues and the bone under the
              cartilage. It is most useful when what it finds would change your treatment.
            </p>
            <p className="mt-5 text-sm font-semibold">What it shows</p>
            <ul className="mt-2 space-y-2.5">
              {mriShows.map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-[15px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#C2410C]" aria-hidden="true" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decision note + CTA */}
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-[#C2410C]/25 bg-[#FFF8EE] p-6 md:flex-row md:items-center md:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#C2410C]/10 text-[#C2410C]">
              <Stethoscope className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-serif-display text-xl font-bold">Not every patient needs an MRI</h3>
              <p className="mt-1 max-w-[60ch] text-[15px] leading-relaxed text-[#3F5452]">
                Dr. Bora starts with your symptoms, how you move and your weight-bearing X-rays,
                and recommends an MRI only when it will guide your care.
              </p>
            </div>
          </div>
          <a href="https://subchond.com/#assessment" onClick={handleAssessClick} className={`${cta} shrink-0`}>
            Assess my imaging
          </a>
        </div>
      </div>
    </section>
  );
}