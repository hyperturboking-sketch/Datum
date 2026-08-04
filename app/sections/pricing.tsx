"use client";

import { useEffect, useRef, useState } from "react";

const plans = [
  {
    name: "Starter",
    price: "Custom",
    period: "per seat",
    description: "For small teams getting started with structural intelligence.",
    features: [
      "5 IFC model uploads / month",
      "Basic quantity takeoff",
      "Code compliance checks",
      "Email support",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "Custom",
    period: "per seat",
    description: "For firms that need full-spectrum structural analysis.",
    features: [
      "Unlimited IFC model uploads",
      "Advanced quantity takeoff with waste",
      "Full code compliance suite",
      "RFI generation",
      "Bid automation",
      "Priority support",
      "API access",
    ],
    cta: "Contact Sales",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored",
    description: "For large organizations with complex regulatory needs.",
    features: [
      "Everything in Professional",
      "Custom AI agent training",
      "On-premise deployment",
      "Dedicated account manager",
      "SSO & SAML",
      "SLA guarantees",
      "Custom integrations",
    ],
    cta: "Talk to Us",
    highlighted: false,
  },
];

export default function Pricing() {
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
            Pricing
          </p>
          <h2
            className={`text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.02em] text-[#111827] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Built for engineering teams,
            <br />
            not individual users
          </h2>
          <p
            className={`mt-5 text-[15px] text-[#6B7280] font-light transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Every plan includes unlimited team members. Pricing scales with
            your model volume, not your headcount.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl border p-8 transition-all duration-700 ${
                plan.highlighted
                  ? "border-[#6366F1]/20 bg-[#6366F1]/[0.02] shadow-[0_8px_40px_rgba(99,102,241,0.08)]"
                  : "border-[#E5E7EB] bg-white"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#6366F1] px-3.5 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-[16px] font-medium text-[#111827]">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-normal text-[#111827]" style={{ fontFamily: "var(--font-heading)" }}>
                  {plan.price}
                </span>
                <span className="text-[13px] text-[#9CA3AF] font-light">
                  {plan.period}
                </span>
              </div>
              <p className="mt-3 text-[13px] text-[#6B7280] font-light">
                {plan.description}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-[12px] text-[#6366F1]/60">
                      ✓
                    </span>
                    <span className="text-[13px] text-[#374151] font-light">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 block w-full rounded-full py-3.5 text-center text-[13px] font-medium transition-all duration-500 active:scale-[0.98] ${
                  plan.highlighted
                    ? "bg-[#111827] text-white hover:bg-[#1F2937] hover:shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
                    : "border border-[#E5E7EB] text-[#374151] hover:border-[#D1D5DB] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]"
                }`}
              >
                {plan.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
