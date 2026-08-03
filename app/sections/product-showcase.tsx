"use client";

import { useEffect, useRef, useState } from "react";

export default function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="product"
      ref={ref}
      className="relative bg-[#09090B] py-24 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#818CF8]/70 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            The Platform
          </p>
          <h2
            className={`text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-[#F5F5F5] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            One interface.
            <br />
            Every structural deliverable.
          </h2>
        </div>

        {/* Dashboard Screenshot — Double Bezel */}
        <div
          className={`mx-auto mt-16 max-w-5xl transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="rounded-[2rem] bg-[rgba(255,255,255,0.03)] p-2 ring-1 ring-[rgba(255,255,255,0.06)]">
            <div className="rounded-[calc(2rem-0.375rem)] bg-[#0F0F12] p-1 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
              <div className="overflow-hidden rounded-[calc(2rem-0.75rem)] border border-[rgba(255,255,255,0.04)]">
                {/* Fake dashboard chrome */}
                <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,0.04)] bg-[#09090B] px-5 py-3">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#27272A]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#27272A]" />
                    <div className="h-2.5 w-2.5 rounded-full bg-[#27272A]" />
                  </div>
                  <div className="mx-auto flex items-center gap-2 rounded-full bg-[rgba(255,255,255,0.03)] px-4 py-1">
                    <svg
                      viewBox="0 0 16 16"
                      fill="none"
                      className="h-3 w-3 text-[#52525B]"
                    >
                      <path
                        d="M8 1v14M1 8h14"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                    <span className="text-[11px] text-[#52525B] font-light">
                      app.datum.dev/dashboard
                    </span>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="relative bg-[#09090B] p-6 lg:p-8">
                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {[
                      { label: "Projects", value: "12", delta: "+2" },
                      { label: "Models Parsed", value: "847", delta: "+34" },
                      { label: "Compliance Checks", value: "2,341", delta: "+189" },
                      { label: "RFIs Generated", value: "56", delta: "+8" },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] p-4"
                      >
                        <p className="text-[11px] text-[#52525B] font-light">
                          {stat.label}
                        </p>
                        <p className="mt-1 text-[22px] font-light text-[#F5F5F5]">
                          {stat.value}
                        </p>
                        <p className="mt-0.5 text-[10px] text-[#22C55E]/70">
                          {stat.delta} this month
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="col-span-2 rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] p-5">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[13px] text-[#A1A1AA] font-light">
                          Quantity Takeoff — Bridge Phase 3
                        </span>
                        <span className="text-[10px] text-[#22C55E]/70 bg-[#22C55E]/10 px-2 py-0.5 rounded-full">
                          Complete
                        </span>
                      </div>
                      <div className="space-y-2">
                        {[
                          { item: "Structural Steel (A992)", qty: "142.5 t", bar: 0.85 },
                          { item: "Concrete (C40/50)", qty: "380 m³", bar: 0.72 },
                          { item: "Rebar (B500B)", qty: "89.2 t", bar: 0.58 },
                          { item: "Post-Tensioning Cables", qty: "24,600 m", bar: 0.42 },
                        ].map((row) => (
                          <div
                            key={row.item}
                            className="flex items-center gap-4 text-[12px]"
                          >
                            <span className="w-48 text-[#71717A] font-light">
                              {row.item}
                            </span>
                            <span className="w-20 text-right text-[#A1A1AA] font-light">
                              {row.qty}
                            </span>
                            <div className="flex-1 h-1 rounded-full bg-[rgba(255,255,255,0.04)] overflow-hidden">
                              <div
                                className="h-full rounded-full bg-[#818CF8]/40"
                                style={{ width: `${row.bar * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.02)] p-5">
                      <span className="text-[13px] text-[#A1A1AA] font-light">
                        Compliance Status
                      </span>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="relative h-16 w-16">
                          <svg viewBox="0 0 36 36" className="h-full w-full">
                            <path
                              d="M18 2.0845a15.9155 15.9155 0 010 31.831 15.9155 15.9155 0 010-31.831"
                              fill="none"
                              stroke="rgba(255,255,255,0.04)"
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
                          <span className="absolute inset-0 flex items-center justify-center text-[14px] font-medium text-[#22C55E]">
                            94%
                          </span>
                        </div>
                        <div className="space-y-1">
                          <p className="text-[11px] text-[#71717A] font-light">
                            2,341 checks passed
                          </p>
                          <p className="text-[11px] text-[#71717A] font-light">
                            142 warnings
                          </p>
                          <p className="text-[11px] text-[#EF4444]/70 font-light">
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
    </section>
  );
}
