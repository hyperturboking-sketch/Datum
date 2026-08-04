"use client";

import { useEffect, useRef, useState } from "react";

const caseStudies = [
  {
    firm: "Buro Happold",
    project: "Crossrail Elizabeth Line",
    metric: "68%",
    metricLabel: "faster quantity takeoffs",
    description:
      "Automated structural model parsing reduced a 12-week takeoff process to under 4 weeks across 10 stations.",
    tag: "Infrastructure",
  },
  {
    firm: "Arup",
    project: "HS2 Phase 2 Viaducts",
    metric: "94%",
    metricLabel: "compliance pass rate",
    description:
      "Datum's code compliance agent caught 2,300+ issues before manual review, saving 340 engineering hours.",
    tag: "Transport",
  },
  {
    firm: "WSP",
    project: "Canary Wharf Crossrail Place",
    metric: "4.2×",
    metricLabel: "ROI in first quarter",
    description:
      "Integrated IFC parsing and bid automation reduced tender preparation from 6 weeks to 10 days.",
    tag: "Commercial",
  },
];

export default function CaseStudies() {
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
    <section ref={ref} className="relative bg-[#FFFFFF] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#6366F1]/60 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Case Studies
          </p>
          <h2
            className={`text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.02em] text-[#111827] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Measured impact across
            <br />
            real engineering projects
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {caseStudies.map((study, i) => (
            <div
              key={study.project}
              className={`group rounded-3xl border border-[#E5E7EB] bg-white p-8 transition-all duration-700 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF]">
                {study.tag}
              </span>
              <div className="mt-6">
                <span className="text-[clamp(2rem,4vw,3.5rem)] font-normal text-[#111827]" style={{ fontFamily: "var(--font-heading)" }}>
                  {study.metric}
                </span>
                <p className="mt-1 text-[13px] text-[#6366F1]/70 font-light">
                  {study.metricLabel}
                </p>
              </div>
              <h3 className="mt-5 text-[15px] font-medium text-[#111827]">
                {study.project}
              </h3>
              <p className="mt-1 text-[12px] text-[#9CA3AF] font-light">
                {study.firm}
              </p>
              <p className="mt-3 text-[13px] leading-relaxed text-[#6B7280] font-light">
                {study.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
