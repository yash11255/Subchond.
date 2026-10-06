"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  Sparkles,
  Layers,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  Microscope,
  Stethoscope,
} from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";

export default function SubchondralScienceSection() {
  const [activeSubstance, setActiveSubstance] = useState<"bmc" | "prp">("bmc");
  const reduce = useReducedMotion();

  return (
    <section
      id="subchondral-science"
      className="relative w-full bg-[#FAF8F5] py-20 md:py-32 font-sans-clean text-[#1B2B2A] border-b border-[#0F766E]/15"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Eyebrow & Headline */}
        <div className="max-w-[920px] space-y-6">
          <SectionEyebrow text="05 / THE SCIENCE BENEATH THE CARTILAGE" darkBg={false} />

          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold uppercase tracking-tight text-[#1B2B2A] leading-[1.02]">
            What Is a Subchondral Injection? <br />
            <span className="text-[#0F766E] normal-case">Targeting the Root of Joint Pain.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#3F5452] leading-relaxed font-medium">
            A subchondral injection is an advanced, minimally invasive orthopaedic procedure that places
            concentrated biological healing substances—such as <strong>Bone Marrow Concentrate (BMC)</strong> or{" "}
            <strong>Platelet-Rich Plasma (PRP)</strong>—directly into the bone marrow space{" "}
            <strong>2 to 5 mm beneath the joint’s articular cartilage</strong>.
          </p>
        </div>

        {/* ----------------- The Fundamental Contrast ----------------- */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Card A: Traditional Injections (Surface Only) */}
          <div className="rounded-3xl border border-[#1B2B2A]/10 bg-white p-8 md:p-10 shadow-sm flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-red-100 text-[#9F1239] px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                  Traditional Approach
                </span>
                <span className="text-xs font-semibold text-[#4B5F5D]">Intra-Articular Space</span>
              </div>

              <h3 className="font-serif-display text-2xl font-bold text-[#1B2B2A]">
                Conventional Surface Injections
              </h3>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#E8F1EF] border border-[#1B2B2A]/10">
                <Image
                  src="/assets/oa-cutaway.webp"
                  alt="Anatomy diagram showing cartilage surface wear and breakdown"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 text-xs font-semibold text-white">
                  Steroids / Hyaluronic Acid wash away in joint fluid
                </p>
              </div>

              <div className="space-y-2.5 text-sm text-[#4B5F5D] leading-relaxed pt-2">
                <p className="flex items-start gap-2.5">
                  <span className="text-[#9F1239] font-bold shrink-0">✕</span>
                  <span>
                    <strong>Avascular & Aneural:</strong> Cartilage has no blood supply and no nerves. Surface injections cannot regenerate damaged bone beneath it.
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-[#9F1239] font-bold shrink-0">✕</span>
                  <span>
                    <strong>Fluid Clearance:</strong> Substances injected into joint fluid wash out through lymphatic drainage within hours to days.
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-[#9F1239] font-bold shrink-0">✕</span>
                  <span>
                    <strong>Leaves Bone Pain Untreated:</strong> The deep bone bruise and micro-cracks under the cartilage continue to deteriorate.
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1B2B2A]/10 text-xs font-medium text-[#4B5F5D]">
              Result: Temporary symptom relief with ongoing structural joint decline.
            </div>
          </div>

          {/* Card B: SUBCHOND Targeted Delivery */}
          <div className="rounded-3xl border-2 border-[#0F766E] bg-gradient-to-br from-[#E8F1EF] via-[#FFFFFF] to-[#E8F1EF] p-8 md:p-10 shadow-lg flex flex-col justify-between">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#0F766E] text-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider">
                  The SUBCHOND™ Protocol
                </span>
                <span className="text-xs font-bold text-[#0F766E]">Subchondral Bone Plate</span>
              </div>

              <h3 className="font-serif-display text-2xl font-bold text-[#1B2B2A]">
                Targeted Subchondral Biotherapy
              </h3>

              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#12302D] border border-[#0F766E]/30">
                <Image
                  src="/assets/knee-bml-mri.png"
                  alt="MRI scan demonstrating precision subchondral bone marrow lesion target"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-4 text-xs font-semibold text-[#A7F3D0]">
                  Targeting the Bone Marrow Lesion (BML) directly
                </p>
              </div>

              <div className="space-y-2.5 text-sm text-[#1B2B2A] leading-relaxed pt-2">
                <p className="flex items-start gap-2.5">
                  <span className="text-[#0F766E] font-bold shrink-0">✓</span>
                  <span>
                    <strong>Direct into the Bone Bed:</strong> BMC/PRP is infused straight into the micro-porous bone marrow where pain receptors live.
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-[#0F766E] font-bold shrink-0">✓</span>
                  <span>
                    <strong>Rebuilds Trabecular Shock Absorption:</strong> Mesenchymal cells remodel cracked bone trabeculae back into resilient bone.
                  </span>
                </p>
                <p className="flex items-start gap-2.5">
                  <span className="text-[#0F766E] font-bold shrink-0">✓</span>
                  <span>
                    <strong>Restores Cartilage Nutrition:</strong> Re-opens micro-vascular channels that provide 50% of deep cartilage nutrients.
                  </span>
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#0F766E]/20 text-xs font-bold text-[#0F766E]">
              Result: Long-term joint preservation. 80–82% avoided knee replacement at 15-year follow-up.
            </div>
          </div>
        </div>

        {/* ----------------- The 2 Healing Substances ----------------- */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                AUTOLOGOUS BIOLOGICAL AGENTS
              </p>
              <h3 className="font-serif-display text-3xl font-bold text-[#1B2B2A] mt-1">
                The Biological Payloads: BMC vs. PRP
              </h3>
            </div>

            {/* Toggle Pills */}
            <div className="inline-flex rounded-full bg-white p-1 border border-[#0F766E]/20 shadow-sm shrink-0">
              <button
                type="button"
                onClick={() => setActiveSubstance("bmc")}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeSubstance === "bmc"
                    ? "bg-[#0F766E] text-white shadow"
                    : "text-[#4B5F5D] hover:text-[#1B2B2A]"
                }`}
              >
                1. Bone Marrow Concentrate (BMC)
              </button>
              <button
                type="button"
                onClick={() => setActiveSubstance("prp")}
                className={`rounded-full px-5 py-2 text-xs font-bold transition-all ${
                  activeSubstance === "prp"
                    ? "bg-[#0F766E] text-white shadow"
                    : "text-[#4B5F5D] hover:text-[#1B2B2A]"
                }`}
              >
                2. Platelet-Rich Plasma (PRP)
              </button>
            </div>
          </div>

          {activeSubstance === "bmc" ? (
            <div className="rounded-3xl border border-[#0F766E]/20 bg-white p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#0F766E]/10 px-3 py-1 text-xs font-bold text-[#0F766E]">
                  <Microscope className="w-4 h-4" />
                  <span>GOLD STANDARD FOR SUBCHONDRAL BONE</span>
                </div>

                <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1B2B2A]">
                  Bone Marrow Concentrate (BMC / BMAC)
                </h4>

                <p className="text-base text-[#3F5452] leading-relaxed">
                  Aspirated gently from the patient’s iliac crest (pelvic bone) under local anaesthesia and concentrated
                  in an automated centrifugation system. BMC contains a dense population of regenerative signaling cells
                  and anti-inflammatory cytokines.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#E8F1EF] border border-[#0F766E]/15">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                      Mesenchymal Stem Cells (MSCs)
                    </h5>
                    <p className="text-xs text-[#3F5452] mt-1 leading-relaxed">
                      Differentiate into osteoblasts and trigger active trabecular bone repair inside damaged bone marrow lesions.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#E8F1EF] border border-[#0F766E]/15">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">
                      IL-1Ra (Receptor Antagonist)
                    </h5>
                    <p className="text-xs text-[#3F5452] mt-1 leading-relaxed">
                      A potent natural protein that binds to inflammatory receptors, shutting down enzymes (MMP-13) that dissolve cartilage.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#1B2B2A]/10 text-xs text-[#4B5F5D] leading-relaxed">
                  <strong>Why it matters:</strong> Unlike synthetic bone cements, BMC is 100% natural, autologous,
                  and provides living biological remodeling without introducing foreign ceramic materials.
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/dr3.png"
                  alt="Dr. Manu Bora evaluating MRI scan for subchondral BMC injection targets"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-bold">Dr. Manu Bora</p>
                  <p className="text-xs text-white/80">Planning 3D coordinates for subchondral BMC delivery</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-[#0F766E]/20 bg-white p-8 md:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full bg-[#C2410C]/10 px-3 py-1 text-xs font-bold text-[#C2410C]">
                  <Zap className="w-4 h-4" />
                  <span>GROWTH FACTOR BIO-STIMULATION</span>
                </div>

                <h4 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1B2B2A]">
                  Platelet-Rich Plasma (PRP)
                </h4>

                <p className="text-base text-[#3F5452] leading-relaxed">
                  Obtained through a routine blood draw from the arm and spun to isolate platelets at 4–8 times baseline concentration.
                  When injected into the subchondral micro-vasculature, platelets degranulate and release critical growth factors.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#C2410C]/20">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#C2410C]">
                      Angiogenic Factors (VEGF, bFGF)
                    </h5>
                    <p className="text-xs text-[#3F5452] mt-1 leading-relaxed">
                      Re-establish capillary micro-circulation in ischemic subchondral bone, restoring nutrient flow.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#FFF8EE] border border-[#C2410C]/20">
                    <h5 className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                      Tissue Growth Factors (TGF-β, PDGF)
                    </h5>
                    <p className="text-xs text-[#3F5452] mt-1 leading-relaxed">
                      Stimulate extracellular matrix synthesis and decrease chronic synovitis and joint effusion.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#1B2B2A]/10 text-xs text-[#4B5F5D] leading-relaxed">
                  <strong>Synergistic Protocol:</strong> Dr. Manu Bora often uses PRP in combination with BMC
                  to achieve both bone remodeling (via BMC) and accelerated soft tissue healing.
                </div>
              </div>

              <div className="lg:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/assets/ot/ot-08.webp"
                  alt="Sterile operating theatre preparation of autologous biological concentrate"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-bold">Sterile Closed-Loop Preparation</p>
                  <p className="text-xs text-white/80">Maximum viability of platelets and autologous factors</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ----------------- The 4 Biological Mechanisms Grid ----------------- */}
        <div className="mt-20">
          <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-2">
            HOW IT HEALS FROM WITHIN
          </p>
          <h3 className="font-serif-display text-3xl font-bold text-[#1B2B2A] mb-10">
            The 4 Mechanisms of Subchondral Action
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Mechanism 1 */}
            <div className="p-6 rounded-3xl bg-white border border-[#0F766E]/15 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F1EF] text-[#0F766E] flex items-center justify-center">
                  <Layers className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display font-bold text-lg text-[#1B2B2A]">
                  1. Trabecular Bone Remodeling
                </h4>
                <p className="text-xs text-[#4B5F5D] leading-relaxed">
                  When subchondral bone is stressed, micro-trabeculae fracture and collapse. Injected progenitor cells trigger osteogenesis, rebuilding resilient trabecular bone.
                </p>
              </div>
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden mt-4">
                <Image
                  src="/images/bonestress.png"
                  alt="Bone stress diagram"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mechanism 2 */}
            <div className="p-6 rounded-3xl bg-white border border-[#0F766E]/15 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF8EE] text-[#C2410C] flex items-center justify-center">
                  <Flame className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display font-bold text-lg text-[#1B2B2A]">
                  2. Relieves Deep Bone Pain
                </h4>
                <p className="text-xs text-[#4B5F5D] leading-relaxed">
                  Subchondral bone is densely packed with sensory pain nerves. Resolving the intraosseous edema and pressure shuts down the constant deep bone ache.
                </p>
              </div>
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden mt-4">
                <Image
                  src="/images/load-distribution.png"
                  alt="Load distribution diagram"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mechanism 3 */}
            <div className="p-6 rounded-3xl bg-white border border-[#0F766E]/15 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F1EF] text-[#0F766E] flex items-center justify-center">
                  <Activity className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display font-bold text-lg text-[#1B2B2A]">
                  3. Restores Cartilage Nutrition
                </h4>
                <p className="text-xs text-[#4B5F5D] leading-relaxed">
                  50% of the glucose and oxygen needed by deep articular cartilage diffuses through the subchondral plate. Restoring bone micro-circulation feeds the cartilage.
                </p>
              </div>
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden mt-4">
                <Image
                  src="/images/knee-anatomy.png"
                  alt="Knee anatomy diagram"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Mechanism 4 */}
            <div className="p-6 rounded-3xl bg-white border border-[#0F766E]/15 shadow-sm space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F1EF] text-[#0F766E] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h4 className="font-serif-display font-bold text-lg text-[#1B2B2A]">
                  4. Neutralizes Destructive Enzymes
                </h4>
                <p className="text-xs text-[#4B5F5D] leading-relaxed">
                  High concentrations of autologous IL-1Ra neutralize catabolic enzymes (MMP-13, ADAMTS-5), forming a protective biochemical shield around the natural joint.
                </p>
              </div>
              <div className="relative aspect-[3/2] rounded-xl overflow-hidden mt-4">
                <Image
                  src="/assets/hero-anatomy.png"
                  alt="Cartilage and joint preservation anatomy"
                  fill
                  sizes="200px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- Procedure Walkthrough (OT Real Images) ----------------- */}
        <div className="mt-20 rounded-3xl bg-gradient-to-r from-[#12302D] to-[#1B2B2A] text-white p-8 md:p-12 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-white/10 pb-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#A7F3D0]">
                MINIMALLY INVASIVE DAY-CARE PROTOCOL
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold">
                How Dr. Manu Bora Performs the Procedure
              </h3>
            </div>
            <a
              href="#contact-appointment"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C2410C] px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-[#EA580C] transition-colors"
            >
              Discuss Your Eligibility
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15">
                <Image
                  src="/images/scan.png"
                  alt="MRI 3D localization of subchondral lesions"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 text-[#1B2B2A] text-xs font-bold px-2.5 py-0.5">
                  01
                </span>
              </div>
              <h5 className="font-serif-display font-bold text-base">3D MRI Mapping</h5>
              <p className="text-xs text-white/80 leading-relaxed">
                Precise 3T MRI mapping identifies the exact location and volume of bone marrow edema on the femur or tibia.
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15">
                <Image
                  src="/assets/ot/ot-01.webp"
                  alt="Biological harvesting and concentration"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 text-[#1B2B2A] text-xs font-bold px-2.5 py-0.5">
                  02
                </span>
              </div>
              <h5 className="font-serif-display font-bold text-base">Autologous Harvest</h5>
              <p className="text-xs text-white/80 leading-relaxed">
                Under gentle local anaesthesia, bone marrow or blood is aspirated and concentrated in a closed sterile centrifuge.
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15">
                <Image
                  src="/assets/ot/ot-03.webp"
                  alt="Fluoroscopic and arthroscopic needle positioning"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 text-[#1B2B2A] text-xs font-bold px-2.5 py-0.5">
                  03
                </span>
              </div>
              <h5 className="font-serif-display font-bold text-base">Guided Cannula Placement</h5>
              <p className="text-xs text-white/80 leading-relaxed">
                Using live fluoroscopy and keyhole arthroscopy, Dr. Bora guides a micro-cannula through a 2 mm skin pinhole into the bone.
              </p>
            </div>

            <div className="space-y-3">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-white/15">
                <Image
                  src="/assets/ot/ot-07.webp"
                  alt="Controlled infusion and same-day discharge"
                  fill
                  sizes="300px"
                  className="object-cover"
                />
                <span className="absolute top-2.5 left-2.5 rounded-full bg-white/90 text-[#1B2B2A] text-xs font-bold px-2.5 py-0.5">
                  04
                </span>
              </div>
              <h5 className="font-serif-display font-bold text-base">Micro-Infusion & Discharge</h5>
              <p className="text-xs text-white/80 leading-relaxed">
                The concentrate is gently infused into trabecular spaces. Takes 45–60 minutes; patient walks out the same day.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
