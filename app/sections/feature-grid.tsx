import {
  Calculator,
  ShieldCheck,
  MessageSquare,
  ScanLine,
  Files,
  Gauge,
} from "lucide-react";

const features = [
  {
    icon: Calculator,
    title: "Quantity Takeoffs",
    description:
      "Accurate quantities and material takeoffs generated directly from IFC geometry.",
  },
  {
    icon: ShieldCheck,
    title: "Code Compliance",
    description:
      "Continuous checks against active structural codes as the model evolves.",
  },
  {
    icon: MessageSquare,
    title: "RFI Answers",
    description:
      "Instant responses grounded in your model, with sources you can verify.",
  },
  {
    icon: ScanLine,
    title: "Model Reconciliation",
    description:
      "Spot the differences between design revisions before they reach site.",
  },
  {
    icon: Files,
    title: "Output Exports",
    description:
      "Bills of quantities, compliance reports, and ESG data in export-ready form.",
  },
  {
    icon: Gauge,
    title: "Cost & Risk Estimates",
    description:
      "Budget-level cost and risk visibility from the very first upload.",
  },
];

export default function FeatureGrid() {
  return (
    <section id="features" aria-label="Features" className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#4F46E5]">
            Features
          </p>
          <h2 className="font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0F172A] sm:text-[44px]">
            Purpose-built for modern AEC teams
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-[#64748B]">
            Everything your engineers need to move from model to decision, in
            one place.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[12px] border border-[#E2E8F0] bg-white p-7 transition-shadow hover:shadow-[0px_1px_2px_rgba(0,0,0,0.04)]"
            >
              <span className="mb-5 flex size-11 items-center justify-center rounded-[8px] bg-[#EEF2FF]">
                <feature.icon className="size-5 text-[#4F46E5]" strokeWidth={1.5} />
              </span>
              <h3 className="text-[17px] font-semibold text-[#0F172A]">{feature.title}</h3>
              <p className="mt-2.5 text-[14px] leading-relaxed text-[#64748B]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
