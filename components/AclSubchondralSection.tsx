"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  ShieldAlert,
  Zap,
  Activity,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  Play,
} from "lucide-react";
import SectionEyebrow from "./SectionEyebrow";

interface AclBenefit {
  id: string;
  badge: string;
  title: string;
  shortDesc: string;
  clinicalMechanism: string;
  whyItMatters: string;
  icon: React.ElementType;
}

const ACL_BENEFITS: AclBenefit[] = [
  {
    id: "bone-bruise",
    badge: "Acute Trauma",
    title: "Heals Severe Subchondral Bone Bruises (BMLs)",
    shortDesc: "In over 80% of acute ACL tears, the impact causes deep bone micro-fractures.",
    clinicalMechanism:
      "During the pivot-shift event, the lateral femoral condyle violently impacts the posterior tibial plateau. This crushes microscopic trabeculae and pools fluid inside the subchondral bone marrow. Standard surgery only fixes the torn ligament—leaving this severe bone edema untouched to cause chronic pain.",
    whyItMatters:
      "Targeted subchondral BMC delivery provides mesenchymal signaling cells and growth factors directly into the injured bone marrow, accelerating trabecular healing and eliminating deep joint ache within weeks.",
    icon: ShieldAlert,
  },
  {
    id: "graft-integration",
    badge: "Biological Healing",
    title: "Accelerates Graft-to-Bone Integration (Ligamentization)",
    shortDesc: "The ACL graft must biologically fuse with the bone tunnels to restore stability.",
    clinicalMechanism:
      "When a tendon graft is passed through femoral and tibial bone tunnels, healing requires biological fibrocartilage transition and osteointegration. Subchondral BMC injected at tunnel apertures enriches the bone interface with autologous regenerative cells.",
    whyItMatters:
      "Dramatically enhances biological graft fixation, reduces tunnel widening risk, and supports earlier, safer return to high-intensity athletic conditioning.",
    icon: Zap,
  },
  {
    id: "prevent-ptoa",
    badge: "Long-Term Protection",
    title: "Halts Post-Traumatic Osteoarthritis (PTOA)",
    shortDesc: "50% of ACL patients develop knee arthritis within 10–15 years without joint protection.",
    clinicalMechanism:
      "The violent impact damages chondrocytes and degrades the subchondral cushion. Even with a tight, stable ligament graft, the biochemical environment floods with catabolic cytokines (MMP-13, TNF-α). Subchondral BMC delivers high concentrations of IL-1Ra to neutralize destructive enzymes.",
    whyItMatters:
      "Protects young athletes from becoming knee replacement candidates in their 30s and 40s. Preserves native joint cushioning for life.",
    icon: Activity,
  },
  {
    id: "meniscus-protection",
    badge: "Whole-Joint Longevity",
    title: "Protects Meniscus & Surrounding Articular Cartilage",
    shortDesc: "Secondary meniscus tears are common after ACL injury when the bed is compromised.",
    clinicalMechanism:
      "A healthy subchondral plate distributes walking and landing forces evenly. When subchondral bone stays bruised, uneven stress concentrations shear overlying cartilage and tear meniscus repairs. Subchondral restoration restores normal shock absorption.",
    whyItMatters:
      "Ensures that accompanying meniscus repairs heal securely in a biologically supportive, low-inflammation joint environment.",
    icon: Layers,
  },
];

