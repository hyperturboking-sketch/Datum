"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const FRAMES = [
  {
    src: "/images/bridge-sequence/frame-1.jpg",
    label: "Foundation & Ground Work",
    description: "Deep foundations, pile caps, and abutments established",
  },
  {
    src: "/images/bridge-sequence/frame-2.jpg",
    label: "Tower Construction",
    description: "Structural towers rise from the foundation",
  },
  {
    src: "/images/bridge-sequence/frame-3.jpg",
    label: "Deck Assembly",
    description: "Road deck segments positioned and connected",
  },
  {
    src: "/images/bridge-sequence/frame-4.jpg",
    label: "Bridge Complete",
    description: "Cables tensioned, finishes applied, open to traffic",
  },
];

export default function ScrollBridge() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScroll = containerRef.current.offsetHeight - windowHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / totalScroll));
      setProgress(p);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const frameIndex = Math.min(
    FRAMES.length - 1,
    Math.floor(progress * FRAMES.length)
  );

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "400vh" }}
    >
      {/* Sticky viewport */}
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[#FAFAFA]">
        {/* Blueprint grid background */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500"
          style={{
            opacity: 0.04 + progress * 0.03,
            backgroundImage: `
              linear-gradient(#6366F1 1px, transparent 1px),
              linear-gradient(90deg, #6366F1 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Engineering dimension lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-700"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          style={{ opacity: 0.03 + progress * 0.04 }}
        >
          <g stroke="#6366F1" strokeWidth="0.5" fill="none">
            <line x1="200" y1="100" x2="1240" y2="100" />
            <line x1="200" y1="95" x2="200" y2="105" />
            <line x1="1240" y1="95" x2="1240" y2="105" />
            <text x="720" y="95" textAnchor="middle" fill="#6366F1" fontSize="7" fontFamily="monospace">
              1040.00
            </text>
            <line x1="100" y1="200" x2="100" y2="700" />
            <line x1="95" y1="200" x2="105" y2="200" />
            <line x1="95" y1="700" x2="105" y2="700" />
            <text x="95" y="450" textAnchor="middle" fill="#6366F1" fontSize="7" fontFamily="monospace" transform="rotate(-90, 95, 450)">
              500.00
            </text>
            <line x1="0" y1="450" x2="1440" y2="450" strokeDasharray="4,12" />
            <line x1="720" y1="0" x2="720" y2="900" strokeDasharray="4,12" />
          </g>
        </svg>

        {/* Image sequence */}
        <div className="absolute inset-0 flex items-center justify-center">
          {FRAMES.map((frame, i) => {
            const isActive = i === frameIndex;
            const isPast = i < frameIndex;
            const isFuture = i > frameIndex;

            let opacity = 0;
            let scale = 1;
            let translateY = 20;

            if (isActive) {
              opacity = 1;
              scale = 1;
              translateY = 0;
            } else if (isPast) {
              opacity = 0;
              scale = 0.95;
              translateY = -20;
            } else if (isFuture) {
              opacity = 0;
              scale = 1.05;
              translateY = 20;
            }

            return (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center transition-all duration-700"
                style={{
                  opacity,
                  transform: `scale(${scale}) translateY(${translateY}px)`,
                  transitionTimingFunction: "cubic-bezier(0.32, 0.72, 0, 1)",
                }}
              >
                <Image
                  src={frame.src}
                  alt={frame.label}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
            );
          })}
        </div>

        {/* Construction stage label */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="mx-auto max-w-7xl px-6 pb-12">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-[#6366F1]/60 mb-2">
                  Construction Progress
                </p>
                <h3
                  className="text-[clamp(1.5rem,3vw,2.25rem)] font-normal text-[#111827] transition-all duration-500"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {FRAMES[frameIndex].label}
                </h3>
                <p className="mt-1 text-[14px] text-[#6B7280] font-light">
                  {FRAMES[frameIndex].description}
                </p>
              </div>

              {/* Progress indicator */}
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-[#9CA3AF] font-light tabular-nums">
                  {Math.round(progress * 100)}%
                </span>
                <div className="w-32 h-1 rounded-full bg-[#E5E7EB] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#6366F1] transition-all duration-300"
                    style={{ width: `${progress * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Frame dots */}
            <div className="mt-6 flex gap-2">
              {FRAMES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === frameIndex
                      ? "w-8 bg-[#6366F1]"
                      : i < frameIndex
                      ? "w-1.5 bg-[#6366F1]/40"
                      : "w-1.5 bg-[#E5E7EB]"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}
