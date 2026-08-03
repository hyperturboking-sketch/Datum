import { Upload, Workflow, Calculator, FileText } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload IFC",
    description: "Drop in your structural models. No templates, no setup.",
  },
  {
    number: "02",
    icon: Workflow,
    title: "Reconcile & parse",
    description: "Datum merges geometry and layers into one clean model.",
  },
  {
    number: "03",
    icon: Calculator,
    title: "Generate outputs",
    description: "Quantities, compliance, and RFI answers are computed instantly.",
  },
  {
    number: "04",
    icon: FileText,
    title: "Review & export",
    description: "Deliverables are ready to share with any stakeholder.",
  },
];

export default function WorkflowPipeline() {
  return (
    <section
      id="workflow"
      aria-label="Workflow"
      className="border-y border-[#E2E8F0] bg-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#4F46E5]">
            The Workflow
          </p>
          <h2 className="font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0F172A] sm:text-[44px]">
            From model to deliverables in hours, not weeks
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-[#64748B]">
            A four-step pipeline that runs in the background while your team
            keeps designing.
          </p>
        </div>

        <div className="relative mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="absolute inset-x-10 top-6 hidden h-px bg-[#CBD5E1] lg:block" aria-hidden="true" />
          {steps.map((step) => (
            <div key={step.number} className="relative text-center lg:text-left">
              <div className="mb-5 flex justify-center lg:justify-start">
                <span className="relative z-10 flex size-12 items-center justify-center rounded-[12px] border border-[#E2E8F0] bg-white">
                  <step.icon className="size-5 text-[#4F46E5]" strokeWidth={1.5} />
                </span>
              </div>
              <p className="font-serif text-[14px] font-medium tracking-[0.14em] text-[#94A3B8] tabular-nums">
                {step.number}
              </p>
              <h3 className="mt-2 text-[17px] font-semibold text-[#0F172A]">{step.title}</h3>
              <p className="mt-2 text-[14px] leading-relaxed text-[#64748B]">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
