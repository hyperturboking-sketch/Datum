"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Team",
    monthly: 49,
    yearly: 39,
    description: "For small firms getting started with AI-assisted workflows.",
    features: [
      "10 projects",
      "Quantity takeoffs",
      "Code compliance checks",
      "Standard support",
    ],
    featured: false,
  },
  {
    name: "Pro",
    monthly: 149,
    yearly: 119,
    description: "For growing teams that need the full Datum platform.",
    features: [
      "Unlimited projects",
      "All four AI agents",
      "RFI automation",
      "ESG & carbon reporting",
      "Priority support",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    yearly: null,
    description: "For organizations with custom security and scaling needs.",
    features: [
      "Custom integrations",
      "On-premise deployment",
      "Dedicated success manager",
      "SLA & SSO",
    ],
    featured: false,
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<"cloud" | "onprem">("cloud");

  return (
    <section id="pricing" aria-label="Pricing" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#4F46E5]">
            Pricing
          </p>
          <h2 className="font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0F172A] sm:text-[44px]">
            Simple pricing for teams of every size
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-[#64748B]">
            Start free, scale when you are ready. No hidden fees, cancel any time.
          </p>
        </div>

        <div className="mt-10 flex justify-center">
          <div className="inline-flex rounded-[8px] border border-[#E2E8F0] bg-[#F8FAFC] p-1">
            <button
              type="button"
              onClick={() => setBilling("cloud")}
              className={`rounded-[8px] px-5 py-2 text-[14px] font-medium transition-colors ${
                billing === "cloud"
                  ? "bg-[#0F172A] text-white"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Cloud
            </button>
            <button
              type="button"
              onClick={() => setBilling("onprem")}
              className={`rounded-[8px] px-5 py-2 text-[14px] font-medium transition-colors ${
                billing === "onprem"
                  ? "bg-[#0F172A] text-white"
                  : "text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              On-Premise
            </button>
          </div>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col rounded-[12px] border bg-white p-8 ${
                plan.featured ? "border-2 border-[#4F46E5]" : "border-[#E2E8F0]"
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#4F46E5] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-[17px] font-semibold text-[#0F172A]">{plan.name}</h3>
              <p className="mt-1.5 min-h-[40px] text-[13px] leading-relaxed text-[#64748B]">
                {plan.description}
              </p>

              <div className="mt-5 flex items-baseline gap-1.5">
                {plan.monthly ? (
                  <>
                    <span className="font-serif text-[42px] font-medium leading-none tracking-tight text-[#0F172A] tabular-nums">
                      ${billing === "cloud" ? plan.monthly : plan.yearly * 1.4}
                    </span>
                    <span className="text-[14px] text-[#64748B]">/ user / mo</span>
                  </>
                ) : (
                  <span className="font-serif text-[42px] font-medium leading-none tracking-tight text-[#0F172A]">
                    Custom
                  </span>
                )}
              </div>

              <ul className="mt-7 flex flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-[#DCFCE7]">
                      <Check className="size-3 text-[#16A34A]" strokeWidth={2.5} />
                    </span>
                    <span className="text-[14px] text-[#0F172A]">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                type="button"
                onClick={() => alert("Sign up")}
                className={`mt-8 inline-flex h-11 w-full items-center justify-center rounded-[8px] text-[15px] font-medium transition-colors ${
                  plan.featured
                    ? "bg-[#0F172A] text-white hover:bg-[#1E293B]"
                    : "border border-[#E2E8F0] bg-white text-[#0F172A] hover:border-[#CBD5E1] hover:shadow-[0px_1px_2px_rgba(0,0,0,0.04)]"
                }`}
              >
                {plan.monthly ? "Start Free Trial" : "Contact Sales"}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-[13px] text-[#94A3B8]">
          All plans include a 14-day free trial. No credit card required.
        </p>
      </div>
    </section>
  );
}
