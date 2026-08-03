import { Check, Layers, Workflow, ShieldCheck, FileText } from "lucide-react";

const problems = [
  "Quantities live in model files nobody opens",
  "Compliance sits in code manuals, applied by hand",
  "RFIs bounce between email threads for weeks",
  "Sustainability data is scattered across spreadsheets",
];

const solutions = [
  {
    icon: Layers,
    title: "Reconcile",
    description:
      "Merge structural models and parse IFC geometry into one source of truth.",
  },
  {
    icon: Workflow,
    title: "Automate",
    description:
      "Run takeoffs, estimates, and checks across every model automatically.",
  },
  {
    icon: ShieldCheck,
    title: "Comply",
    description:
      "Check designs against active codes before they reach review.",
  },
  {
    icon: FileText,
    title: "Report",
    description:
      "Export quantities, compliance, and ESG reports in a few clicks.",
  },
];

export default function ProblemSolution() {
  return (
    <section
      aria-label="Problem and solution"
      className="bg-white"
    >
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#4F46E5]">
            The Problem
          </p>
          <h2 className="font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0F172A] sm:text-[40px]">
            AEC data lives in silos
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#64748B]">
            Structural engineering runs on disconnected tools, manual copying,
            and tribal knowledge. Every project pays the cost in rework, delays,
            and risk.
          </p>
          <ul className="mt-8 flex flex-col gap-3.5">
            {problems.map((problem) => (
              <li key={problem} className="flex items-start gap-3">
                <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-[#FEE2E2]">
                  <Check className="size-3 text-[#DC2626]" strokeWidth={2.5} />
                </span>
                <span className="text-[15px] text-[#0F172A]">{problem}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#4F46E5]">
            The Datum Way
          </p>
          <h2 className="font-serif text-[34px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0F172A] sm:text-[40px]">
            One platform, every decision
          </h2>
          <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-[#64748B]">
            Datum replaces the manual middle of your workflow with a single
            intelligence layer that everyone on the project can rely on.
          </p>
          <div className="mt-8 flex flex-col divide-y divide-[#E2E8F0] rounded-[12px] border border-[#E2E8F0]">
            {solutions.map((item) => (
              <div key={item.title} className="flex gap-4 p-5">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-[8px] bg-[#EEF2FF]">
                  <item.icon className="size-5 text-[#4F46E5]" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold text-[#0F172A]">{item.title}</p>
                  <p className="mt-1 text-[14px] leading-relaxed text-[#64748B]">
                    {item.description}
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
