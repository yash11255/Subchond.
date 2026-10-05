"use client";

import React from "react";
import { ANATOMY_STRUCTURES } from "@/lib/data";

interface AnatomyLabelsProps {
  activeId: string;
  onSelectStructure: (id: string) => void;
}

export default function AnatomyLabels({
  activeId,
  onSelectStructure,
}: AnatomyLabelsProps) {
  // Annotation line endpoints mapped to center knee model coords
  const lineConfigs: Record<
    string,
    { x1: number; y1: number; x2: number; y2: number; labelSide: "left" | "right" }
  > = {
    muscles: { x1: 20, y1: 20, x2: 42, y2: 24, labelSide: "left" },
    synovium: { x1: 20, y1: 38, x2: 38, y2: 38, labelSide: "left" },
    cartilage: { x1: 20, y1: 56, x2: 45, y2: 54, labelSide: "left" },
    meniscus: { x1: 20, y1: 74, x2: 44, y2: 68, labelSide: "left" },
    ligaments: { x1: 80, y1: 22, x2: 58, y2: 26, labelSide: "right" },
    bone: { x1: 80, y1: 38, x2: 55, y2: 42, labelSide: "right" },
    "bone-marrow": { x1: 80, y1: 58, x2: 52, y2: 60, labelSide: "right" },
    alignment: { x1: 80, y1: 78, x2: 50, y2: 82, labelSide: "right" },
  };

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {/* SVG Container for dynamic annotation lines */}
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {ANATOMY_STRUCTURES.map((struct) => {
          const config = lineConfigs[struct.id];
          if (!config) return null;
          const isActive = struct.id === activeId;

          return (
            <g key={struct.id} className="transition-all duration-500">
              {/* Thin leader line */}
              <line
                x1={`${config.x1}%`}
                y1={`${config.y1}%`}
                x2={`${config.x2}%`}
                y2={`${config.y2}%`}
                stroke={isActive ? "#7C2020" : "rgba(255, 255, 255, 0.35)"}
                strokeWidth={isActive ? "0.6" : "0.35"}
                strokeDasharray={isActive ? "none" : "1 1"}
              />
              {/* Target dot on anatomical structure */}
              <circle
                cx={`${config.x2}%`}
                cy={`${config.y2}%`}
                r={isActive ? "1.5" : "1"}
                fill={isActive ? "#7C2020" : "#E9E5DC"}
                className="transition-all duration-300"
              />
              {/* Outer pulsing ring for active item */}
              {isActive && (
                <circle
                  cx={`${config.x2}%`}
                  cy={`${config.y2}%`}
                  r="3.5"
                  fill="none"
                  stroke="#7C2020"
                  strokeWidth="0.4"
                  className="animate-ping origin-center opacity-75"
                />
              )}
            </g>
          );
        })}
      </svg>

      {/* HTML Overlay Labels positioned on sides */}
      {ANATOMY_STRUCTURES.map((struct) => {
        const config = lineConfigs[struct.id];
        if (!config) return null;
        const isActive = struct.id === activeId;

        const isLeft = config.labelSide === "left";

        return (
          <div
            key={struct.id}
            onClick={() => onSelectStructure(struct.id)}
            style={{
              left: isLeft ? `${config.x1 - 18}%` : `${config.x1 + 1}%`,
              top: `${config.y1 - 3}%`,
            }}
            className={`pointer-events-auto absolute cursor-pointer px-2 py-1 transition-all duration-300 ${
              isLeft ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`text-[11px] md:text-xs font-sans-clean tracking-wider uppercase transition-colors ${
                isActive
                  ? "text-white font-semibold"
                  : "text-[#A8A39A] hover:text-white"
              }`}
            >
              {struct.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}
