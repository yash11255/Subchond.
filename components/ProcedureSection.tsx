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
/* Content                                                             */
/* confirm: review every step with Dr. Bora. In particular, the        */
/* guidance method and the "stays beneath the cartilage" wording.      */
/* ------------------------------------------------------------------ */

const STEPS = [
  {
    title: "Plan the target",
    description:
      "Your imaging shows where the bone marrow lesion sits in the knee, in the bone just beneath the cartilage. That area becomes the target.",
    center: 0.1, // progress at which this step is "in view"
  },
  {
    title: "Guide the needle",
    description:
      "A fine needle is guided through the bone toward the target. It stops beneath the cartilage and does not enter the joint space.",
    center: 0.43,
  },
  {
    title: "Place the substance",
    description:
      "Platelet-rich plasma (PRP) or bone marrow concentrate is placed directly into the bone beneath the cartilage, at the site of the lesion.",
    center: 0.69,
  },
  {
    title: "Withdraw and recover",
    description:
      "The needle is removed and the substance stays in the bone. You then follow the mobility and load instructions you are given.",
    center: 0.92,
  },
];

// Progress where each step begins
const STEP_STARTS = [0, 0.27, 0.58, 0.8];
const stepFromProgress = (p: number) =>
  STEP_STARTS.reduce((acc, start, i) => (p >= start ? i : acc), 0);

const NAV_OFFSET = 72; // px: height of your fixed navbar plus a little air

/* ------------------------------------------------------------------ */
/* Intro text, used above the stage (mobile) and inside it (desktop)    */
/* ------------------------------------------------------------------ */

