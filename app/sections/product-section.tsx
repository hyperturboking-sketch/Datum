"use client";

import { useEffect, useRef, useState } from "react";

interface ProductSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  features: Array<{ title: string; description: string }>;
  visual: React.ReactNode;
  reversed?: boolean;
}

export default function ProductSection({
  eyebrow,
  title,
  description,
  features,
  visual,
  reversed,
}: ProductSectionProps) {
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
    <section ref={ref} className="relative bg-[#FAFAFA] py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div
          className={`grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center`}
          style={{ direction: reversed ? "rtl" : "ltr" }}
        >
          {/* Text */}
          <div style={{ direction: "ltr" }}>
            <p
              className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#6366F1]/60 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              {eyebrow}
            </p>
            <h2
              className={`text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.02em] text-[#111827] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {title}
            </h2>
            <p
              className={`mt-5 text-[15px] leading-[1.7] text-[#6B7280] font-light transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              {description}
            </p>
            <div className="mt-8 space-y-4">
              {features.map((f, i) => (
                <div
                  key={f.title}
                  className={`group transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                  style={{ transitionDelay: `${300 + i * 100}ms` }}
                >
                  <h4 className="text-[14px] font-medium text-[#111827]">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#9CA3AF] font-light">
                    {f.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual */}
          <div
            style={{ direction: "ltr" }}
            className={`transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {visual}
          </div>
        </div>
      </div>
    </section>
  );
}
