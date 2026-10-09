"use client";

import React, { useId, useRef, useState } from "react";
import {
  motion,
  MotionValue,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ------------------------------------------------------------------ */
/* Step content                                                        */
/* confirm: review every line with Dr. Bora, especially "fluoroscopic" */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: "Plan the target",
    short: "Targeting",
    description:
      "Your MRI shows where the bone marrow lesion sits in the knee, in the spongy bone just beneath the cartilage. That area becomes the target.",
    center: 0.1, // progress at which this step is "in view"
  },
  {
    title: "Guide the needle",
    short: "Navigation",
    description:
      "Under real-time fluoroscopic imaging, a fine needle is guided through the bone toward the lesion. It stops beneath the subchondral plate and does not enter the joint space.",
    center: 0.43,
  },
  {
    title: "Place the substance",
    short: "Delivery",
    description:
      "Autologous bone marrow concentrate (BMC) or platelet-rich plasma (PRP) is placed directly into the bone at the site of the lesion.",
    center: 0.69,
  },
  {
    title: "Withdraw and recover",
    short: "Recovery",
    description:
      "The needle is gently removed and the substance stays in the bone. You then follow the mobility and load instructions you are given.",
    center: 0.92,
  },
];

// Progress where each step begins
const STEP_STARTS = [0, 0.27, 0.58, 0.8];
const stepFromProgress = (p: number) =>
  STEP_STARTS.reduce((acc, start, i) => (p >= start ? i : acc), 0);

const NAV_OFFSET = 80; // px: height of your fixed navbar plus a little air

/* ------------------------------------------------------------------ */
/* Illustration, driven by progress p (0..1)                            */
/*   0 to 0.27   whole knee, target highlighted, then zooms in          */
/*   0.27 to 1   close-up of the bone beneath the cartilage             */
/* ------------------------------------------------------------------ */

