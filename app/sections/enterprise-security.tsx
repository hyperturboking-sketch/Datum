"use client";

import { useEffect, useRef, useState } from "react";

const securityFeatures = [
  {
    title: "SOC 2 Type II",
    description: "Audited annually for security, availability, and confidentiality controls.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "ISO 27001",
    description: "Certified information security management system (ISMS).",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "GDPR Compliant",
    description: "Full data processing agreements and EU data residency available.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "End-to-End Encryption",
    description: "AES-256 encryption at rest, TLS 1.3 in transit. Your models never leave your control.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function EnterpriseSecurity() {
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
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20 items-center">
          <div>
            <p
              className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#6366F1]/60 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              Enterprise Security
            </p>
            <h2
              className={`text-[clamp(1.75rem,3.5vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.02em] text-[#111827] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Built for firms that
              <br />
              handle sensitive data
            </h2>
            <p
              className={`mt-5 text-[15px] leading-[1.7] text-[#6B7280] font-light transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              Your structural models contain proprietary engineering data.
              Datum is designed from the ground up to protect it, with enterprise-grade
              security, compliance certifications, and data residency options.
            </p>
          </div>

          <div
            className={`grid grid-cols-1 gap-4 transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            {securityFeatures.map((f, i) => (
              <div
                key={f.title}
                className="flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 transition-all duration-500 hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9FAFB] text-[#6366F1]/70">
                  {f.icon}
                </span>
                <div>
                  <h4 className="text-[14px] font-medium text-[#111827]">
                    {f.title}
                  </h4>
                  <p className="mt-1 text-[13px] text-[#9CA3AF] font-light leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
