"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  children: React.ReactNode[];
  /** Tailwind width classes for each slide, e.g. "basis-[85%] md:basis-1/3". */
  slideClass?: string;
  dark?: boolean;
  autoPlayMs?: number;
  label: string;
}

/** Swipeable scroll-snap carousel with arrows, dots and optional autoplay (paused on hover). */
export default function Carousel({ children, slideClass = "basis-[85%] md:basis-1/3", dark = false, autoPlayMs, label }: Props) {
  const track = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [pages, setPages] = useState(1);
  const paused = useRef(false);

  const measure = useCallback(() => {
    const el = track.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth : el.clientWidth;
    const perView = Math.max(1, Math.round(el.clientWidth / step));
    setPages(Math.max(1, children.length - perView + 1));
    setIndex(Math.round(el.scrollLeft / step));
  }, [children.length]);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure]);

  const go = useCallback((i: number) => {
    const el = track.current;
    if (!el) return;
    const first = el.children[0] as HTMLElement | undefined;
    const step = first ? first.offsetWidth : el.clientWidth;
    el.scrollTo({ left: step * i, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!autoPlayMs || pages <= 1) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => {
      if (!paused.current) go(index + 1 >= pages ? 0 : index + 1);
    }, autoPlayMs);
    return () => clearInterval(t);
  }, [autoPlayMs, pages, index, go]);

  const btn = dark
    ? "border-white/20 bg-white/10 text-white hover:bg-white/20"
    : "border-[#1B2B2A]/10 bg-white text-[#1B2B2A] hover:bg-[#E8F1EF]";

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={label}
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
    >
      <div
        ref={track}
        onScroll={measure}
        className="no-scrollbar -mx-2 flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {children.map((child, i) => (
          <div key={i} className={`shrink-0 grow-0 snap-start px-2 ${slideClass}`}>
            {child}
          </div>
        ))}
      </div>

      {pages > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: pages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? (dark ? "w-7 bg-white" : "w-7 bg-[#0F766E]") : dark ? "w-2 bg-white/30" : "w-2 bg-[#0F766E]/25"
                }`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" aria-label="Previous" onClick={() => go(Math.max(0, index - 1))} disabled={index === 0} className={`grid h-10 w-10 place-items-center rounded-full border shadow-sm transition disabled:opacity-40 ${btn}`}>
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button type="button" aria-label="Next" onClick={() => go(Math.min(pages - 1, index + 1))} disabled={index >= pages - 1} className={`grid h-10 w-10 place-items-center rounded-full border shadow-sm transition disabled:opacity-40 ${btn}`}>
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
