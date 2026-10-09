"use client";

import React, { useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

export type KneeFocus =
  | "bone"
  | "bml"
  | "micro"
  | "synovium"
  | "meniscus"
  | "muscle"
  | "injection";

const LABELS: Record<KneeFocus, string> = {
  bone: "Subchondral bone under stress",
  bml: "Bone marrow lesion (seen on MRI)",
  micro: "Micro-cracks in the bone plate",
  synovium: "Inflamed joint lining",
  meniscus: "Meniscus & uneven loading",
  muscle: "Thigh muscles that protect the knee",
  injection: "Subchondral injection treats the bone",
};

type Callout = { cx: number; cy: number; rx: number; ry: number; title: string; sub: [string, string]; bx: number; by: number };

// Where each problem sits in the joint, and the plain-language label pointing at it.
const CALLOUTS: Record<KneeFocus, Callout> = {
  bone: { cx: 200, cy: 318, rx: 102, ry: 18, title: "Bone under stress", sub: ["Overloaded bone just", "below the cartilage"], bx: 44, by: 392 },
  bml: { cx: 146, cy: 330, rx: 42, ry: 26, title: "Bone marrow lesion", sub: ["Swollen, painful bone", "— seen on MRI"], bx: 184, by: 388 },
  micro: { cx: 245, cy: 322, rx: 32, ry: 20, title: "Tiny bone cracks", sub: ["Stress fractures in", "the bone plate"], bx: 44, by: 388 },
  synovium: { cx: 200, cy: 290, rx: 124, ry: 66, title: "Swollen joint lining", sub: ["Causes warmth,", "swelling & stiffness"], bx: 44, by: 112 },
  meniscus: { cx: 128, cy: 302, rx: 34, ry: 14, title: "Worn meniscus", sub: ["The knee's cushion wears", "and load becomes uneven"], bx: 184, by: 388 },
  muscle: { cx: 124, cy: 182, rx: 26, ry: 58, title: "Weak thigh muscles", sub: ["Less support, so more", "load falls on the knee"], bx: 184, by: 112 },
  injection: { cx: 146, cy: 330, rx: 42, ry: 26, title: "Treatment reaches it", sub: ["Bone-marrow concentrate", "injected into the lesion"], bx: 184, by: 388 },
};
const BOX_W = 172;
const BOX_H = 70;

const CYCLE: KneeFocus[] = ["bone", "bml", "injection", "micro", "synovium", "meniscus", "muscle"];

// Front (coronal) view of a right knee. Shapes follow real femoral condyle / tibial plateau proportions.
const FEMUR =
  "M166 110 C164 150 160 172 150 190 C134 214 108 222 104 250 C100 276 124 292 154 290 C172 289 184 280 192 270 C196 266 204 266 208 270 C216 280 228 289 246 290 C276 292 300 276 296 250 C292 222 266 214 250 190 C240 172 236 150 234 110 Z";
const TIBIA =
  "M98 306 C120 298 162 300 190 304 C196 305 204 305 210 304 C238 300 280 298 302 306 C306 318 302 330 290 340 C272 354 254 360 248 380 L244 470 L156 470 L152 380 C146 360 128 354 110 340 C98 330 94 318 98 306 Z";
const FIBULA = "M286 344 C298 348 306 358 304 372 L298 470 L280 470 L282 376 C280 362 278 352 286 344 Z";
const FEMUR_CART =
  "M106 256 C110 280 132 292 156 290 C174 289 186 280 192 271 L196 276 C188 288 174 297 154 297 C126 298 102 282 102 256 Z M294 256 C290 280 268 292 244 290 C226 289 214 280 208 271 L204 276 C212 288 226 297 246 297 C274 298 298 282 298 256 Z";
const TIBIA_CART =
  "M100 306 C122 298 162 300 190 304 L190 311 C162 307 124 306 103 313 Z M300 306 C278 298 238 300 210 304 L210 311 C238 307 276 306 297 313 Z";

interface Props {
  /** Fixed focus. When omitted the diagram cycles through every structure on its own. */
  focus?: KneeFocus;
  className?: string;
  showCaption?: boolean;
}

export default function KneeAnimation({ focus, className = "", showCaption = false }: Props) {
  const reduce = !!useReducedMotion();
  const uid = useId().replace(/:/g, "");
  const id = (n: string) => `${n}-${uid}`;
  const url = (n: string) => `url(#${id(n)})`;
  const [auto, setAuto] = useState(0);

  useEffect(() => {
    if (focus || reduce) return;
    const t = setInterval(() => setAuto((i) => (i + 1) % CYCLE.length), 5200);
    return () => clearInterval(t);
  }, [focus, reduce]);

  const active: KneeFocus = focus ?? CYCLE[auto];
  const on = (k: KneeFocus | KneeFocus[]) => (Array.isArray(k) ? k.includes(active) : k === active);
  const breathe = { duration: 2.2, repeat: Infinity, ease: "easeInOut" as const };

  return (
    <div className={`relative h-full w-full ${className}`}>
      <svg viewBox="40 100 320 380" className="h-full w-full" role="img" aria-label={`Knee illustration: ${LABELS[active]}`}>
        <defs>
          {/* Bone: lit from top-left, darker cortical rim */}
          <radialGradient id={id("bone")} cx="0.35" cy="0.3" r="0.85">
            <stop offset="0" stopColor="#FFF8EC" />
            <stop offset="0.55" stopColor="#EEDDBF" />
            <stop offset="0.85" stopColor="#D6BC93" />
            <stop offset="1" stopColor="#B89A6E" />
          </radialGradient>
          <linearGradient id={id("shaft")} x1="0" x2="1">
            <stop offset="0" stopColor="#C9AD82" />
            <stop offset="0.3" stopColor="#F6E9D3" />
            <stop offset="0.65" stopColor="#E9D6B5" />
            <stop offset="1" stopColor="#B99B70" />
          </linearGradient>
          {/* Bone grain */}
          <filter id={id("grain")} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="4" result="n" />
            <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.25  0 0 0 0.35 0" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          {/* Spongy (cancellous) bone */}
          <filter id={id("spongy")} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="turbulence" baseFrequency="0.12" numOctaves="2" seed="9" result="t" />
            <feColorMatrix in="t" type="matrix" values="0 0 0 0 0.62  0 0 0 0 0.45  0 0 0 0 0.28  0 0 0 -2.2 1.25" />
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <linearGradient id={id("cart")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#E9FBFF" />
            <stop offset="0.5" stopColor="#A8DCE6" />
            <stop offset="1" stopColor="#6FB7C6" />
          </linearGradient>
          <linearGradient id={id("menisc")} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#F4F1EA" />
            <stop offset="1" stopColor="#B8B1A2" />
          </linearGradient>
          <linearGradient id={id("muscle")} x1="0" x2="1">
            <stop offset="0" stopColor="#7F1D1D" />
            <stop offset="0.45" stopColor="#C2413B" />
            <stop offset="1" stopColor="#8B2321" />
          </linearGradient>
          <pattern id={id("fibres")} width="6" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(8)">
            <path d="M3 0 V12" stroke="#FCA5A5" strokeOpacity="0.28" strokeWidth="1" />
          </pattern>
          <linearGradient id={id("lig")} x1="0" x2="1">
            <stop offset="0" stopColor="#D9D4C7" />
            <stop offset="0.5" stopColor="#FAF8F2" />
            <stop offset="1" stopColor="#CFC8B8" />
          </linearGradient>
          <radialGradient id={id("edema")}>
            <stop offset="0" stopColor="#FB923C" stopOpacity="0.95" />
            <stop offset="0.5" stopColor="#EA580C" stopOpacity="0.55" />
            <stop offset="1" stopColor="#EA580C" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={id("heal")}>
            <stop offset="0" stopColor="#B91C1C" stopOpacity="0.85" />
            <stop offset="0.6" stopColor="#DC2626" stopOpacity="0.35" />
            <stop offset="1" stopColor="#DC2626" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={id("steel")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#F1F5F9" />
            <stop offset="0.5" stopColor="#94A3B8" />
            <stop offset="1" stopColor="#475569" />
          </linearGradient>
          <linearGradient id={id("barrel")} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#E2E8F0" stopOpacity="0.45" />
            <stop offset="1" stopColor="#CBD5E1" stopOpacity="0.75" />
          </linearGradient>
          <filter id={id("blur6")}><feGaussianBlur stdDeviation="6" /></filter>
          <filter id={id("blur3")}><feGaussianBlur stdDeviation="3" /></filter>
          <filter id={id("shadow")} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.28" />
          </filter>
          {/* Cylindrical shading: dark edges, lit centre-left → reads as a rounded 3D bone */}
          <linearGradient id={id("cyl")} x1="0" x2="1">
            <stop offset="0" stopColor="#5C4426" stopOpacity="0.55" />
            <stop offset="0.18" stopColor="#5C4426" stopOpacity="0.12" />
            <stop offset="0.38" stopColor="#FFFFFF" stopOpacity="0.35" />
            <stop offset="0.6" stopColor="#5C4426" stopOpacity="0" />
            <stop offset="0.85" stopColor="#5C4426" stopOpacity="0.25" />
            <stop offset="1" stopColor="#5C4426" stopOpacity="0.6" />
          </linearGradient>
          {/* Fade bone shafts out at the top and bottom like a cut-away illustration */}
          <linearGradient id={id("fadeG")} x1="0" y1="100" x2="0" y2="470" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="0.16" stopColor="#fff" stopOpacity="1" />
            <stop offset="0.82" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
          <mask id={id("fade")} maskUnits="userSpaceOnUse" x="40" y="100" width="320" height="380">
            <rect x="40" y="100" width="320" height="380" fill={url("fadeG")} />
          </mask>
          {/* Soft-edged regions for spongy bone, so there are no hard rectangles */}
          <mask id={id("spongyMask")} maskUnits="userSpaceOnUse" x="40" y="100" width="320" height="380">
            <g filter={url("blur6")}>
              <ellipse cx="150" cy="258" rx="40" ry="24" fill="#fff" />
              <ellipse cx="250" cy="258" rx="40" ry="24" fill="#fff" />
              <ellipse cx="200" cy="334" rx="92" ry="20" fill="#fff" />
            </g>
          </mask>
          <mask id={id("spot")} maskUnits="userSpaceOnUse" x="40" y="100" width="320" height="380">
            <rect x="40" y="100" width="320" height="380" fill="#fff" />
            <ellipse cx={CALLOUTS[active].cx} cy={CALLOUTS[active].cy} rx={CALLOUTS[active].rx * 1.5} ry={CALLOUTS[active].ry * 1.6} fill="#000" filter={url("blur6")} />
          </mask>
          <clipPath id={id("tibClip")}><path d={TIBIA} /></clipPath>
          <clipPath id={id("femClip")}><path d={FEMUR} /></clipPath>
        </defs>
        <g mask={url("fade")}>

        {/* ---------- Thigh & calf muscles (behind bones) ---------- */}
        <motion.g animate={{ opacity: on("muscle") ? 1 : 0.3 }} transition={{ duration: 0.6 }}>
          {[
            "M160 100 C126 136 106 186 112 236 C120 244 132 236 138 222 C140 180 150 140 168 100 Z",
            "M240 100 C274 136 294 186 288 236 C280 244 268 236 262 222 C260 180 250 140 232 100 Z",
            "M126 372 C110 410 116 448 132 470 L156 470 L154 392 Z",
            "M274 372 C290 410 284 448 268 470 L246 470 L248 392 Z",
          ].map((d, i) => (
            <g key={i}>
              <path d={d} fill={url("muscle")} />
              <path d={d} fill={url("fibres")} />
            </g>
          ))}
          {on("muscle") && !reduce && (
            <motion.g animate={{ scaleX: [1, 1.04, 1] }} transition={breathe} style={{ transformOrigin: "200px 170px" }}>
              <path d="M164 100 C128 140 112 190 116 238" stroke="#FECACA" strokeWidth="2.5" fill="none" filter={url("blur3")} />
              <path d="M236 100 C272 140 288 190 284 238" stroke="#FECACA" strokeWidth="2.5" fill="none" filter={url("blur3")} />
            </motion.g>
          )}
        </motion.g>

        {/* ---------- Synovitis glow ---------- */}
        <motion.ellipse
          cx="200" cy="292" rx="122" ry="70"
          fill="#E11D48"
          filter={url("blur6")}
          animate={on("synovium") ? (reduce ? { opacity: 0.3 } : { opacity: [0.18, 0.42, 0.18] }) : { opacity: 0 }}
          transition={breathe}
        />

        {/* ---------- Bones ---------- */}
        <g filter={url("shadow")}>
          <path d={FIBULA} fill={url("shaft")} stroke="#A88B60" strokeWidth="1.2" />
          <path d={TIBIA} fill={url("bone")} stroke="#A88B60" strokeWidth="1.4" />
          <path d={FEMUR} fill={url("bone")} stroke="#A88B60" strokeWidth="1.4" />
        </g>
        {/* 3D shading, grain and spongy bone (all soft-edged) */}
        <path d={FEMUR} fill={url("cyl")} />
        <path d={TIBIA} fill={url("cyl")} />
        <path d={FIBULA} fill={url("cyl")} />
        <path d={FEMUR} fill="#000" filter={url("grain")} />
        <path d={TIBIA} fill="#000" filter={url("grain")} />
        <g mask={url("spongyMask")} opacity="0.6">
          <rect x="96" y="226" width="208" height="134" fill="#000" filter={url("spongy")} clipPath={url("femClip")} />
          <rect x="96" y="226" width="208" height="134" fill="#000" filter={url("spongy")} clipPath={url("tibClip")} />
        </g>
        {/* Intercondylar notch shadow */}
        <path d="M188 262 C192 252 208 252 212 262 C206 270 194 270 188 262 Z" fill="#8A6A40" opacity="0.35" filter={url("blur3")} />

        {/* ---------- Subchondral stress (bone plate under the cartilage) ---------- */}
        <motion.path
          d="M100 312 C124 305 162 306 190 310 C196 311 204 311 210 310 C238 306 276 305 300 312 L298 326 C270 320 230 320 200 322 C170 320 130 320 102 326 Z"
          fill="#F59E0B"
          filter={url("blur3")}
          animate={on("bone") ? (reduce ? { opacity: 0.55 } : { opacity: [0.25, 0.7, 0.25] }) : { opacity: 0 }}
          transition={breathe}
        />

        {/* ---------- Cartilage (glossy) ---------- */}
        <path d={FEMUR_CART} fill={url("cart")} stroke="#5FA8B8" strokeWidth="0.8" />
        <path d={TIBIA_CART} fill={url("cart")} stroke="#5FA8B8" strokeWidth="0.8" />
        <path d="M118 278 C134 290 156 292 176 286" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1.5" fill="none" />
        <path d="M282 278 C266 290 244 292 224 286" stroke="#FFFFFF" strokeOpacity="0.7" strokeWidth="1.5" fill="none" />

        {/* ---------- Collateral ligaments ---------- */}
        <path d="M104 236 C96 262 96 300 104 346 L114 344 C108 300 108 264 114 238 Z" fill={url("lig")} opacity="0.92" />
        <path d="M296 236 C304 262 304 300 294 352 L286 350 C294 300 292 264 286 238 Z" fill={url("lig")} opacity="0.92" />

        {/* ---------- Menisci ---------- */}
        <motion.g
          animate={{ opacity: on("meniscus") ? 1 : 0.85 }}
          style={{ filter: on("meniscus") ? "drop-shadow(0 0 6px rgba(59,130,246,0.9))" : "none" }}
        >
          <path d="M100 304 C112 292 140 292 162 300 C142 300 120 302 100 310 Z" fill={url("menisc")} stroke="#9C9384" strokeWidth="0.8" />
          {on("meniscus") && (
            <motion.path
              d="M118 296 l5 4 l-3 3 l6 4"
              stroke="#991B1B"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          )}
          <path d="M300 304 C288 292 260 292 238 300 C258 300 280 302 300 310 Z" fill={url("menisc")} stroke="#9C9384" strokeWidth="0.8" />
        </motion.g>
        {on("meniscus") &&
          [126, 152].map((x, i) => (
            <motion.g key={x} animate={reduce ? {} : { y: [0, 10, 0], opacity: [0.6, 1, 0.6] }} transition={{ ...breathe, delay: i * 0.25 }}>
              <path d={`M${x} 196 L${x} 228`} stroke="#EA580C" strokeWidth="5" strokeLinecap="round" />
              <path d={`M${x - 9} 224 L${x} 240 L${x + 9} 224 Z`} fill="#EA580C" />
            </motion.g>
          ))}

        {/* ---------- Micro-cracks in the tibial bone plate ---------- */}
        <g clipPath={url("tibClip")} stroke="#B91C1C" strokeWidth="2.6" fill="none" strokeLinecap="round">
          {["M232 312 l4 7 l-3 5 l5 7 l-2 6", "M252 311 l-3 8 l4 4 l-2 8", "M218 313 l3 6 l-2 7", "M266 313 l-2 6 l3 5"].map((d, i) => (
            <motion.path
              key={d}
              d={d}
              initial={false}
              animate={
                on("micro")
                  ? reduce
                    ? { pathLength: 1, opacity: 1 }
                    : { pathLength: [0, 1, 1], opacity: [1, 1, 0.4] }
                  : { pathLength: 0, opacity: 0 }
              }
              transition={{ duration: 1.6, delay: i * 0.2, repeat: on("micro") && !reduce ? Infinity : 0, repeatDelay: 0.6 }}
            />
          ))}
        </g>

        {/* ---------- Bone marrow lesion (MRI-style oedema) ---------- */}
        <g clipPath={url("tibClip")}>
          <motion.ellipse
            cx="146" cy="330" rx="36" ry="20"
            fill={url("edema")}
            filter={url("blur3")}
            animate={
              active === "injection"
                ? { opacity: [0.9, 0.15], scale: [1, 0.7] }
                : on("bml")
                  ? reduce
                    ? { opacity: 0.9 }
                    : { opacity: [0.6, 1, 0.6], scale: [0.95, 1.08, 0.95] }
                  : { opacity: 0.3, scale: 1 }
            }
            transition={active === "injection" ? { duration: 2.4, delay: 1.2 } : breathe}
            style={{ transformOrigin: "146px 330px" }}
          />
        </g>

        {/* ---------- Injection: syringe, plunger push, bone-marrow concentrate spreading ---------- */}
        <AnimatePresence>
          {on("injection") && (
            <motion.g key="syringe" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.3 } }}>
              <motion.g
                initial={reduce ? false : { x: -46, y: 30 }}
                animate={{ x: 0, y: 0 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              >
                <g transform="rotate(-32 140 332)">
                  {/* needle */}
                  <rect x="70" y="330.6" width="72" height="2.8" rx="1.4" fill={url("steel")} />
                  {/* hub */}
                  <rect x="62" y="327" width="10" height="10" rx="1.5" fill="#0EA5E9" />
                  {/* barrel */}
                  <rect x="-8" y="322" width="70" height="20" rx="4" fill={url("barrel")} stroke="#94A3B8" strokeWidth="1" />
                  {/* fluid (bone marrow concentrate) shrinking as plunger moves */}
                  <motion.rect
                    y="325" height="14" rx="2" fill="#B91C1C" opacity="0.85"
                    initial={{ x: 4, width: 56 }}
                    animate={reduce ? {} : { x: [4, 46], width: [56, 14] }}
                    transition={{ duration: 2.2, delay: 1 }}
                  />
                  {/* graduation marks */}
                  {[10, 20, 30, 40, 50].map((m) => (
                    <path key={m} d={`M${m} 322 v5`} stroke="#64748B" strokeWidth="0.8" />
                  ))}
                  {/* plunger */}
                  <motion.g initial={{ x: 0 }} animate={reduce ? {} : { x: [0, 42] }} transition={{ duration: 2.2, delay: 1 }}>
                    <rect x="-4" y="324" width="6" height="16" rx="1" fill="#334155" />
                    <rect x="-46" y="329.5" width="44" height="5" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="0.6" />
                    <rect x="-52" y="321" width="7" height="22" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
                  </motion.g>
                  {/* finger flange */}
                  <rect x="-12" y="316" width="5" height="32" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="0.6" />
                </g>
              </motion.g>
              {/* concentrate diffusing into the lesion */}
              <g clipPath={url("tibClip")}>
                <motion.ellipse
                  cx="146" cy="330" rx="34" ry="19"
                  fill={url("heal")}
                  filter={url("blur3")}
                  initial={{ opacity: 0, scale: 0.2 }}
                  animate={{ opacity: [0, 0.9, 0.75], scale: [0.2, 1, 1.05] }}
                  transition={{ duration: 2.4, delay: 1.1 }}
                  style={{ transformOrigin: "146px 330px" }}
                />
              </g>
            </motion.g>
          )}
        </AnimatePresence>
        </g>

        {/* ---------- Spotlight: dim everything except the problem ---------- */}
        <motion.rect
          x="40" y="100" width="320" height="380"
          fill="#F8FAFC"
          mask={url("spot")}
          initial={false}
          animate={{ opacity: 0.6 }}
          pointerEvents="none"
        />

        {/* ---------- Callout: ring + pointer + big plain-language label ---------- */}
        <AnimatePresence mode="wait">
          {(() => {
            const c = CALLOUTS[active];
            const right = c.bx > 150;
            const sx = right ? c.bx : c.bx + BOX_W;
            const sy = c.by + BOX_H / 2;
            const ex = c.cx + (right ? c.rx * 0.75 : -c.rx * 0.75);
            const ey = c.cy + (sy > c.cy ? c.ry * 0.7 : -c.ry * 0.7);
            const ring = active === "injection" ? "#0F766E" : "#DC2626";
            return (
              <motion.g key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                <motion.ellipse
                  cx={c.cx} cy={c.cy} rx={c.rx} ry={c.ry}
                  fill="none" stroke={ring} strokeWidth="3" strokeDasharray="7 5"
                  animate={reduce ? {} : { scale: [1, 1.08, 1], opacity: [1, 0.7, 1] }}
                  transition={breathe}
                  style={{ transformOrigin: `${c.cx}px ${c.cy}px` }}
                />
                <motion.path
                  d={`M${sx} ${sy} L${ex} ${ey}`}
                  stroke={ring} strokeWidth="2.2" fill="none"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5, delay: 0.15 }}
                />
                <circle cx={ex} cy={ey} r="4.5" fill={ring} stroke="#fff" strokeWidth="1.5" />
                <g filter={url("shadow")}>
                  <rect x={c.bx} y={c.by} width={BOX_W} height={BOX_H} rx="10" fill="#FFFFFF" stroke={ring} strokeWidth="2" />
                </g>
                <text x={c.bx + 12} y={c.by + 24} fontSize="17" fontWeight="700" fill={ring} fontFamily="inherit">
                  {c.title}
                </text>
                <text x={c.bx + 12} y={c.by + 44} fontSize="12.5" fill="#1E293B" fontFamily="inherit">{c.sub[0]}</text>
                <text x={c.bx + 12} y={c.by + 59} fontSize="12.5" fill="#1E293B" fontFamily="inherit">{c.sub[1]}</text>
              </motion.g>
            );
          })()}
        </AnimatePresence>
      </svg>

      {showCaption && (
        <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center px-3">
          <AnimatePresence mode="wait">
            <motion.span
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="rounded-full bg-[#12302D]/90 px-4 py-1.5 text-center text-xs font-semibold text-white shadow-lg backdrop-blur-sm sm:text-sm"
            >
              {LABELS[active]}
            </motion.span>
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
