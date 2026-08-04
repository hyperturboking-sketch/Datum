"use client";

import { useEffect, useRef, useState } from "react";

export default function FinalCta() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative bg-[#111827] py-28 lg:py-36 overflow-hidden"
    >
      {/* Subtle blueprint grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#818CF8]/60 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Get Started
        </p>
        <h2
          className={`text-[clamp(2rem,5vw,4rem)] font-normal leading-[1.08] tracking-[-0.03em] text-white transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Start engineering with
          <br />
          intelligence
        </h2>
        <p
          className={`mx-auto mt-6 max-w-lg text-[15px] leading-[1.7] text-[#9CA3AF] font-light transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          Join the engineering firms that trust Datum to transform their
          structural models into decision-ready intelligence.
        </p>
        <div
          className={`mt-10 flex items-center justify-center gap-4 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <a
            href="#"
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-[14px] font-medium text-[#111827] transition-all duration-500 hover:bg-[#F9FAFB] hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] active:scale-[0.98]"
          >
            Start Free Trial
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#111827]/5 text-[11px] transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-full border border-[rgba(255,255,255,0.12)] px-7 py-3.5 text-[14px] font-medium text-[#D1D5DB] transition-all duration-500 hover:border-[rgba(255,255,255,0.2)] hover:text-white active:scale-[0.98]"
          >
            Talk to Sales
          </a>
        </div>
      </div>
    </section>
  );
}
