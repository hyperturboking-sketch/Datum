"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  const tiltX = mousePos.y * -1.5;
  const tiltY = mousePos.x * 1.5;

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] overflow-hidden bg-[#FFFFFF]"
    >
      {/* Subtle artwork at 5% opacity */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/almond-blossom.jpg"
          alt=""
          fill
          className="object-cover object-center"
          style={{
            opacity: 0.06,
            filter: "blur(1px) saturate(0.3) brightness(1.2)",
          }}
          priority
        />
      </div>

      {/* Paper texture */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "200px 200px",
        }}
      />

      {/* Blueprint grid — barely visible */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          opacity: 0.03,
          backgroundImage: `
            linear-gradient(#6366F1 1px, transparent 1px),
            linear-gradient(90deg, #6366F1 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Engineering dimension lines */}
      <svg
        className="absolute inset-0 z-[3] w-full h-full pointer-events-none"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        style={{ opacity: 0.025 }}
      >
        <g stroke="#6366F1" strokeWidth="0.5" fill="none">
          {/* Horizontal dimension */}
          <line x1="200" y1="120" x2="1240" y2="120" />
          <line x1="200" y1="115" x2="200" y2="125" />
          <line x1="1240" y1="115" x2="1240" y2="125" />
          <text x="720" y="115" textAnchor="middle" fill="#6366F1" fontSize="8" fontFamily="monospace">
            1040.00
          </text>

          {/* Vertical dimension */}
          <line x1="120" y1="200" x2="120" y2="700" />
          <line x1="115" y1="200" x2="125" y2="200" />
          <line x1="115" y1="700" x2="125" y2="700" />
          <text x="115" y="450" textAnchor="middle" fill="#6366F1" fontSize="8" fontFamily="monospace" transform="rotate(-90, 115, 450)">
            500.00
          </text>

          {/* Coordinate markers */}
          <circle cx="200" cy="120" r="2" strokeDasharray="1,2" />
          <circle cx="1240" cy="120" r="2" strokeDasharray="1,2" />

          {/* CAD construction lines */}
          <line x1="0" y1="450" x2="1440" y2="450" strokeDasharray="4,12" />
          <line x1="720" y1="0" x2="720" y2="900" strokeDasharray="4,12" />

          {/* Bridge wireframe hint */}
          <path d="M300,600 Q720,400 1140,600" strokeDasharray="2,8" />
          <line x1="300" y1="600" x2="300" y2="680" />
          <line x1="1140" y1="600" x2="1140" y2="680" />
          <text x="720" y="640" textAnchor="middle" fill="#6366F1" fontSize="7" fontFamily="monospace">
            STRUCTURAL ANALYSIS
          </text>
        </g>
      </svg>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="mx-auto max-w-4xl text-center">
          <p
            className="mb-6 text-[11px] font-medium uppercase tracking-[0.3em] text-[#6366F1]/60"
          >
            Structural Engineering Intelligence
          </p>

          <h1
            className="text-[clamp(2.75rem,7vw,5.5rem)] font-normal leading-[1.02] tracking-[-0.03em] text-[#111827]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            The operating system
            <br />
            for modern engineering
          </h1>

          <p
            className="mx-auto mt-7 max-w-xl text-[clamp(1rem,1.8vw,1.2rem)] leading-[1.7] text-[#6B7280] font-light"
          >
            Datum reads your IFC and Revit models, runs specialist AI agents,
            and delivers quantity takeoffs, compliance reports, bid estimates,
            and RFIs — in one pass.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="#how-it-works"
              className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#111827] px-7 py-3.5 text-[14px] font-medium text-white transition-all duration-500 hover:bg-[#1F2937] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] active:scale-[0.98]"
            >
              Start Free Trial
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/10 text-[11px] transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
            <a
              href="#product"
              className="inline-flex items-center gap-2 rounded-full border border-[#E5E7EB] px-7 py-3.5 text-[14px] font-medium text-[#374151] transition-all duration-500 hover:border-[#D1D5DB] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] active:scale-[0.98]"
            >
              See the Platform
            </a>
          </div>

          {/* Engineering integrations */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {["Revit", "AutoCAD", "IFC", "Navisworks", "Tekla", "Bentley", "Rhino"].map(
              (name) => (
                <span
                  key={name}
                  className="text-[13px] font-light text-[#9CA3AF] tracking-wide"
                >
                  {name}
                </span>
              )
            )}
          </div>
        </div>

        {/* Dashboard Screenshot */}
        <div
          className="mx-auto mt-16 max-w-6xl lg:mt-20"
          style={{
            transform: `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
            transition: "transform 0.4s cubic-bezier(0.32,0.72,0,1)",
          }}
        >
          {/* Double Bezel */}
          <div className="rounded-[2rem] bg-[#F3F4F6] p-[3px] ring-1 ring-[#E5E7EB] shadow-[0_25px_80px_rgba(0,0,0,0.08),0_4px_20px_rgba(0,0,0,0.04)]">
            <div className="rounded-[calc(2rem-3px)] bg-white p-[2px] shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]">
              <div className="overflow-hidden rounded-[calc(2rem-5px)] border border-[#F3F4F6]">
                {/* Browser Chrome */}
                <div className="flex items-center gap-2.5 border-b border-[#F3F4F6] bg-[#FAFAFA] px-5 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#E5E7EB]" />
                  </div>
                  <div className="mx-auto flex items-center gap-2 rounded-lg bg-white px-4 py-1.5 ring-1 ring-[#E5E7EB]">
                    <svg viewBox="0 0 16 16" fill="none" className="h-3 w-3 text-[#9CA3AF]">
                      <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                    <span className="text-[11px] text-[#9CA3AF] font-light">
                      app.datum.dev/dashboard
                    </span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="bg-white p-6 lg:p-8">
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Active Projects", value: "12", delta: "+2", deltaUp: true },
                      { label: "Models Parsed", value: "847", delta: "+34", deltaUp: true },
                      { label: "Compliance Rate", value: "94.2%", delta: "+1.3%", deltaUp: true },
                      { label: "RFIs Resolved", value: "56", delta: "+8", deltaUp: true },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-2xl border border-[#F3F4F6] bg-[#FAFAFA] p-4"
                      >
                        <p className="text-[11px] text-[#9CA3AF] font-light">
                          {stat.label}
                        </p>
                        <p className="mt-1.5 text-[24px] font-normal text-[#111827]">
                          {stat.value}
                        </p>
                        <p className="mt-0.5 text-[11px] text-[#22C55E] font-light">
                          {stat.delta} this month
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 rounded-2xl border border-[#F3F4F6] bg-[#FAFAFA] p-5">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-[13px] text-[#374151] font-light">
                          Quantity Takeoff — Bridge Phase 3
                        </span>
                        <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/8 px-2.5 py-1 rounded-full font-medium">
                          Complete
                        </span>
                      </div>
                      <div className="space-y-3">
                        {[
                          { item: "Structural Steel (A992)", qty: "142.5 t", pct: 85 },
                          { item: "Concrete (C40/50)", qty: "380 m³", pct: 72 },
                          { item: "Rebar (B500B)", qty: "89.2 t", pct: 58 },
                          { item: "Post-Tensioning Cables", qty: "24,600 m", pct: 42 },
                        ].map((row) => (
                          <div key={row.item} className="flex items-center gap-4 text-[12px]">
                            <span className="w-52 text-[#6B7280] font-light">
                              {row.item}
                            </span>
                            <span className="w-20 text-right text-[#374151] font-light">
                              {row.qty}
                            </span>
                            <div className="flex-1 h-1.5 rounded-full bg-[#E5E7EB] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#6366F1]/60"
                                style={{ width: `${row.pct}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[#F3F4F6] bg-[#FAFAFA] p-5">
                      <span className="text-[13px] text-[#374151] font-light">
                        Compliance Overview
                      </span>
                      <div className="mt-5 flex items-center gap-4">
                        <div className="relative h-18 w-18">
                          <svg viewBox="0 0 36 36" className="h-full w-full">
                            <path
                              d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                              fill="none"
                              stroke="#E5E7EB"
                              strokeWidth="2.5"
                            />
                            <path
                              d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                              fill="none"
                              stroke="#22C55E"
                              strokeWidth="2.5"
                              strokeDasharray="94, 100"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-[15px] font-medium text-[#22C55E]">
                            94%
                          </span>
                        </div>
                        <div className="space-y-1.5">
                          <p className="text-[11px] text-[#6B7280] font-light">
                            2,341 checks passed
                          </p>
                          <p className="text-[11px] text-[#6B7280] font-light">
                            142 warnings
                          </p>
                          <p className="text-[11px] text-[#EF4444] font-light">
                            3 failures
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-24 z-[4] bg-gradient-to-t from-[#FAFAFA] to-transparent" />
    </section>
  );
}