export default function AclSubchondralSection() {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);

  const active = ACL_BENEFITS[activeTab];

  return (
    <section
      id="acl-joint-preservation"
      className="relative w-full bg-[#FFFFFF] py-20 md:py-32 font-sans-clean text-[#1B2B2A] border-b border-[#0F766E]/15"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="max-w-[840px] space-y-6">
          <SectionEyebrow text="ACL & SPORTS INJURY PRESERVATION" darkBg={false} />

          <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#1B2B2A] leading-[1.02]">
            Why SUBCHOND™ is essential <br />
            <span className="text-[#0F766E] normal-case">After an ACL Tear.</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4B5F5D] leading-relaxed font-medium">
            Standard knee surgery replaces the torn ligament—but ignores the violent bone impact underneath.
            In over 80% of ACL ruptures, the underlying subchondral bone sustains micro-fractures (bone marrow lesions)
            that cause persistent pain and trigger premature arthritis.
          </p>
        </div>

        {/* Doctor Quote Banner with Real Photo */}
        <div className="mt-12 rounded-3xl bg-gradient-to-r from-[#E8F1EF] via-[#FAF8F5] to-[#E8F1EF] border border-[#0F766E]/20 p-8 md:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-3 flex flex-col items-center sm:flex-row sm:items-center lg:flex-col lg:items-center gap-4 text-center sm:text-left lg:text-center">
            <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full overflow-hidden border-4 border-white shadow-md shrink-0">
              <Image
                src="/dr-manu-bora.jpg"
                alt="Dr. Manu Bora, Orthopaedic Surgeon and ACL Specialist"
                fill
                sizes="128px"
                className="object-cover object-top"
              />
            </div>
            <div>
              <h3 className="font-serif-display font-bold text-lg text-[#1B2B2A]">Dr. Manu Bora</h3>
              <p className="text-xs uppercase font-bold tracking-wider text-[#0F766E]">
                Arthrex Master Instructor
              </p>
              <p className="text-xs text-[#4B5F5D] mt-0.5">10,000+ Knee & ACL Procedures</p>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F766E]/10 px-3 py-1 text-xs font-semibold text-[#0F766E]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>CLINICAL PERSPECTIVE</span>
            </div>
            <blockquote className="font-serif-display text-lg sm:text-xl md:text-2xl italic leading-relaxed text-[#1B2B2A]">
              &ldquo;An ACL tear is not an isolated ligament injury. During the pivot-shift event, bone slams into bone,
              leaving a severe subchondral bone bruise that standard ACL surgery leaves completely untreated.
              By biologically treating the subchondral bone alongside ligament reconstruction, we protect the joint bed,
              accelerate graft osteointegration, and safeguard our athletes from post-traumatic arthritis.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Interactive Deep-Dive Grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Tabs on Left */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E] mb-2">
              4 WAYS SUBCHOND™ TRANSFORMS ACL RECOVERY
            </p>
            {ACL_BENEFITS.map((item, idx) => {
              const Icon = item.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 flex items-start gap-4 ${
                    isActive
                      ? "bg-[#0F766E] text-white border-[#0F766E] shadow-md shadow-[#0F766E]/20"
                      : "bg-[#F7FAF9] text-[#1B2B2A] border-[#0F766E]/15 hover:border-[#0F766E]/40 hover:bg-[#FFFFFF]"
                  }`}
                >
                  <div
                    className={`p-2.5 rounded-xl shrink-0 ${
                      isActive ? "bg-white/20 text-white" : "bg-[#0F766E]/10 text-[#0F766E]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span
                      className={`text-[11px] font-bold uppercase tracking-wider block ${
                        isActive ? "text-white/80" : "text-[#C2410C]"
                      }`}
                    >
                      {item.badge}
                    </span>
                    <h4 className="font-serif-display font-bold text-base sm:text-lg leading-snug mt-0.5">
                      {item.title}
                    </h4>
                    <p
                      className={`text-xs mt-1 line-clamp-2 ${
                        isActive ? "text-white/90" : "text-[#4B5F5D]"
                      }`}
                    >
                      {item.shortDesc}
                    </p>
                  </div>
                  <ChevronRight
                    className={`w-5 h-5 shrink-0 transition-transform ${
                      isActive ? "text-white translate-x-1" : "text-[#4B5F5D]/40"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Active Detail Showcase on Right */}
          <div className="lg:col-span-7 bg-[#F7FAF9] rounded-3xl border border-[#0F766E]/20 p-8 md:p-10 shadow-sm space-y-6">
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#C2410C]/10 text-[#C2410C] px-3 py-1 text-xs font-bold uppercase tracking-wide">
                {active.badge}
              </span>
              <span className="text-xs font-semibold text-[#0F766E]">Clinical Mechanism</span>
            </div>

            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1B2B2A] leading-tight">
              {active.title}
            </h3>

            <div className="space-y-4 pt-2">
              <div className="p-5 rounded-2xl bg-[#FFFFFF] border border-[#0F766E]/15 space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#0F766E] flex items-center gap-2">
                  <Activity className="w-4 h-4 text-[#0F766E]" />
                  What Happens in the Knee
                </h5>
                <p className="text-sm sm:text-base text-[#3F5452] leading-relaxed">
                  {active.clinicalMechanism}
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-[#E8F1EF]/70 border border-[#0F766E]/15 space-y-2">
                <h5 className="text-xs font-bold uppercase tracking-wider text-[#C2410C] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C2410C]" />
                  The SUBCHOND™ Advantage
                </h5>
                <p className="text-sm sm:text-base text-[#1B2B2A] font-medium leading-relaxed">
                  {active.whyItMatters}
                </p>
              </div>
            </div>

            {/* Comparison Callout */}
            <div className="pt-4 border-t border-[#0F766E]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-xs text-[#4B5F5D]">Have an MRI scan of your ACL or knee?</p>
                <p className="text-sm font-semibold text-[#1B2B2A]">
                  Dr. Manu Bora reviews MRI scans for subchondral bone bruises.
                </p>
              </div>
              <a
                href="#contact-appointment"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#9A3412] transition-colors"
              >
                Send MRI for ACL Review
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Comparison Matrix: Standard ACL vs SUBCHOND-Augmented ACL */}
        <div className="mt-16 overflow-hidden rounded-3xl border border-[#0F766E]/20 bg-[#FFFFFF] shadow-sm">
          <div className="bg-[#12302D] px-6 py-5 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h4 className="font-serif-display text-xl font-bold uppercase tracking-wide">
                Standard ACL Reconstruction vs. SUBCHOND™ Whole-Joint Care
              </h4>
              <p className="text-xs text-white/80 font-sans-clean">
                Why modern orthopaedics treats the bone bed alongside ligament reconstruction
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full text-white">
              Evidence-Based Comparison
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-[#1B2B2A]">
              <thead className="bg-[#E8F1EF] text-xs font-bold uppercase text-[#0F766E] border-b border-[#0F766E]/20">
                <tr>
                  <th className="px-6 py-4">Clinical Factor</th>
                  <th className="px-6 py-4 text-[#4B5F5D]">Standard ACL Surgery Only</th>
                  <th className="px-6 py-4 text-[#0F766E] font-bold">SUBCHOND™ Augmented ACL Care</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#0F766E]/10 font-medium text-xs sm:text-sm">
                <tr>
                  <td className="px-6 py-4 font-bold text-[#1B2B2A]">Torn ACL Ligament</td>
                  <td className="px-6 py-4 text-[#4B5F5D]">Reconstructed with tendon graft</td>
                  <td className="px-6 py-4 text-[#0F766E] font-semibold">
                    Reconstructed with anatomical precision
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-[#1B2B2A]">Subchondral Bone Bruise (BML)</td>
                  <td className="px-6 py-4 text-[#C2410C]">
                    Untreated (often lasts 12–24 months as chronic ache)
                  </td>
                  <td className="px-6 py-4 text-[#0F766E] font-semibold">
                    Targeted BMC injection heals bone trabeculae rapidly
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-[#1B2B2A]">Graft-to-Bone Tunnel Healing</td>
                  <td className="px-6 py-4 text-[#4B5F5D]">
                    Mechanical healing alone (risk of tunnel widening)
                  </td>
                  <td className="px-6 py-4 text-[#0F766E] font-semibold">
                    Biological stimulation accelerates osteointegration
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-[#1B2B2A]">10-Year Osteoarthritis (PTOA) Risk</td>
                  <td className="px-6 py-4 text-[#C2410C]">
                    ~50% develop post-traumatic arthritis
                  </td>
                  <td className="px-6 py-4 text-[#0F766E] font-semibold">
                    Protects cartilage cushion from secondary degeneration
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-bold text-[#1B2B2A]">Return to High-Impact Sport</td>
                  <td className="px-6 py-4 text-[#4B5F5D]">
                    Delayed by lingering deep bone ache & stiffness
                  </td>
                  <td className="px-6 py-4 text-[#0F766E] font-semibold">
                    Accelerated confidence, zero residual bone edema
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
