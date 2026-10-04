"use client";

import React, { useState, useEffect, useRef } from "react";

interface JawaTimurGlobeProps {
  currentYearText: string;
  activePhaseIdx: number;
}

export default function JawaTimurGlobe({
  currentYearText,
  activePhaseIdx,
}: JawaTimurGlobeProps) {
  const totalPhases = 7;
  const prevIdxRef = useRef(activePhaseIdx);
  const lapCountRef = useRef(0);
  const stepDeg = 360 / totalPhases; // ~51.43 deg per phase
  const [rotationDeg, setRotationDeg] = useState(
    (activePhaseIdx % totalPhases) * stepDeg
  );

  useEffect(() => {
    const prev = prevIdxRef.current;
    const current = activePhaseIdx % totalPhases;

    if (prev === totalPhases - 1 && current === 0) {
      lapCountRef.current += 1;
    } else if (prev === 0 && current === totalPhases - 1) {
      lapCountRef.current -= 1;
    }

    const targetAngle = lapCountRef.current * 360 + current * stepDeg;
    setRotationDeg(targetAngle);
    prevIdxRef.current = current;
  }, [activePhaseIdx, stepDeg]);

  return (
    <div className="relative w-full max-w-5xl mx-auto overflow-hidden select-none flex flex-col items-center justify-end">
      {/* Main Dome Container */}
      <div className="relative w-full h-[240px] sm:h-[300px] md:h-[340px] flex items-end justify-center overflow-hidden">
        {/* Ambient Red Glow Halo */}
        <div className="absolute bottom-0 w-[95%] h-[85%] bg-radial from-bracket-border/30 via-red-600/15 to-transparent blur-3xl pointer-events-none" />

        {/* Globe Wrapper: Half-Sphere Dome */}
        <div className="relative w-[650px] sm:w-[800px] md:w-[940px] aspect-square translate-y-[50%] flex items-center justify-center shrink-0 pointer-events-none">
          {/* Rotating Globe SVG */}
          <div
            className="w-full h-full relative"
            style={{
              transform: `rotate(${rotationDeg}deg)`,
              transition: "transform 1.25s cubic-bezier(0.25, 1, 0.5, 1)",
            }}
          >
            <img
              src="/images/globe.svg"
              alt="CV Pelangi UV Globe"
              className="w-full h-full object-contain filter drop-shadow-[0_0_40px_rgba(246,84,86,0.65)]"
              draggable={false}
            />
          </div>

          {/* Dome Glow Ring */}
          <div className="absolute inset-0 rounded-full border-4 border-white/40 shadow-[inset_0_0_80px_rgba(246,84,86,0.5),0_0_50px_rgba(255,255,255,0.3)] pointer-events-none" />
        </div>

        {/* Minimal Pinpoint on Sidoarjo / Jawa Timur */}
        <div className="absolute top-4 sm:top-8 z-30 flex flex-col items-center pointer-events-none">
          <div className="relative flex flex-col items-center">
            {/* Ping Sonar Rings */}
            <span className="absolute top-1 w-10 h-10 rounded-full bg-white/60 animate-ping pointer-events-none" />
            <span className="absolute top-0 w-12 h-12 rounded-full bg-bracket-border/40 animate-ping pointer-events-none" />

            {/* GPS Location Pin with Year Badge */}
            <div className="relative z-10 flex flex-col items-center filter drop-shadow-[0_4px_16px_rgba(237,28,36,0.85)] animate-bounce duration-1000">
              <div className="px-3 py-1 rounded-full bg-gradient-to-r from-bracket-border to-red-600 border border-white text-white text-xs font-bold shadow-lg flex items-center gap-1.5">
                <span translate="no" className="material-symbols-outlined notranslate text-[15px] font-bold">
                  location_on
                </span>
                <span>{currentYearText}</span>
              </div>
              <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] border-t-bracket-border" />
            </div>

            {/* Anchor Glow Dot */}
            <div className="w-2.5 h-1 rounded-full bg-white blur-[1px] mt-0.5 shadow-[0_0_8px_#fff]" />
          </div>
        </div>
      </div>
    </div>
  );
}
