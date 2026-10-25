"use client";

import { useEffect } from "react";

const ICON = (d: string) =>
  `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="${d}"/></svg>`;

/** Adds prev/next arrow buttons to every `.m-carousel` (CSS swipe carousels shown below md). */
export default function MobileCarouselNav() {
  useEffect(() => {
    const cleanups: (() => void)[] = [];

    document.querySelectorAll<HTMLElement>(".m-carousel").forEach((track) => {
      if (track.dataset.navReady) return;
      track.dataset.navReady = "1";

      const wrap = document.createElement("div");
      wrap.className = "m-carousel-wrap";
      track.parentNode!.insertBefore(wrap, track);
      wrap.appendChild(track);

      const make = (dir: -1 | 1) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = `m-carousel-btn ${dir < 0 ? "prev" : "next"}`;
        b.setAttribute("aria-label", dir < 0 ? "Previous" : "Next");
        b.innerHTML = ICON(dir < 0 ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6");
        b.onclick = () => {
          const slide = track.children[0] as HTMLElement | undefined;
          const step = slide ? slide.offsetWidth + 14 : track.clientWidth * 0.8;
          track.scrollBy({ left: dir * step, behavior: "smooth" });
        };
        wrap.appendChild(b);
        return b;
      };
      const prev = make(-1);
      const next = make(1);

      const update = () => {
        prev.disabled = track.scrollLeft <= 4;
        next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      };
      update();
      track.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      cleanups.push(() => {
        track.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
      });
    });

    return () => cleanups.forEach((c) => c());
  }, []);

  return null;
}
