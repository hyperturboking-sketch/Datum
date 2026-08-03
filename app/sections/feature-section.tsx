"use client";

import { useEffect, useRef, useState } from "react";

interface FeatureSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  features: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
  reversed?: boolean;
}

export default function FeatureSection({
  eyebrow,
  title,
  description,
  features,
  reversed,
}: FeatureSectionProps) {
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
    <section ref={ref} className="relative bg-[#09090B] py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 ${reversed ? "lg:direction-rtl" : ""}`}
        >
          {/* Text */}
          <div className="flex flex-col justify-center">
            <p
              className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#818CF8]/70 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {eyebrow}
            </p>
            <h2
              className={`text-[clamp(1.5rem,3vw,2.25rem)] font-light leading-[1.15] tracking-[-0.02em] text-[#F5F5F5] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "var(--font-body)" }}
            >
              {title}
            </h2>
            <p
              className={`mt-5 text-[15px] leading-relaxed text-[#71717A] font-light transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {description}
            </p>
            <div className="mt-8 space-y-5">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`group flex gap-4 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.06)] text-[#818CF8]/60 transition-all duration-500 group-hover:border-[#818CF8]/30 group-hover:text-[#818CF8]">
                    {f.icon}
                  </span>
                  <div>
                    <h4 className="text-[14px] font-medium text-[#E4E4E7]">
                      {f.title}
                    </h4>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#71717A] font-light">
                      {f.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="rounded-[1.5rem] bg-[rgba(255,255,255,0.02)] p-1 ring-1 ring-[rgba(255,255,255,0.04)]">
              <div className="rounded-[calc(1.5rem-0.25rem)] bg-[#0F0F12] p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
                {features.map((f) => (
                  <div
                    key={f.title}
                    className="flex items-center gap-3 rounded-lg border border-[rgba(255,255,255,0.04)] bg-[rgba(255,255,255,0.01)] px-4 py-3 mb-2 last:mb-0"
                  >
                    <span className="text-[#818CF8]/50">{f.icon}</span>
                    <span className="text-[13px] text-[#A1A1AA] font-light">
                      {f.title}
                    </span>
                    <span className="ml-auto text-[10px] text-[#52525B]">
                      ✓
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