function Intro({ hint }: { hint: boolean }) {
  return (
    <div className="space-y-4">
      <span className="inline-block rounded-full bg-[#DDF1E8] px-4 py-1.5 text-sm font-semibold uppercase tracking-wide text-[#2F7D5B]">
        The procedure
      </span>
      <h2 className="font-serif-display text-4xl font-bold leading-[1.1] tracking-tight">
        How a subchondral injection works
      </h2>
      <p className="max-w-[56ch] text-base leading-relaxed text-[#3F5452]">
        A subchondral injection is a minimally invasive treatment that places healing substances
        such as platelet-rich plasma (PRP) or bone marrow concentrate directly into the bone just
        beneath a joint&rsquo;s cartilage.
      </p>
      {hint && <p className="text-sm font-medium text-[#0F766E]">Scroll to follow the procedure, step by step.</p>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Illustration, driven by progress p (0..1)                            */
/*   0 to 0.27   whole knee, target area highlighted, then zooms in     */
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
  const liquidScale = useTransform(p, [0.58, 0.8, 1], [1, 0.24, 0.24]);
  // The substance spreads through the lesion and stays after the needle leaves
  const fluidScale = useTransform(p, [0.6, 0.8], [0, 1]);
  const fluidOpacity = useTransform(p, [0.6, 0.64], [0, 0.9]);
  const ringOpacity = useTransform(p, [0.27, 0.34, 0.58, 1], [0, 1, 0.6, 0.3]);

  const label =
    "pointer-events-none absolute -translate-y-1/2 rounded-md bg-white/90 px-2 py-0.5 text-[11px] font-medium text-[#1B2B2A] shadow-sm sm:text-xs";

  return (
    <div className="relative aspect-[600/460] w-full overflow-hidden rounded-2xl border border-[#1B2B2A]/10 bg-[#F3F8F7] shadow-[0_12px_40px_rgba(27,43,42,0.10)]">
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
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#F97316" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-steel`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#B7C0BF" />
            <stop offset="100%" stopColor="#7B8785" />
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
            stroke="#7CC2BA"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* menisci */}
          <path d="M196 218 Q246 213 292 218 L284 233 Q244 236 204 233 Z" fill="#B8C2BF" />
          <path d="M308 218 Q354 213 404 218 L396 233 Q356 236 316 233 Z" fill="#B8C2BF" />

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
          <path d="M192 236 Q300 244 408 236 L410 247 Q300 258 190 247 Z" fill="#BFE3DF" stroke="#7CC2BA" strokeWidth="1.5" />
          <path d="M192 250 Q300 260 408 250 L406 258 Q300 268 194 258 Z" fill="#CDB892" />

          {/* bone marrow lesion and the area we zoom into */}
          <ellipse cx="250" cy="276" rx="36" ry="16" fill={`url(#${uid}-lesion)`} />
          <circle
            cx="250"
            cy="272"
            r="50"
            fill="none"
            stroke="#C2410C"
            strokeWidth="2.5"
            strokeDasharray="7 5"
            className="motion-safe:animate-pulse"
          />
        </motion.g>

        {/* ===================== 2. Close-up of the bone ===================== */}
        <motion.g style={{ opacity: detOpacity, scale: detScale, originX: 0.5, originY: 0.5 }}>
          <rect x="0" y="0" width="600" height="460" fill="#F3F8F7" />
          {/* soft tissue on the left */}
          <rect x="0" y="0" width="60" height="460" fill="#F6E3DC" />

          {/* femur and its cartilage */}
          <rect x="0" y="0" width="600" height="34" fill="#D9CBB1" />
          <path d="M0 34 H600 V56 Q300 68 0 56 Z" fill="#BFE3DF" stroke="#7CC2BA" strokeWidth="1.5" />

          {/* tibia: outer shell, inner spongy bone, subchondral plate, cartilage */}
          <rect x="60" y="96" width="540" height="364" fill="#BFA47A" />
          <rect x="82" y="154" width="518" height="306" fill="#EADFC9" />
          <rect x="82" y="154" width="518" height="306" fill={`url(#${uid}-trab)`} />
          <rect x="60" y="138" width="540" height="16" fill="#CDB892" />
          <path d="M60 98 Q330 88 600 98 V138 H60 Z" fill="#BFE3DF" stroke="#7CC2BA" strokeWidth="1.5" />

          {/* bone marrow lesion */}
          <ellipse cx="330" cy="200" rx="74" ry="38" fill={`url(#${uid}-lesion)`} />
          <motion.ellipse
            cx="330"
            cy="200"
            rx="62"
            ry="31"
            fill="none"
            stroke="#C2410C"
            strokeWidth="2"
            strokeDasharray="6 5"
            style={{ opacity: ringOpacity }}
          />

          {/* substance spreading through the lesion */}
          <motion.g style={{ opacity: fluidOpacity }}>
            <motion.ellipse cx="332" cy="200" rx="58" ry="28" fill="#D97706" style={{ scale: fluidScale }} />
            <motion.circle cx="296" cy="208" r="14" fill="#D97706" style={{ scale: fluidScale }} />
            <motion.circle cx="372" cy="192" r="12" fill="#D97706" style={{ scale: fluidScale }} />
          </motion.g>
        </motion.g>

        {/* ===================== 3. Needle and syringe ===================== */}
        {/* Local origin is the needle tip, pointing up-right */}
        <g transform="translate(322 200) rotate(-22)">
          <motion.g style={{ x: needleX, opacity: needleOpacity }}>
            <line x1="-214" y1="0" x2="-2" y2="0" stroke={`url(#${uid}-steel)`} strokeWidth="4" strokeLinecap="round" />
            <rect x="-228" y="-8" width="16" height="16" rx="3" fill="#2F6F8F" />
            <rect x="-346" y="-15" width="118" height="30" rx="4" fill="#FFFFFF" fillOpacity="0.9" stroke="#7B8785" strokeWidth="1.5" />
            <motion.rect
              x="-304"
              y="-11"
              width="72"
              height="22"
              rx="2"
              fill="#D97706"
              fillOpacity="0.85"
              style={{ scaleX: liquidScale, originX: 1, originY: 0.5 }}
            />
            {[-320, -300, -280, -260, -240].map((x) => (
              <line key={x} x1={x} y1="-15" x2={x} y2="-9" stroke="#7B8785" strokeWidth="1" />
            ))}
            <motion.g style={{ x: plungerX }}>
              <rect x="-308" y="-12" width="6" height="24" fill="#4B5F5D" />
              <line x1="-308" y1="0" x2="-440" y2="0" stroke="#4B5F5D" strokeWidth="5" />
              <rect x="-448" y="-18" width="8" height="36" rx="2" fill="#4B5F5D" />
            </motion.g>
          </motion.g>
        </g>
      </svg>

      {/* Labels for the whole knee */}
      <motion.div style={{ opacity: ovOpacity }} aria-hidden="true">
        <span className={`${label} left-[66%] top-[11%]`}>Femur (thigh bone)</span>
        <span className={`${label} left-[71%] top-[46.5%]`}>Knee joint</span>
        <span className={`${label} left-[6%] top-[78%]`}>Tibia (shin bone)</span>
        <span className={`${label} left-[73%] top-[78%]`}>Fibula</span>
        <span className={`${label} left-[3%] top-[59%] !bg-[#FFF8EE] text-[#C2410C]`}>Bone marrow lesion</span>
      </motion.div>

      {/* Labels for the close-up */}
      <motion.div style={{ opacity: detOpacity }} aria-hidden="true">
        <span className={`${label} left-[70%] top-[16.5%]`}>Joint space</span>
        <span className={`${label} left-[70%] top-[25%]`}>Cartilage</span>
        <span className={`${label} left-[70%] top-[32%]`}>Subchondral bone plate</span>
        <span className={`${label} left-[70%] top-[43.5%] !bg-[#FFF8EE] text-[#C2410C]`}>Bone marrow lesion</span>
        <span className={`${label} left-[70%] top-[72%]`}>Cancellous bone</span>
      </motion.div>

      {/* Callout while / after the substance is placed */}
      <span
        className={`pointer-events-none absolute left-[42%] top-[58%] rounded-lg border border-[#D97706]/50 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#9A3412] shadow-sm transition-opacity duration-300 motion-reduce:transition-none sm:text-xs ${
          step >= 2 ? "opacity-100" : "opacity-0"
        }`}
      >
        PRP or bone marrow concentrate
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Scroll-driven stage (default)                                       */
/* ------------------------------------------------------------------ */

function ScrollStage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [step, setStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: [`start ${NAV_OFFSET}px`, `end end`],
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
    <div ref={containerRef} className="relative min-h-[340vh]">
      <div
        style={{ top: NAV_OFFSET, height: `calc(100vh - ${NAV_OFFSET}px)` }}
        className="sticky flex w-full items-start overflow-hidden pt-2 lg:items-center lg:pt-0"
      >
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-6 px-6 md:px-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
          {/* Left (desktop): intro + steps */}
          <div className="hidden space-y-8 lg:block">
            <Intro hint />

            <div className="relative">
              <span aria-hidden="true" className="absolute bottom-3 left-[15px] top-3 w-px bg-[#1B2B2A]/15" />
              <motion.span
                aria-hidden="true"
                style={{ scaleY: p, originY: 0 }}
                className="absolute bottom-3 left-[14px] top-3 w-[3px] rounded-full bg-[#0F766E]"
              />
              <ol className="relative space-y-5">
                {STEPS.map((s, i) => {
                  const isActive = i === step;
                  const isDone = i < step;
                  return (
                    <li key={s.title}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-current={isActive ? "step" : undefined}
                        className="group flex w-full items-start gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0F766E]"
                      >
                        <span
                          className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 text-sm font-semibold tabular-nums transition-colors ${
                            isActive
                              ? "border-[#C2410C] bg-[#C2410C] text-white"
                              : isDone
                              ? "border-[#0F766E] bg-[#0F766E] text-white"
                              : "border-[#1B2B2A]/25 bg-[#FAF8F5] text-[#4B5F5D] group-hover:border-[#0F766E]"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <span>
                          <span
                            className={`block font-serif-display text-lg font-bold transition-colors ${
                              isActive ? "text-[#1B2B2A]" : "text-[#4B5F5D]"
                            }`}
                          >
                            {s.title}
                          </span>
                          {isActive && (
                            <span className="mt-1 block max-w-[44ch] text-[15px] leading-relaxed text-[#3F5452]">
                              {s.description}
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>

          {/* Illustration */}
          <div>
            <Illustration p={p} step={step} />

            {/* Active step (mobile and tablet) */}
            <div className="mt-4 lg:hidden">
              <p className="text-sm font-semibold text-[#C2410C]">
                Step {step + 1} of {STEPS.length}
              </p>
              <h3 className="mt-0.5 font-serif-display text-xl font-bold">{active.title}</h3>
              <p className="mt-1 text-[15px] leading-relaxed text-[#3F5452]">{active.description}</p>
              <div className="mt-3 flex gap-2" aria-hidden="true">
                {STEPS.map((s, i) => (
                  <span
                    key={s.title}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= step ? "bg-[#0F766E]" : "bg-[#1B2B2A]/15"
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
/* Static version for people who prefer reduced motion                  */
/* ------------------------------------------------------------------ */

function StaticFrame({ value, step }: { value: number; step: number }) {
  const p = useMotionValue(value);
  return <Illustration p={p} step={step} />;
}

function StaticSteps() {
  // Progress values chosen so each frame shows its own moment
  const frames = [0.06, 0.58, 0.8, 0.97];
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6 py-4 md:px-12">
      <ol className="grid grid-cols-1 gap-10 md:grid-cols-2">
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

export default function InjectionProcedure() {
  const reduce = !!useReducedMotion();

  return (
    <section
      id="procedure-animation"
      aria-label="How a subchondral injection works"
      className="relative w-full bg-gradient-to-br from-[#FAF8F5] via-[#F7FAF9] to-[#F6F1E9] font-sans-clean text-[#1B2B2A]"
    >
      {reduce ? (
        <>
          <header className="mx-auto max-w-[1200px] px-6 pb-8 pt-16 md:px-12 md:pt-20">
            <div className="max-w-[760px]">
              <Intro hint={false} />
            </div>
          </header>
          <StaticSteps />
        </>
      ) : (
        <>
          {/* On small screens the intro sits above the pinned stage; on desktop it is inside it */}
          <header className="mx-auto max-w-[1200px] px-6 pb-4 pt-14 md:px-12 lg:hidden">
            <div className="max-w-[760px]">
              <Intro hint />
            </div>
          </header>
          <ScrollStage />
        </>
      )}

      <div className="mx-auto max-w-[1200px] px-6 pb-16 pt-6 md:px-12 md:pb-20">
        <div className="flex flex-col items-start justify-between gap-6 border-t border-[#1B2B2A]/10 pt-8 md:flex-row md:items-center">
          <p className="max-w-[68ch] text-sm leading-relaxed text-[#4B5F5D]">
            Schematic illustration, not to scale. The exact technique, guidance method and
            substance used are decided by your surgeon for your knee. Response is variable, and
            pain relief is not assured.
          </p>
          <a
            href="#assess"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-[#C2410C] px-6 py-3.5 text-base font-semibold text-white shadow-sm transition-colors hover:bg-[#9A3412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2410C]"
          >
            Discuss my knee
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Named alias export for backwards compatibility
export { InjectionProcedure as ProcedureSection };