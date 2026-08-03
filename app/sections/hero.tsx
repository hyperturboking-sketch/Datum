"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;
  const overlayOpacity = Math.min(0.85, 0.7 + scrollY * 0.0005);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] overflow-hidden flex items-center justify-center"
    >
      {/* Painting Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <Image
          src="/images/almond-blossom.jpg"
          alt=""
          fill
          className="object-cover scale-110"
          style={{ filter: "blur(2px) saturate(0.85)" }}
          priority
        />
      </div>

      {/* Dark Navy Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(180deg, rgba(9,9,11,${overlayOpacity}) 0%, rgba(9,9,11,0.75) 50%, rgba(9,9,11,${Math.min(0.95, overlayOpacity + 0.1)}) 100%)`,
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(9,9,11,0.6) 100%)",
        }}
      />

      {/* Film Grain */}
      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 z-[4] pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(129,140,248,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129,140,248,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Blueprint Wireframes */}
      <svg
        className="absolute inset-0 z-[5] w-full h-full pointer-events-none opacity-[0.02]"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Bridge structure wireframe */}
        <g stroke="rgba(129,140,248,0.6)" strokeWidth="0.5" fill="none">
          {/* Main cable */}
          <path d="M200,400 Q720,200 1240,400" />
          <path d="M200,400 Q720,250 1240,400" strokeDasharray="4,8" />
          {/* Vertical cables */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const x = 200 + i * 130;
            const y = 400 - (1 - Math.pow((i - 4) / 4, 2)) * 160;
            return (
              <line key={i} x1={x} y1={y + 30} x2={x} y2={520} />
            );
          })}
          {/* Deck */}
          <line x1="150" y1="520" x2="1290" y2="520" />
          <line x1="150" y1="525" x2="1290" y2="525" strokeDasharray="2,6" />
          {/* Dimensions */}
          <text
            x="720"
            y="560"
            textAnchor="middle"
            fill="rgba(129,140,248,0.4)"
            fontSize="8"
            fontFamily="monospace"
          >
            1,240.00 m
          </text>
          <text
            x="1320"
            y="460"
            fill="rgba(129,140,248,0.3)"
            fontSize="7"
            fontFamily="monospace"
          >
            EL. +42.500
          </text>
          {/* Coordinate markers */}
          <circle cx="200" cy="520" r="3" strokeDasharray="1,2" />
          <circle cx="1240" cy="520" r="3" strokeDasharray="1,2" />
          <text
            x="200"
            y="540"
            textAnchor="middle"
            fill="rgba(129,140,248,0.3)"
            fontSize="6"
            fontFamily="monospace"
          >
            A
          </text>
          <text
            x="1240"
            y="540"
            textAnchor="middle"
            fill="rgba(129,140,248,0.3)"
            fontSize="6"
            fontFamily="monospace"
          >
            B
          </text>
          {/* IFC annotation */}
          <text
            x="100"
            y="150"
            fill="rgba(129,140,248,0.25)"
            fontSize="7"
            fontFamily="monospace"
          >
            IFC4 / WALL / SLAB / BEAM
          </text>
          <text
            x="1200"
            y="150"
            textAnchor="end"
            fill="rgba(129,140,248,0.25)"
            fontSize="7"
            fontFamily="monospace"
          >
            DATUM v2.1 — structural analysis
          </text>
        </g>
      </svg>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-[#818CF8]/70"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Structural Engineering Intelligence
        </p>
        <h1
          className="text-[clamp(2.5rem,6vw,5rem)] font-normal leading-[1.05] tracking-[-0.03em] text-[#F5F5F5]"
          style={{ fontFamily: "var(--font-brand)" }}
        >
          Datum
        </h1>
        <p
          className="mx-auto mt-5 max-w-xl text-[clamp(1rem,2vw,1.25rem)] leading-relaxed text-[#A1A1AA] font-light"
          style={{ fontFamily: "var(--font-body)" }}
        >
          The operating system for modern structural engineering.
          <br />
          From IFC models to decision-ready intelligence, in one pass.
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#how-it-works"
            className="group relative inline-flex items-center gap-2 rounded-full bg-[#818CF8] px-7 py-3 text-[14px] font-medium text-[#09090B] transition-all duration-500 hover:bg-[#6366F1] hover:shadow-[0_0_40px_rgba(129,140,248,0.25)] active:scale-[0.98]"
          >
            Get Started
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#09090B]/10 text-[10px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              →
            </span>
          </a>
          <a
            href="#product"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.08)] px-7 py-3 text-[14px] font-medium text-[#A1A1AA] transition-all duration-500 hover:border-[rgba(255,255,255,0.15)] hover:text-[#F5F5F5] hover:shadow-[0_0_30px_rgba(255,255,255,0.03)] active:scale-[0.98]"
          >
            See the Platform
          </a>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 z-[6] bg-gradient-to-t from-[#09090B] to-transparent" />
    </section>
  );
}
