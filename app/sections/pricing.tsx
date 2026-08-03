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
    <section ref={ref} className="relative bg-[#09090B] py-24 lg:py-36">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#818CF8]/70 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Pricing
          </p>
          <h2
            className={`text-[clamp(1.75rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-[#F5F5F5] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontFamily: "var(--font-body)" }}
          >
            Built for engineering teams,
            <br />
            not individual users
          </h2>
          <p
            className={`mt-5 text-[15px] text-[#71717A] font-light transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            Every plan includes unlimited team members. Pricing scales with
            your model volume, not your headcount.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-8 transition-all duration-700 ${
                plan.highlighted
                  ? "border-[#818CF8]/20 bg-[rgba(129,140,248,0.04)] shadow-[0_0_60px_rgba(129,140,248,0.06)]"
                  : "border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)]"
              } ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${200 + i * 150}ms` }}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#818CF8] px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] text-[#09090B]">
                  Most Popular
                </span>
              )}
              <h3
                className="text-[16px] font-medium text-[#F5F5F5]"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-[clamp(1.5rem,3vw,2.5rem)] font-light text-[#F5F5F5]">
                  {plan.price}
                </span>
                <span className="text-[13px] text-[#52525B] font-light">
                  {plan.period}
                </span>
              </div>
              <p className="mt-3 text-[13px] text-[#71717A] font-light">
                {plan.description}
              </p>
              <ul className="mt-6 space-y-2.5">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <span className="mt-0.5 text-[12px] text-[#818CF8]/60">
                      ✓
                    </span>
                    <span className="text-[13px] text-[#A1A1AA] font-light">
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#"
                className={`mt-8 block w-full rounded-full py-3 text-center text-[13px] font-medium transition-all duration-500 active:scale-[0.98] ${
                  plan.highlighted
                    ? "bg-[#818CF8] text-[#09090B] hover:bg-[#6366F1]"
                    : "border border-[rgba(255,255,255,0.08)] text-[#A1A1AA] hover:border-[rgba(255,255,255,0.15)] hover:text-[#F5F5F5]"
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
