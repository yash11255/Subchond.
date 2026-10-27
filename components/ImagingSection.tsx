"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";
import { MousePointerClick, Stethoscope } from "lucide-react";

export interface ImagingFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  xPos: number;
  yPos: number;
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

const SCANS: Record<
  Modality,
  {
    number: string;
    title: string;
    intro: string;
    caption: string;
    src: string;
    alt: string;
    features: ImagingFeature[];
  }
> = {
  xray: {
    number: "01 / X-RAY",
    title: "Weight-bearing X-ray",
    intro: "The starting point for joint space and leg alignment.",
    caption: "Standing X-ray of the knee",
    src: "/assets/knee-oa-xray.png",
    alt: "Weight-bearing X-ray of a knee showing joint space and alignment",
    features: XRAY_FEATURES,
  },
  mri: {
    number: "02 / MRI",
    title: "3T MRI scan",
    intro: "A closer look at bone marrow, cartilage, and soft tissue.",
    caption: "T2 / STIR MRI of the knee",
    src: "/assets/knee-bml-mri.png",
    alt: "3T MRI of a knee showing a bone marrow lesion and stress beneath the cartilage",
    features: MRI_FEATURES,
  },
};

function ScanCard({ modality }: { modality: Modality }) {
  const scan = SCANS[modality];
  const [selectedId, setSelectedId] = useState(scan.features[0].id);

  return (
    <article
      aria-labelledby={"scan-" + modality + "-heading"}
      className="min-w-0 rounded-3xl border border-[#1B2B2A]/10 bg-white p-5 shadow-[0_12px_40px_rgba(27,43,42,0.10)] sm:p-7"
    >
      <header className="mb-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0F766E]">{scan.number}</p>
        <h3
          id={"scan-" + modality + "-heading"}
          className="font-serif-display mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
        >
          {scan.title}
        </h3>
        <p className="mt-2 text-[15px] leading-relaxed text-[#4B5F5D]">{scan.intro}</p>
      </header>

      <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-[#0A0E0E] p-3">
        <div className="relative aspect-[4/5] w-full max-w-[400px]">
          <Image
            src={scan.src}
            alt={scan.alt}
            fill
            sizes="(min-width: 1024px) 400px, 90vw"
            className="object-contain"
          />
          {scan.features.map((feature) => {
            const selected = selectedId === feature.id;
            return (
              <button
                key={feature.id}
                type="button"
                onClick={() => setSelectedId(feature.id)}
                aria-label={feature.title + " on " + scan.title}
                aria-pressed={selected}
                style={{ left: feature.xPos + "%", top: feature.yPos + "%" }}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              >
                <span className="relative flex h-8 w-8 items-center justify-center">
                  {selected && (
                    <span className="absolute inline-flex h-full w-full rounded-full bg-[#F97316]/60 motion-safe:animate-ping" />
                  )}
                  <span
                    className={
                      "relative inline-flex h-6 w-6 items-center justify-center rounded-full text-sm font-bold transition-transform " +
                      (selected
                        ? "scale-110 bg-[#C2410C] text-white ring-2 ring-white"
                        : "bg-white/90 text-[#0F766E] ring-1 ring-white/60 group-hover:scale-110")
                    }
                  >
                    +
                  </span>
                </span>
                <span
                  className={
                    "pointer-events-none absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap rounded-md bg-black/85 px-2.5 py-1 text-xs font-medium text-white transition-opacity " +
                    (selected
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100")
                  }
                >
                  {feature.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#4B5F5D]">
        {scan.caption}. Example image for illustration; marker positions are approximate.
      </p>

      <div className="mt-7 border-t border-[#1B2B2A]/10 pt-6">
        <h4 className="font-serif-display text-xl font-bold">What this scan can show</h4>
        <ul className="mt-4 space-y-2">
          {scan.features.map((feature) => {
            const selected = selectedId === feature.id;
            return (
              <li key={feature.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(feature.id)}
                  aria-expanded={selected}
                  className={
                    "w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0F766E] " +
                    (selected
                      ? "border-[#0F766E] bg-[#E8F1EF]"
                      : "border-[#1B2B2A]/10 bg-white hover:border-[#0F766E]/40")
                  }
                >
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="block text-[15px] font-semibold">{feature.title}</span>
                      <span className="mt-0.5 block text-sm text-[#4B5F5D]">{feature.subtitle}</span>
                    </span>
                    <span
                      className={
                        "shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold " +
                        (selected ? "bg-[#0F766E] text-white" : "bg-[#E8F1EF] text-[#0F766E]")
                      }
                    >
                      {feature.tag}
                    </span>
                  </span>
                  {selected && (
                    <span className="mt-3 block border-t border-[#0F766E]/20 pt-3 text-sm leading-relaxed text-[#1B2B2A]">
                      {feature.description}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

export default function ImagingSection() {
  const reduce = !!useReducedMotion();

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

      <div className="relative mx-auto max-w-[1200px] space-y-12 px-6 font-sans-clean md:px-12">
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
          <a href="https://subchond.com/#assessment" onClick={handleAssessClick} className={cta + " shrink-0"}>
            Assess my imaging
          </a>
        </div>

        <p className="flex items-center gap-2 text-[15px] text-[#4B5F5D]">
          <MousePointerClick className="h-5 w-5 shrink-0 text-[#0F766E]" aria-hidden="true" />
          Select a marker on either scan to see what it shows.
        </p>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-8">
          <ScanCard modality="xray" />
          <ScanCard modality="mri" />
        </div>

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
          <a href="https://subchond.com/#assessment" onClick={handleAssessClick} className={cta + " shrink-0"}>
            Assess my imaging
          </a>
        </div>
      </div>
    </section>
  );
}
