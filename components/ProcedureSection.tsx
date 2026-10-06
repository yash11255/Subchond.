"use client";

import React, { useId, useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Play, Pause, RotateCcw } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Step Content                                                       */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: "Plan the target",
    short: "Targeting",
    description:
      "Your MRI imaging shows the exact location of the bone marrow lesion in the knee, in the spongy bone just beneath the cartilage. That area becomes the precise target.",
    progress: 0.12,
  },
  {
    title: "Guide the needle",
    short: "Navigation",
    description:
      "Under real-time fluoroscopic imaging, a fine needle is guided through the bone toward the lesion. It stops safely beneath the subchondral plate and never enters the joint space.",
    progress: 0.44,
  },
  {
    title: "Place the substance",
    short: "Delivery",
    description:
      "Autologous Bone Marrow Concentrate (BMC) or Platelet-Rich Plasma (PRP) is placed directly into the damaged trabecular bone at the site of the lesion, bathing the bone marrow in healing signaling cells.",
    progress: 0.72,
  },
  {
    title: "Withdraw and recover",
    short: "Recovery",
    description:
      "The needle is gently removed while the regenerative cells remain sealed within the bone bed. You follow guided mobility and progressive load instructions.",
    progress: 0.94,
  },
];

export default function ProcedureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const uid = useId().replace(/:/g, "");

  // Interactive controls state
  const [isPlaying, setIsPlaying] = useState(false);
  const [manualProgress, setManualProgress] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  // Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth progress spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  // Active progress value (0 to 1)
  const [activeP, setActiveP] = useState(0);

  // Auto-play timer
  useEffect(() => {
    let animId: number;
    let lastTime: number | null = null;

    if (isPlaying) {
      const step = (time: number) => {
        if (lastTime === null) lastTime = time;
        const delta = (time - lastTime) / 1000;
        lastTime = time;

        setActiveP((prev) => {
          const next = prev + delta * 0.15; // 6-7 seconds for full loop
          if (next >= 1) {
            return 0; // loop
          }
          return next;
        });

        animId = requestAnimationFrame(step);
      };
      animId = requestAnimationFrame(step);
    }

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  // Sync scroll to activeP when not manually playing/scrubbing
  useEffect(() => {
    if (!isPlaying && manualProgress === null) {
      const unsubscribe = smoothProgress.on("change", (v) => {
        const clamped = Math.min(Math.max(v, 0), 1);
        setActiveP(clamped);
      });
      return () => unsubscribe();
    }
  }, [smoothProgress, isPlaying, manualProgress]);

  // Update active step based on progress
  useEffect(() => {
    if (activeP < 0.28) setCurrentStep(0);
    else if (activeP < 0.58) setCurrentStep(1);
    else if (activeP < 0.82) setCurrentStep(2);
    else setCurrentStep(3);
  }, [activeP]);

  // Manual jump to step
  const handleSelectStep = (index: number) => {
    setIsPlaying(false);
    setManualProgress(STEPS[index].progress);
    setActiveP(STEPS[index].progress);
  };

  // Slider scrubber change
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPlaying(false);
    const val = parseFloat(e.target.value);
    setManualProgress(val);
    setActiveP(val);
  };

  // Reset
  const handleReset = () => {
    setIsPlaying(false);
    setManualProgress(0);
    setActiveP(0);
  };

  /* ------------------------------------------------------------------ */
  /* Animation Math for SVG Elements                                    */
  /* ------------------------------------------------------------------ */

  // 1. Whole knee zoom (0.0 to 0.28)
  const zoomT = Math.min(Math.max((activeP - 0.05) / 0.22, 0), 1);
  const kneeScale = 1 + zoomT * 1.8;
  const kneeX = -zoomT * 140;
  const kneeY = -zoomT * 110;
  const wholeKneeOpacity = activeP < 0.22 ? 1 : Math.max(0, 1 - (activeP - 0.22) / 0.08);

  // 2. Close-up fade-in (0.22 to 0.30)
  const closeUpOpacity = activeP < 0.22 ? 0 : Math.min(1, (activeP - 0.22) / 0.08);

  // 3. Needle X movement (0.30 to 0.58 advances; 0.80 to 0.95 withdraws)
  let needleX = -320;
  let needleOpacity = 0;
  if (activeP >= 0.28 && activeP < 0.58) {
    const t = (activeP - 0.28) / 0.28;
    needleX = -320 + t * 320;
    needleOpacity = Math.min(1, t * 4);
  } else if (activeP >= 0.58 && activeP <= 0.82) {
    needleX = 0;
    needleOpacity = 1;
  } else if (activeP > 0.82) {
    const t = Math.min(1, (activeP - 0.82) / 0.14);
    needleX = -t * 320;
    needleOpacity = Math.max(0, 1 - t * 1.5);
  }

  // 4. Plunger & Liquid scale inside syringe (0.58 to 0.80)
  let plungerX = 0;
  let liquidScale = 1;
  if (activeP >= 0.58 && activeP <= 0.82) {
    const t = (activeP - 0.58) / 0.24;
    plungerX = t * 55;
    liquidScale = 1 - t * 0.75;
  } else if (activeP > 0.82) {
    plungerX = 55;
    liquidScale = 0.25;
  }

  // 5. Substance fluid expansion in bone lesion (0.60 to 0.82)
  let fluidScale = 0;
  let fluidOpacity = 0;
  if (activeP >= 0.58) {
    const t = Math.min(1, (activeP - 0.58) / 0.22);
    fluidScale = t;
    fluidOpacity = Math.min(0.95, t * 1.2);
  }

  const activeStepData = STEPS[currentStep];

  return (
    <section
      id="procedure-animation"
      aria-label="How a subchondral injection works"
      className="relative w-full bg-gradient-to-br from-[#FAF8F5] via-[#F7FAF9] to-[#F6F1E9] font-sans-clean text-[#1B2B2A] border-b border-[#0F766E]/15"
    >
      <div ref={containerRef} className="relative min-h-[180vh] md:min-h-[220vh]">
        {/* Sticky Viewport Container */}
        <div className="sticky top-16 md:top-20 min-h-[calc(100vh-5rem)] flex items-center py-6 md:py-10">
          <div className="mx-auto w-full max-w-[1320px] px-6 md:px-12">
            
            {/* Header with Title and Interactive Controls */}
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="inline-block rounded-full bg-[#DDF1E8] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#2F7D5B]">
                    Interactive Walkthrough
                  </span>
                  <span className="text-xs text-[#0F766E] font-semibold">
                    Step {currentStep + 1} of 4
                  </span>
                </div>
                <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1B2B2A]">
                  How a Subchondral Injection Works
                </h2>
              </div>

              {/* Play / Pause / Reset Controls Bar */}
              <div className="flex items-center gap-2 bg-white/90 p-2 rounded-2xl border border-[#0F766E]/20 shadow-sm backdrop-blur-sm self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setIsPlaying(!isPlaying)}
                  aria-label={isPlaying ? "Pause animation" : "Play animation"}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#0F766E] px-3.5 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#115E59] transition-all"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Play Animation</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleReset}
                  aria-label="Reset animation"
                  className="p-2 rounded-xl text-[#4B5F5D] hover:text-[#1B2B2A] hover:bg-[#E8F1EF] transition-colors"
                  title="Reset to beginning"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Progress bar scrub slider */}
                <div className="flex items-center gap-2 px-2 border-l border-[#0F766E]/15">
                  <span className="text-[11px] font-bold text-[#4B5F5D] tabular-nums">
                    {Math.round(activeP * 100)}%
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={activeP}
                    onChange={handleSliderChange}
                    className="w-20 sm:w-28 accent-[#0F766E] cursor-pointer h-1.5 bg-[#E8F1EF] rounded-lg"
                    aria-label="Animation progress timeline scrubber"
                  />
                </div>
              </div>
            </div>

            {/* Main Stage Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Step Navigation & Explanations */}
              <div className="lg:col-span-5 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0F766E]">
                  CLINICAL PHASES
                </p>

                <ol className="space-y-3">
                  {STEPS.map((s, idx) => {
                    const isActive = currentStep === idx;
                    const isDone = currentStep > idx;

                    return (
                      <li key={s.title}>
                        <button
                          type="button"
                          onClick={() => handleSelectStep(idx)}
                          className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 flex items-start gap-4 ${
                            isActive
                              ? "bg-white border-[#0F766E] shadow-md ring-2 ring-[#0F766E]/15"
                              : "bg-white/60 border-[#0F766E]/15 hover:bg-white hover:border-[#0F766E]/30"
                          }`}
                        >
                          <span
                            className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold tabular-nums transition-colors ${
                              isActive
                                ? "bg-[#C2410C] text-white"
                                : isDone
                                ? "bg-[#0F766E] text-white"
                                : "bg-[#E8F1EF] text-[#4B5F5D]"
                            }`}
                          >
                            {idx + 1}
                          </span>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <h4
                                className={`font-serif-display font-bold text-base transition-colors ${
                                  isActive ? "text-[#1B2B2A]" : "text-[#4B5F5D]"
                                }`}
                              >
                                {s.title}
                              </h4>
                              <span
                                className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                  isActive
                                    ? "bg-[#C2410C]/10 text-[#C2410C]"
                                    : "bg-black/5 text-[#4B5F5D]"
                                }`}
                              >
                                {s.short}
                              </span>
                            </div>

                            {isActive && (
                              <p className="mt-2 text-xs sm:text-sm text-[#3F5452] leading-relaxed font-sans-clean animate-fadeIn">
                                {s.description}
                              </p>
                            )}
                          </div>
                        </button>
                      </li>
                    );
                  })}
                </ol>

                <div className="pt-2 hidden sm:block">
                  <p className="text-xs text-[#4B5F5D] leading-relaxed">
                    💡 <strong className="text-[#1B2B2A]">Tip:</strong> Click any step above or scroll down to watch the needle enter the bone beneath the cartilage.
                  </p>
                </div>
              </div>

              {/* Right Column: Animated Dynamic SVG Stage */}
              <div className="lg:col-span-7">
                <div className="relative aspect-[600/460] w-full overflow-hidden rounded-3xl border border-[#0F766E]/20 bg-[#F3F8F7] shadow-xl">
                  
                  {/* SVG Canvas */}
                  <svg
                    viewBox="0 0 600 460"
                    role="img"
                    aria-label="Schematic cross-section of the knee joint showing subchondral bone injection"
                    className="absolute inset-0 h-full w-full"
                  >
                    <defs>
                      <pattern id={`${uid}-trab`} width="16" height="16" patternUnits="userSpaceOnUse">
                        <path d="M0 4 Q4 0 8 4 T16 4 M0 12 Q4 8 8 12 T16 12" fill="none" stroke="#D6C6A8" strokeWidth="1" />
                      </pattern>
                      <radialGradient id={`${uid}-lesion`}>
                        <stop offset="0%" stopColor="#EA580C" stopOpacity="0.75" />
                        <stop offset="65%" stopColor="#EA580C" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
                      </radialGradient>
                      <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#CBD5E1" />
                        <stop offset="100%" stopColor="#64748B" />
                      </linearGradient>
                    </defs>

                    {/* ===================== VIEW 1: Whole Knee (Zooms in) ===================== */}
                    {wholeKneeOpacity > 0 && (
                      <g
                        style={{ opacity: wholeKneeOpacity }}
                        transform={`translate(${kneeX}, ${kneeY}) scale(${kneeScale})`}
                      >
                        <rect x="0" y="0" width="600" height="460" fill="transparent" />

                        {/* Femur (Thigh bone) */}
                        <path
                          d="M246 0 L354 0 C358 70 366 110 380 138 C404 160 422 176 414 198 C406 216 340 214 306 204 C302 202 298 202 294 204 C260 214 194 216 186 198 C178 176 196 160 220 138 C234 110 242 70 246 0 Z"
                          fill="#E9DDC4"
                          stroke="#BFA47A"
                          strokeWidth="2"
                        />
                        {/* Femoral Cartilage */}
                        <path
                          d="M188 197 C194 217 262 215 296 205 M304 205 C338 215 406 217 412 197"
                          fill="none"
                          stroke="#0F766E"
                          strokeWidth="6"
                          strokeLinecap="round"
                        />
                        {/* Menisci */}
                        <path d="M196 218 Q246 213 292 218 L284 233 Q244 236 204 233 Z" fill="#94A3B8" />
                        <path d="M308 218 Q354 213 404 218 L396 233 Q356 236 316 233 Z" fill="#94A3B8" />

                        {/* Fibula */}
                        <path d="M392 284 Q418 282 424 304 L416 460 L394 460 L390 340 Z" fill="#EADFC9" stroke="#BFA47A" strokeWidth="2" />
                        
                        {/* Tibia (Shin bone) */}
                        <path
                          d="M190 246 Q300 256 410 246 L404 276 C384 290 368 312 358 344 L352 460 L248 460 L242 344 C232 312 216 290 196 276 Z"
                          fill="#E9DDC4"
                          stroke="#BFA47A"
                          strokeWidth="2"
                        />
                        {/* Tibial Cartilage & Subchondral Plate */}
                        <path d="M192 236 Q300 244 408 236 L410 247 Q300 258 190 247 Z" fill="#99F6E4" stroke="#0F766E" strokeWidth="1.5" />
                        <path d="M192 250 Q300 260 408 250 L406 258 Q300 268 194 258 Z" fill="#CDB892" />

                        {/* Target Bone Marrow Lesion with Radar Pulse */}
                        <ellipse cx="250" cy="276" rx="36" ry="16" fill={`url(#${uid}-lesion)`} />
                        <circle
                          cx="250"
                          cy="272"
                          r="46"
                          fill="none"
                          stroke="#C2410C"
                          strokeWidth="2.5"
                          strokeDasharray="6 4"
                          className="animate-spin"
                          style={{ animationDuration: "8s" }}
                        />
                        <circle
                          cx="250"
                          cy="272"
                          r="54"
                          fill="none"
                          stroke="#EA580C"
                          strokeWidth="1.5"
                          opacity="0.6"
                        />
                      </g>
                    )}

                    {/* ===================== VIEW 2: Close-Up Subchondral Bone & Needle ===================== */}
                    {closeUpOpacity > 0 && (
                      <g style={{ opacity: closeUpOpacity }}>
                        <rect x="0" y="0" width="600" height="460" fill="#F3F8F7" />
                        
                        {/* Soft Tissue entry path on left */}
                        <rect x="0" y="0" width="60" height="460" fill="#FEE2E2" opacity="0.8" />

                        {/* Femur bone & cartilage */}
                        <rect x="0" y="0" width="600" height="34" fill="#D9CBB1" />
                        <path d="M0 34 H600 V56 Q300 68 0 56 Z" fill="#99F6E4" stroke="#0F766E" strokeWidth="1.5" />

                        {/* Tibia Cortex, Spongy Trabeculae, Subchondral Plate */}
                        <rect x="60" y="96" width="540" height="364" fill="#BFA47A" />
                        <rect x="82" y="154" width="518" height="306" fill="#EADFC9" />
                        <rect x="82" y="154" width="518" height="306" fill={`url(#${uid}-trab)`} />
                        
                        {/* Dense Subchondral Bone Plate */}
                        <rect x="60" y="138" width="540" height="16" fill="#A8926A" />
                        
                        {/* Articular Cartilage layer */}
                        <path d="M60 98 Q330 88 600 98 V138 H60 Z" fill="#5EEAD4" stroke="#0F766E" strokeWidth="2" />

                        {/* Bone Marrow Lesion (BML) Zone */}
                        <ellipse cx="330" cy="200" rx="76" ry="40" fill={`url(#${uid}-lesion)`} />
                        <ellipse
                          cx="330"
                          cy="200"
                          rx="64"
                          ry="32"
                          fill="none"
                          stroke="#C2410C"
                          strokeWidth="2"
                          strokeDasharray="6 4"
                          opacity={0.8}
                        />

                        {/* Biological Fluid Diffusion (BMC / PRP) */}
                        {fluidOpacity > 0 && (
                          <g style={{ opacity: fluidOpacity }}>
                            <ellipse
                              cx="330"
                              cy="200"
                              rx={60 * fluidScale}
                              ry={30 * fluidScale}
                              fill="#EA580C"
                              opacity="0.85"
                            />
                            <circle cx="292" cy="208" r={16 * fluidScale} fill="#C2410C" opacity="0.9" />
                            <circle cx="368" cy="192" r={14 * fluidScale} fill="#D97706" opacity="0.9" />
                            <circle cx="328" cy="222" r={12 * fluidScale} fill="#EA580C" opacity="0.85" />
                          </g>
                        )}

                        {/* Needle & Syringe */}
                        {needleOpacity > 0 && (
                          <g transform={`translate(${322 + needleX}, 200) rotate(-22)`} style={{ opacity: needleOpacity }}>
                            {/* Steel Cannula Shaft */}
                            <line x1="-214" y1="0" x2="-2" y2="0" stroke={`url(#${uid}-steel)`} strokeWidth="4.5" strokeLinecap="round" />
                            {/* Needle Hub */}
                            <rect x="-228" y="-8" width="16" height="16" rx="3" fill="#0F766E" />
                            
                            {/* Syringe Glass Barrel */}
                            <rect x="-346" y="-15" width="118" height="30" rx="4" fill="#FFFFFF" fillOpacity="0.92" stroke="#64748B" strokeWidth="1.5" />
                            
                            {/* BMC / PRP Liquid in Barrel */}
                            <rect
                              x="-304"
                              y="-11"
                              width={72 * liquidScale}
                              height="22"
                              rx="2"
                              fill="#EA580C"
                              fillOpacity="0.9"
                            />

                            {/* Graduations */}
                            {[-320, -300, -280, -260, -240].map((gx) => (
                              <line key={gx} x1={gx} y1="-15" x2={gx} y2="-9" stroke="#64748B" strokeWidth="1" />
                            ))}

                            {/* Plunger */}
                            <g transform={`translate(${plungerX}, 0)`}>
                              <rect x="-308" y="-12" width="6" height="24" fill="#334155" />
                              <line x1="-308" y1="0" x2="-440" y2="0" stroke="#334155" strokeWidth="5" />
                              <rect x="-448" y="-18" width="8" height="36" rx="2" fill="#334155" />
                            </g>
                          </g>
                        )}
                      </g>
                    )}
                  </svg>

                  {/* Anatomical HTML Labels Overlay */}
                  {wholeKneeOpacity > 0.4 && (
                    <div className="pointer-events-none absolute inset-0">
                      <span className="absolute left-[65%] top-[12%] rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#1B2B2A] shadow-sm">
                        Femur
                      </span>
                      <span className="absolute left-[68%] top-[45%] rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#0F766E] shadow-sm">
                        Cartilage & Joint Space
                      </span>
                      <span className="absolute left-[8%] top-[78%] rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#1B2B2A] shadow-sm">
                        Tibia
                      </span>
                      <span className="absolute left-[6%] top-[58%] rounded bg-[#FFF8EE] border border-[#C2410C]/30 px-2 py-0.5 text-[11px] font-bold text-[#C2410C] shadow-sm">
                        Bone Marrow Lesion
                      </span>
                    </div>
                  )}

                  {closeUpOpacity > 0.4 && (
                    <div className="pointer-events-none absolute inset-0">
                      <span className="absolute left-[70%] top-[14%] rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#1B2B2A] shadow-sm">
                        Joint space
                      </span>
                      <span className="absolute left-[70%] top-[23%] rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#0F766E] shadow-sm">
                        Articular cartilage
                      </span>
                      <span className="absolute left-[70%] top-[31%] rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#4B5F5D] shadow-sm">
                        Subchondral bone plate
                      </span>
                      <span className="absolute left-[70%] top-[43%] rounded bg-[#FFF8EE] border border-[#C2410C]/30 px-2 py-0.5 text-[11px] font-bold text-[#C2410C] shadow-sm">
                        Bone marrow lesion (BML)
                      </span>
                      <span className="absolute left-[70%] top-[72%] rounded bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-[#4B5F5D] shadow-sm">
                        Cancellous bone
                      </span>

                      {/* Biological Payload Callout Badge */}
                      {activeP >= 0.58 && (
                        <div className="absolute left-[36%] top-[56%] rounded-xl bg-white border border-[#EA580C]/40 px-3 py-1.5 shadow-md flex items-center gap-1.5 animate-fadeIn">
                          <span className="h-2 w-2 rounded-full bg-[#EA580C] animate-ping" />
                          <span className="text-[11px] sm:text-xs font-bold text-[#C2410C]">
                            PRP / Bone Marrow Concentrate
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Footer Callout */}
            <div className="mt-8 pt-6 border-t border-[#0F766E]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="max-w-[72ch] text-xs sm:text-sm text-[#4B5F5D] leading-relaxed">
                Schematic clinical illustration. The needle passes through bone to deliver biological cells directly beneath the cartilage without penetrating or damaging the joint surface.
              </p>
              <a
                href="#contact-appointment"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C2410C] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#9A3412] transition-colors"
              >
                Discuss My Knee With Dr. Bora
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

// Named alias export for backwards compatibility
export { ProcedureSection as InjectionProcedure };