import { Calculator, ShieldCheck, MessageSquare, Leaf, FileText } from "lucide-react";

const inputs = [
  { letter: "R", name: "Revit", color: "#0696D7" },
  { letter: "T", name: "Tekla", color: "#4DB6AC" },
  { letter: "A", name: "AutoCAD", color: "#E51050" },
];

const agents = [
  {
    icon: Calculator,
    title: "Quantity Takeoff",
    description: "Accurate quantities from IFC geometry in seconds.",
    color: "#4F46E5",
  },
  {
    icon: ShieldCheck,
    title: "Code Compliance",
    description: "Auto-check design against active building codes.",
    color: "#22C55E",
  },
  {
    icon: MessageSquare,
    title: "RFI Answers",
    description: "Instant, sourced responses to questions.",
    color: "#F59E0B",
  },
  {
    icon: Leaf,
    title: "ESG Metrics",
    description: "Carbon and material reporting built in.",
    color: "#22C55E",
  },
];

const outputs = [
  { label: "Bills of Quantities" },
  { label: "Compliance Reports" },
  { label: "RFI Responses" },
];

export default function SystemArchitecture() {
  return (
    <section
      id="architecture"
      aria-label="System architecture"
      className="border-y border-[#E2E8F0] bg-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#4F46E5]">
            System Architecture
          </p>
          <h2 className="font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0F172A] sm:text-[44px]">
            From IFC to insight, in one pass
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-[#64748B]">
            Datum ingests structural models, runs four specialist agents, and
            delivers decision-ready outputs — without you leaving your existing
            toolchain.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="grid grid-cols-3 gap-3">
            {inputs.map((input) => (
              <div
                key={input.name}
                className="flex items-center justify-center gap-2.5 rounded-[12px] border border-[#E2E8F0] bg-white px-4 py-4"
              >
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-[8px] text-[13px] font-semibold text-white"
                  style={{ backgroundColor: input.color }}
                >
                  {input.letter}
                </span>
                <span className="hidden text-[14px] font-medium text-[#0F172A] sm:block">
                  {input.name}
                </span>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-2">
            <svg width="2" height="32" aria-hidden="true">
              <line x1="1" y1="0" x2="1" y2="32" stroke="#CBD5E1" strokeWidth="1" />
            </svg>
          </div>

          <div className="rounded-[12px] border-2 border-[#4F46E5] bg-white px-6 py-6">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="font-serif text-[22px] font-medium tracking-tight text-[#0F172A]">
                Datum
              </p>
              <p className="text-[13px] text-[#64748B]">
                IFC Parser · Model Reconcile · AI Agents
              </p>
            </div>
          </div>

          <div className="flex justify-center py-2">
            <svg width="2" height="32" aria-hidden="true">
              <line x1="1" y1="0" x2="1" y2="32" stroke="#CBD5E1" strokeWidth="1" />
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {agents.map((agent) => (
              <div
                key={agent.title}
                className="rounded-[12px] border border-[#E2E8F0] bg-white p-4 text-center"
              >
                <span
                  className="mx-auto mb-3 flex size-9 items-center justify-center rounded-[8px]"
                  style={{ backgroundColor: `${agent.color}1A` }}
                >
                  <agent.icon className="size-4.5" style={{ color: agent.color }} strokeWidth={1.5} />
                </span>
                <p className="text-[14px] font-semibold text-[#0F172A]">{agent.title}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#64748B]">
                  {agent.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex justify-center py-2">
            <svg width="2" height="32" aria-hidden="true">
              <line x1="1" y1="0" x2="1" y2="32" stroke="#CBD5E1" strokeWidth="1" />
            </svg>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {outputs.map((output) => (
              <div
                key={output.label}
                className="flex items-center justify-center gap-2.5 rounded-[12px] border border-[#E2E8F0] bg-white px-4 py-4"
              >
                <FileText className="size-4.5 shrink-0 text-[#4F46E5]" strokeWidth={1.5} />
                <span className="text-[14px] font-medium text-[#0F172A]">{output.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