function Illustration({ p, step }: { p: MotionValue<number>; step: number }) {
  const uid = useId().replace(/:/g, "");

  // Whole knee zooms toward the target and fades out
  const ovOpacity = useTransform(p, [0.12, 0.26], [1, 0]);
  const ovT = useTransform(p, [0.1, 0.27], [0, 1]);
  const ovScale = useTransform(ovT, (t: number) => 1 + 2.2 * t);
  const ovX = useTransform([ovT, ovScale], (v: number[]) => v[0] * v[1] * 50);
  const ovY = useTransform([ovT, ovScale], (v: number[]) => v[0] * v[1] * -42);

  // Close-up fades in
  const detOpacity = useTransform(p, [0.16, 0.27], [0, 1]);
  const detScale = useTransform(p, [0.16, 0.27], [0.6, 1]);

  // Needle advances (0.3 to 0.58), stays, then withdraws (0.8 to 0.97)
  const needleX = useTransform(p, [0, 0.3, 0.58, 0.8, 0.97, 1], [-330, -330, 0, 0, -330, -330]);
  const needleOpacity = useTransform(p, [0, 0.3, 0.34, 0.9, 0.97], [0, 0, 1, 1, 0]);
  // Plunger pushes in while the substance is placed (0.58 to 0.8)
  const plungerX = useTransform(p, [0.58, 0.8, 1], [0, 55, 55]);
  const liquidScale = useTransform(p, [0.58, 0.8, 1], [1, 0.25, 0.25]);
  // The substance spreads through the lesion and stays after the needle leaves
  const fluidScale = useTransform(p, [0.6, 0.8], [0, 1]);
  const fluidOpacity = useTransform(p, [0.6, 0.64], [0, 0.9]);
  const ringOpacity = useTransform(p, [0.27, 0.34, 0.58, 1], [0, 1, 0.6, 0.3]);

  // Labels are anchored to the right edge so they never get cut off on small screens
  const label =
    "pointer-events-none absolute -translate-y-1/2 rounded-md bg-white/90 px-1.5 py-0.5 text-[10px] font-semibold leading-tight text-[#1B2B2A] shadow-sm sm:px-2 sm:text-xs";

  return (
    <div className="relative aspect-[600/460] w-full overflow-hidden rounded-2xl border border-[#0F766E]/20 bg-[#F3F8F7] shadow-[0_12px_40px_rgba(27,43,42,0.10)] sm:rounded-3xl">
      <svg
        viewBox="0 0 600 460"
        role="img"
        aria-label="Diagram of a knee, zooming in to the bone beneath the cartilage, where a needle places a substance into a bone marrow lesion"
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

        {/* ===================== 1. Whole knee (front view) ===================== */}
        <motion.g style={{ opacity: ovOpacity, x: ovX, y: ovY, scale: ovScale, originX: 0.5, originY: 0.5 }}>
          {/* invisible box so the zoom pivots on the middle of the drawing */}
          <rect x="0" y="0" width="600" height="460" fill="transparent" />

          {/* femur (thigh bone) */}
          <path
            d="M246 0 L354 0 C358 70 366 110 380 138 C404 160 422 176 414 198 C406 216 340 214 306 204 C302 202 298 202 294 204 C260 214 194 216 186 198 C178 176 196 160 220 138 C234 110 242 70 246 0 Z"
            fill="#E9DDC4"
            stroke="#BFA47A"
            strokeWidth="2"
          />
          {/* cartilage on the femur */}
          <path
            d="M188 197 C194 217 262 215 296 205 M304 205 C338 215 406 217 412 197"
            fill="none"
            stroke="#0F766E"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* menisci */}
          <path d="M196 218 Q246 213 292 218 L284 233 Q244 236 204 233 Z" fill="#94A3B8" />
          <path d="M308 218 Q354 213 404 218 L396 233 Q356 236 316 233 Z" fill="#94A3B8" />

          {/* fibula */}
          <path d="M392 284 Q418 282 424 304 L416 460 L394 460 L390 340 Z" fill="#EADFC9" stroke="#BFA47A" strokeWidth="2" />
          {/* tibia (shin bone) */}
          <path
            d="M190 246 Q300 256 410 246 L404 276 C384 290 368 312 358 344 L352 460 L248 460 L242 344 C232 312 216 290 196 276 Z"
            fill="#E9DDC4"
            stroke="#BFA47A"
            strokeWidth="2"
          />
          {/* tibial cartilage and subchondral plate */}
          <path d="M192 236 Q300 244 408 236 L410 247 Q300 258 190 247 Z" fill="#99F6E4" stroke="#0F766E" strokeWidth="1.5" />
          <path d="M192 250 Q300 260 408 250 L406 258 Q300 268 194 258 Z" fill="#CDB892" />

          {/* bone marrow lesion and the area we zoom into */}
          <ellipse cx="250" cy="276" rx="36" ry="16" fill={`url(#${uid}-lesion)`} />
          <circle cx="250" cy="272" r="46" fill="none" stroke="#C2410C" strokeWidth="2.5" strokeDasharray="6 4" />
          <circle
            cx="250"
            cy="272"
            r="54"
            fill="none"
            stroke="#EA580C"
            strokeWidth="1.5"
            opacity="0.6"
            className="motion-safe:animate-pulse"
          />
        </motion.g>

        {/* ===================== 2. Close-up of the bone ===================== */}
        <motion.g style={{ opacity: detOpacity, scale: detScale, originX: 0.5, originY: 0.5 }}>
          <rect x="0" y="0" width="600" height="460" fill="#F3F8F7" />
          {/* soft tissue on the left */}
          <rect x="0" y="0" width="60" height="460" fill="#FEE2E2" opacity="0.8" />

          {/* femur and its cartilage */}
          <rect x="0" y="0" width="600" height="34" fill="#D9CBB1" />
          <path d="M0 34 H600 V56 Q300 68 0 56 Z" fill="#99F6E4" stroke="#0F766E" strokeWidth="1.5" />

          {/* tibia: outer shell, inner spongy bone, subchondral plate, cartilage */}
          <rect x="60" y="96" width="540" height="364" fill="#BFA47A" />
          <rect x="82" y="154" width="518" height="306" fill="#EADFC9" />
          <rect x="82" y="154" width="518" height="306" fill={`url(#${uid}-trab)`} />
          <rect x="60" y="138" width="540" height="16" fill="#A8926A" />
          <path d="M60 98 Q330 88 600 98 V138 H60 Z" fill="#5EEAD4" stroke="#0F766E" strokeWidth="2" />

          {/* bone marrow lesion */}
          <ellipse cx="330" cy="200" rx="76" ry="40" fill={`url(#${uid}-lesion)`} />
          <motion.ellipse
            cx="330"
            cy="200"
            rx="64"
            ry="32"
            fill="none"
            stroke="#C2410C"
            strokeWidth="2"
            strokeDasharray="6 4"
            style={{ opacity: ringOpacity }}
          />

          {/* substance spreading through the lesion */}
          <motion.g style={{ opacity: fluidOpacity }}>
            <motion.ellipse cx="330" cy="200" rx="60" ry="30" fill="#EA580C" style={{ scale: fluidScale }} />
            <motion.circle cx="292" cy="208" r="16" fill="#C2410C" style={{ scale: fluidScale }} />
            <motion.circle cx="368" cy="192" r="14" fill="#D97706" style={{ scale: fluidScale }} />
            <motion.circle cx="328" cy="222" r="12" fill="#EA580C" style={{ scale: fluidScale }} />
          </motion.g>
        </motion.g>

        {/* ===================== 3. Needle and syringe ===================== */}
        {/* Local origin is the needle tip, pointing up-right */}
        <g transform="translate(322 200) rotate(-22)">
          <motion.g style={{ x: needleX, opacity: needleOpacity }}>
            <line x1="-214" y1="0" x2="-2" y2="0" stroke={`url(#${uid}-steel)`} strokeWidth="4.5" strokeLinecap="round" />
            <rect x="-228" y="-8" width="16" height="16" rx="3" fill="#0F766E" />
            <rect x="-346" y="-15" width="118" height="30" rx="4" fill="#FFFFFF" fillOpacity="0.92" stroke="#64748B" strokeWidth="1.5" />
            <motion.rect
              x="-304"
              y="-11"
              width="72"
              height="22"
              rx="2"
              fill="#EA580C"
              fillOpacity="0.9"
              style={{ scaleX: liquidScale, originX: 1, originY: 0.5 }}
            />
            {[-320, -300, -280, -260, -240].map((x) => (
              <line key={x} x1={x} y1="-15" x2={x} y2="-9" stroke="#64748B" strokeWidth="1" />
            ))}
            <motion.g style={{ x: plungerX }}>
              <rect x="-308" y="-12" width="6" height="24" fill="#334155" />
              <line x1="-308" y1="0" x2="-440" y2="0" stroke="#334155" strokeWidth="5" />
              <rect x="-448" y="-18" width="8" height="36" rx="2" fill="#334155" />
            </motion.g>
          </motion.g>
        </g>
      </svg>

      {/* Labels for the whole knee */}
      <motion.div style={{ opacity: ovOpacity }} aria-hidden="true">
        <span className={`${label} right-[3%] top-[11%]`}>Femur (thigh bone)</span>
        <span className={`${label} right-[3%] top-[46.5%]`}>Knee joint</span>
        <span className={`${label} left-[3%] top-[80%]`}>Tibia (shin bone)</span>
        <span className={`${label} right-[3%] top-[80%]`}>Fibula</span>
        <span className={`${label} left-[3%] top-[56%] max-w-[26%] !bg-[#FFF8EE] text-[#C2410C]`}>
          Bone marrow lesion
        </span>
      </motion.div>

      {/* Labels for the close-up */}
      <motion.div style={{ opacity: detOpacity }} aria-hidden="true">
        <span className={`${label} right-[3%] top-[16.5%]`}>Joint space</span>
        <span className={`${label} right-[3%] top-[25%]`}>Articular cartilage</span>
        <span className={`${label} right-[3%] top-[32%]`}>Subchondral bone plate</span>
        <span className={`${label} right-[3%] top-[45%] !bg-[#FFF8EE] text-[#C2410C]`}>Bone marrow lesion</span>
        <span className={`${label} right-[3%] top-[72%]`}>Cancellous bone</span>
      </motion.div>

      {/* Callout while and after the substance is placed */}
      <span
        className={`pointer-events-none absolute left-[3%] top-[62%] flex items-center gap-1.5 rounded-lg border border-[#EA580C]/40 bg-white px-2 py-1 text-[10px] font-bold text-[#9A3412] shadow-sm transition-opacity duration-300 motion-reduce:transition-none sm:text-xs ${step >= 2 ? "opacity-100" : "opacity-0"
          }`}
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[#EA580C]" />
        PRP or bone marrow concentrate
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-driven stage                                                 */
/* ------------------------------------------------------------------ */

function ScrollStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${NAV_OFFSET}px`, "end end"],
  });
  // Hold the first and last frame briefly so the ends feel settled
  const p = useTransform(scrollYProgress, [0.03, 0.96], [0, 1]);

  useMotionValueEvent(p, "change", (v) => {
    const s = stepFromProgress(v);
    setStep((prev) => (prev === s ? prev : s));
  });

  const goTo = (i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const top = window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET;
    const range = el.offsetHeight - (window.innerHeight - NAV_OFFSET);
    const target = 0.03 + STEPS[i].center * 0.93;
    window.scrollTo({ top: top + range * target, behavior: "smooth" });
  };

  const active = STEPS[step];

  return (
    <div ref={containerRef} className="relative min-h-[250vh] md:min-h-[290vh]">
      <div
        style={{ top: NAV_OFFSET, minHeight: `calc(100vh - ${NAV_OFFSET}px)` }}
        className="sticky flex w-full items-start py-3 lg:items-center lg:py-6"
      >
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-5 px-5 sm:px-6 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
          {/* Steps (desktop) */}
          <ol className="hidden space-y-3 lg:block">
            {STEPS.map((s, i) => {
              const isActive = i === step;
              const isDone = i < step;
              return (
                <li key={s.title}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-current={isActive ? "step" : undefined}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F766E] ${isActive
                        ? "border-[#0F766E] bg-white shadow-md ring-2 ring-[#0F766E]/15"
                        : "border-[#0F766E]/15 bg-white/60 hover:border-[#0F766E]/30 hover:bg-white"
                      }`}
                  >
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold tabular-nums transition-colors ${isActive
                          ? "bg-[#C2410C] text-white"
                          : isDone
                            ? "bg-[#0F766E] text-white"
                            : "bg-[#E8F1EF] text-[#4B5F5D]"
                        }`}
                    >
                      {i + 1}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center justify-between gap-3">
                        <span
                          className={`font-serif-display text-lg font-bold transition-colors ${isActive ? "text-[#1B2B2A]" : "text-[#4B5F5D]"
                            }`}
                        >
                          {s.title}
                        </span>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${isActive ? "bg-[#C2410C]/10 text-[#C2410C]" : "bg-black/5 text-[#4B5F5D]"
                            }`}
                        >
                          {s.short}
                        </span>
                      </span>
                      {isActive && (
                        <span className="mt-2 block text-[15px] leading-relaxed text-[#3F5452]">
                          {s.description}
                        </span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>

          {/* Illustration and, on small screens, the active step under it */}
          <div>
            <Illustration p={p} step={step} />

            <div className="mt-4 lg:hidden">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-[#C2410C]">
                  Step {step + 1} of {STEPS.length}
                </p>
                <span className="rounded-full bg-[#C2410C]/10 px-2.5 py-0.5 text-xs font-semibold text-[#C2410C]">
                  {active.short}
                </span>
              </div>
              <h3 className="mt-1 font-serif-display text-xl font-bold">{active.title}</h3>
              {/* fixed minimum height so the page does not jump between steps */}
              <p className="mt-1.5 min-h-[7.5rem] text-sm leading-relaxed text-[#3F5452] sm:min-h-[5.5rem] sm:text-[15px]">
                {active.description}
              </p>
              <div className="mt-2 flex gap-2" aria-hidden="true">
                {STEPS.map((s, i) => (
                  <span
                    key={s.title}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-[#0F766E]" : "bg-[#1B2B2A]/15"
                      }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* For people who prefer reduced motion: the same four moments, still   */
/* ------------------------------------------------------------------ */

function StaticFrame({ value, step }: { value: number; step: number }) {
  const p = useMotionValue(value);
  return <Illustration p={p} step={step} />;
}

function StaticSteps() {
  const frames = [0.06, 0.58, 0.8, 0.97];
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-4 sm:px-6 md:px-12">
      <ol className="m-carousel grid grid-cols-1 gap-10 md:grid-cols-2">
        {STEPS.map((s, i) => (
          <li key={s.title}>
            <StaticFrame value={frames[i]} step={i} />
            <p className="mt-4 text-sm font-semibold text-[#C2410C]">
              Step {i + 1} of {STEPS.length}
            </p>
            <h3 className="mt-0.5 font-serif-display text-xl font-bold">{s.title}</h3>
            <p className="mt-1.5 max-w-[48ch] text-[15px] leading-relaxed text-[#3F5452]">{s.description}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export default function ProcedureSection() {
  const reduce = !!useReducedMotion();

  return (
    <section
      id="procedure-animation"
      aria-labelledby="procedure-heading"
      className="relative w-full border-b border-[#0F766E]/15 bg-gradient-to-br from-[#FAF8F5] via-[#F7FAF9] to-[#F6F1E9] font-sans-clean text-[#1B2B2A]"
    >
      <header className="mx-auto max-w-[1200px] px-5 pb-4 pt-14 sm:px-6 md:px-12 md:pt-20">
        <div className="max-w-[760px] space-y-4">
          <span className="inline-block rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]">
            The procedure
          </span>
          <h2
            id="procedure-heading"
            className="font-serif-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl md:text-5xl"
          >
            How a subchondral injection works
          </h2>
          <p className="max-w-[62ch] text-base leading-relaxed text-[#3F5452]">
            A subchondral injection is a minimally invasive treatment that places healing
            substances such as platelet-rich plasma (PRP) or bone marrow concentrate directly into
            the bone just beneath a joint&rsquo;s cartilage.
          </p>
          {!reduce && (
            <p className="text-sm font-medium text-[#0F766E]">Scroll to follow the procedure, step by step.</p>
          )}
        </div>
      </header>

      {reduce ? <StaticSteps /> : <ScrollStage />}

      <div className="mx-auto max-w-[1200px] px-5 pb-14 pt-6 sm:px-6 md:px-12 md:pb-20">
        <div className="flex flex-col items-start justify-between gap-5 border-t border-[#0F766E]/15 pt-6 sm:flex-row sm:items-center">
          <p className="max-w-[68ch] text-sm leading-relaxed text-[#4B5F5D]">
            Schematic illustration, not to scale. The exact technique, guidance method and
            substance used are decided by your surgeon for your knee. Response is variable, and
            pain relief is not assured.
          </p>
          <a
            href="#contact-appointment"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C2410C] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#9A3412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
          >
            Discuss my knee with Dr. Bora
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Named alias export for backwards compatibility
export { ProcedureSection as InjectionProcedure };