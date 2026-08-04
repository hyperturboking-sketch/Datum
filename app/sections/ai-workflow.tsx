"use client";

import { useEffect, useRef, useState } from "react";

const workflowSteps = [
  {
    id: "upload",
    label: "Upload IFC Model",
    description: "Drag and drop your Revit, IFC, or Tekla model",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "core",
    label: "Datum Intelligence Core",
    description: "IFC parsing, model reconciliation, structural classification",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const agents = [
  { name: "Quantity Takeoff", color: "#6366F1" },
  { name: "Code Compliance", color: "#22C55E" },
  { name: "Bid Estimate", color: "#F59E0B" },
  { name: "RFI Generation", color: "#8B5CF6" },
  { name: "ESG Report", color: "#06B6D4" },
];

const outputs = [
  "Bill of Quantities",
  "Compliance Report",
  "Bid Package",
  "RFI Responses",
  "Sustainability Report",
];

export default function AiWorkflow() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(-1);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          // Stagger step activation
          workflowSteps.forEach((_, i) => {
            setTimeout(() => setActiveStep(i), 800 + i * 600);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative bg-[#FFFFFF] py-28 lg:py-40"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p
            className={`mb-4 text-[11px] font-medium uppercase tracking-[0.25em] text-[#6366F1]/60 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          >
            How It Works
          </p>
          <h2
            className={`text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.1] tracking-[-0.02em] text-[#111827] transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ fontFamily: "var(--font-heading)" }}
          >
            One upload.
            <br />
            Every deliverable.
          </h2>
        </div>

        {/* Workflow Visualization */}
        <div
          className={`mx-auto mt-20 max-w-5xl transition-all duration-1000 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="relative">
            {/* Connection Lines */}
            <svg
              className="absolute left-0 top-0 w-full h-full pointer-events-none"
              viewBox="0 0 1000 400"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* Upload → Core */}
              <path
                d="M200,100 L400,100"
                stroke={activeStep >= 0 ? "#6366F1" : "#E5E7EB"}
                strokeWidth="1"
                strokeDasharray="4,4"
                className="transition-all duration-700"
              />
              {/* Core → Agents */}
              {agents.map((_, i) => (
                <path
                  key={i}
                  d={`M450,100 Q600,100 750,${60 + i * 70}`}
                  stroke={activeStep >= 1 ? "#6366F1" : "#E5E7EB"}
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  className="transition-all duration-700"
                  style={{ transitionDelay: `${i * 100}ms` }}
                />
              ))}
              {/* Agents → Outputs */}
              {agents.map((_, i) => (
                <path
                  key={`out-${i}`}
                  d={`M800,${60 + i * 70} L950,${60 + i * 70}`}
                  stroke={activeStep >= 1 ? "#6366F1" : "#E5E7EB"}
                  strokeWidth="1"
                  strokeDasharray="4,4"
                  className="transition-all duration-700"
                  style={{ transitionDelay: `${200 + i * 100}ms` }}
                />
              ))}
            </svg>

            {/* Step 1: Upload */}
            <div className="flex items-start gap-16">
              <div
                className={`flex-shrink-0 w-[180px] transition-all duration-700 ${activeStep >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white text-[#6366F1] shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                  {workflowSteps[0].icon}
                </div>
                <h4 className="mt-3 text-[14px] font-medium text-[#111827]">
                  {workflowSteps[0].label}
                </h4>
                <p className="mt-1 text-[12px] text-[#9CA3AF] font-light leading-relaxed">
                  {workflowSteps[0].description}
                </p>
              </div>

              {/* Step 2: Core */}
              <div
                className={`flex-shrink-0 w-[200px] transition-all duration-700 delay-300 ${activeStep >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-[#6366F1]/20 bg-[#6366F1]/5 text-[#6366F1]">
                  {workflowSteps[1].icon}
                </div>
                <h4 className="mt-3 text-[14px] font-medium text-[#111827]">
                  {workflowSteps[1].label}
                </h4>
                <p className="mt-1 text-[12px] text-[#9CA3AF] font-light leading-relaxed">
                  {workflowSteps[1].description}
                </p>
              </div>

              {/* Agents */}
              <div className="flex-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF] mb-4">
                  AI Agents
                </p>
                <div className="space-y-3">
                  {agents.map((agent, i) => (
                    <div
                      key={agent.name}
                      className={`flex items-center gap-3 transition-all duration-700 ${activeStep >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                      style={{ transitionDelay: `${400 + i * 120}ms` }}
                    >
                      <div
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: agent.color }}
                      />
                      <span className="text-[13px] text-[#374151] font-light">
                        {agent.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outputs */}
              <div className="flex-shrink-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#9CA3AF] mb-4">
                  Outputs
                </p>
                <div className="space-y-2">
                  {outputs.map((output, i) => (
                    <div
                      key={output}
                      className={`transition-all duration-700 ${activeStep >= 1 ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                      style={{ transitionDelay: `${600 + i * 100}ms` }}
                    >
                      <span className="rounded-lg bg-[#F9FAFB] border border-[#F3F4F6] px-3 py-1.5 text-[11px] text-[#6B7280] font-light">
                        {output}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
