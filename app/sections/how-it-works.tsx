"use client";

import { useEffect, useRef, useState } from "react";

const steps = [
  {
    number: "01",
    label: "IFC Input",
    title: "Ingest structural models",
    description:
      "Upload IFC files from Revit, Tekla, AutoCAD, or any BIM authoring tool. Datum parses geometry, materials, and structural properties automatically.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M12 18v-6M9 15h6"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "02",
    label: "AI Agents",
    title: "Run specialist analysis",
    description:
      "Four domain-specific agents process your model simultaneously: quantity takeoff, code compliance, ESG metrics, and RFI extraction.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Decision-ready outputs",
    label: "Deliverables",
    description:
      "Bills of quantities, compliance reports, RFI responses, and ESG metrics — formatted for your team and ready to act on.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
        <path
          d="M22 11.08V12a10 10 0 11-5.93-9.14"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22 4L12 14.01l-3-3"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative bg-[#09090B] py-24 lg:py-36"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#818CF8]/70 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            How It Works
          </p>
          <h2
            className={`text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-[#F5F5F5] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            From IFC to insight,
            <br />
            in one pass
          </h2>
        </div>

        <div className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-px md:grid-cols-3">
          {steps.map((step, i) => (
            <div
              key={step.number}
              className={`group relative bg-[rgba(255,255,255,0.02)] p-8 lg:p-10 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <div className="mb-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgba(255,255,255,0.06)] text-[#818CF8]/70 transition-all duration-500 group-hover:border-[#818CF8]/30 group-hover:text-[#818CF8]">
                  {step.icon}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#52525B]">
                  {step.label}
                </span>
              </div>
              <h3
                className="text-[18px] font-normal text-[#F5F5F5]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {step.title}
              </h3>
              <p className="mt-3 text-[14px] leading-relaxed text-[#71717A] font-light">
                {step.description}
              </p>
              {/* Connector line */}
              {i < 2 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-8 -translate-y-1/2 translate-x-full bg-[rgba(255,255,255,0.06)] md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
