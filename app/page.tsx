import type { Metadata } from "next";
import Navbar from "./sections/navbar";
import Hero from "./sections/hero";
import WorksWith from "./sections/works-with";
import AiWorkflow from "./sections/ai-workflow";
import ProductSection from "./sections/product-section";
import CaseStudies from "./sections/case-studies";
import EnterpriseSecurity from "./sections/enterprise-security";
import Pricing from "./sections/pricing";
import FinalCta from "./sections/final-cta";
import Footer from "./sections/footer";

export const metadata: Metadata = {
  title: "Datum — The Operating System for Structural Engineering",
  description:
    "Enterprise-grade AI platform that transforms IFC models into actionable intelligence. Quantity takeoffs, code compliance, bid automation, and RFI generation — all in one pass.",
};

function QuantityTakeoffVisual() {
  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[13px] text-[#374151] font-light">
          Quantity Takeoff — Phase 3
        </span>
        <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/8 px-2.5 py-1 rounded-full font-medium">
          Complete
        </span>
      </div>
      <div className="space-y-3">
        {[
          { item: "Structural Steel (A992)", qty: "142.5 t", pct: 85 },
          { item: "Concrete (C40/50)", qty: "380 m³", pct: 72 },
          { item: "Rebar (B500B)", qty: "89.2 t", pct: 58 },
          { item: "Post-Tensioning Cables", qty: "24,600 m", pct: 42 },
          { item: "Formwork (Reusable)", qty: "1,240 m²", pct: 35 },
        ].map((row) => (
          <div key={row.item} className="flex items-center gap-4 text-[12px]">
            <span className="w-48 text-[#6B7280] font-light">{row.item}</span>
            <span className="w-20 text-right text-[#374151] font-light">
              {row.qty}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-[#F3F4F6] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#6366F1]/50"
                style={{ width: `${row.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComplianceVisual() {
  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[13px] text-[#374151] font-light">
          Compliance Report — EN 1992
        </span>
        <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/8 px-2.5 py-1 rounded-full font-medium">
          94% Pass
        </span>
      </div>
      <div className="space-y-2">
        {[
          { check: "Structural Adequacy (ULS)", status: "pass", count: 1247 },
          { check: "Serviceability (SLS)", status: "pass", count: 892 },
          { check: "Durability Requirements", status: "warn", count: 142 },
          { check: "Fire Resistance", status: "pass", count: 334 },
          { check: "Seismic Classification", status: "fail", count: 3 },
        ].map((row) => (
          <div
            key={row.check}
            className="flex items-center justify-between rounded-xl border border-[#F3F4F6] bg-[#FAFAFA] px-4 py-2.5"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-2 w-2 rounded-full ${
                  row.status === "pass"
                    ? "bg-[#22C55E]"
                    : row.status === "warn"
                    ? "bg-[#F59E0B]"
                    : "bg-[#EF4444]"
                }`}
              />
              <span className="text-[12px] text-[#374151] font-light">
                {row.check}
              </span>
            </div>
            <span className="text-[11px] text-[#9CA3AF] font-light">
              {row.count} checks
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BidVisual() {
  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[13px] text-[#374151] font-light">
          Bid Package — Tender Response
        </span>
        <span className="text-[10px] text-[#6366F1] bg-[#6366F1]/8 px-2.5 py-1 rounded-full font-medium">
          Draft Ready
        </span>
      </div>
      <div className="space-y-3">
        {[
          { item: "Preliminary Estimate", value: "£4,280,000", conf: "±12%" },
          { item: "Material Costs", value: "£2,140,000", conf: "±8%" },
          { item: "Labour & Plant", value: "£1,420,000", conf: "±15%" },
          { item: "Preliminaries", value: "£428,000", conf: "±10%" },
          { item: "Risk Allowance", value: "£292,000", conf: "—" },
        ].map((row) => (
          <div
            key={row.item}
            className="flex items-center justify-between rounded-xl border border-[#F3F4F6] bg-[#FAFAFA] px-4 py-3"
          >
            <span className="text-[12px] text-[#6B7280] font-light">
              {row.item}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-[13px] text-[#111827] font-medium">
                {row.value}
              </span>
              <span className="text-[10px] text-[#9CA3AF] font-light w-10 text-right">
                {row.conf}
              </span>
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between rounded-xl border-2 border-[#6366F1]/20 bg-[#6366F1]/[0.03] px-4 py-3">
          <span className="text-[13px] text-[#111827] font-medium">
            Total Bid
          </span>
          <span className="text-[15px] text-[#111827] font-medium">
            £4,280,000
          </span>
        </div>
      </div>
    </div>
  );
}

function RfiVisual() {
  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[13px] text-[#374151] font-light">
          RFI Response — Beam Connection
        </span>
        <span className="text-[10px] text-[#22C55E] bg-[#22C55E]/8 px-2.5 py-1 rounded-full font-medium">
          Resolved
        </span>
      </div>
      <div className="rounded-xl border border-[#F3F4F6] bg-[#FAFAFA] p-4 mb-4">
        <p className="text-[12px] text-[#9CA3AF] font-light mb-2">Question</p>
        <p className="text-[13px] text-[#374151] font-light leading-relaxed">
          &ldquo;Can the steel connection at Grid B-3/4 be modified to accommodate
          the revised loading from the updated mechanical services layout?&rdquo;
        </p>
      </div>
      <div className="rounded-xl border border-[#6366F1]/10 bg-[#6366F1]/[0.02] p-4">
        <p className="text-[12px] text-[#6366F1]/60 font-light mb-2">AI Response</p>
        <p className="text-[13px] text-[#374151] font-light leading-relaxed">
          Analysis of IFC element #4521 (W310x97 beam at Grid B-3/4) confirms
          the connection can accommodate +15kN additional dead load. Reference:
          EN 1993-1-8, Clause 4.5.2. Modified detail attached.
        </p>
        <div className="mt-3 flex gap-2">
          <span className="rounded-md bg-[#F3F4F6] px-2 py-1 text-[10px] text-[#6B7280]">
            IFC #4521
          </span>
          <span className="rounded-md bg-[#F3F4F6] px-2 py-1 text-[10px] text-[#6B7280]">
            EN 1993-1-8 §4.5.2
          </span>
          <span className="rounded-md bg-[#22C55E]/10 px-2 py-1 text-[10px] text-[#22C55E]">
            ✓ Verified
          </span>
        </div>
      </div>
    </div>
  );
}

function SustainabilityVisual() {
  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-center justify-between mb-5">
        <span className="text-[13px] text-[#374151] font-light">
          ESG Report — Carbon Assessment
        </span>
        <span className="text-[10px] text-[#06B6D4] bg-[#06B6D4]/8 px-2.5 py-1 rounded-full font-medium">
          A+ Rating
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: "Embodied Carbon", value: "342", unit: "kgCO₂e/m²" },
          { label: "Recycled Content", value: "67", unit: "%" },
          { label: "EPD Coverage", value: "89", unit: "%" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-[#F3F4F6] bg-[#FAFAFA] p-3 text-center"
          >
            <p className="text-[18px] font-normal text-[#111827]">
              {stat.value}
            </p>
            <p className="text-[10px] text-[#9CA3AF] font-light">{stat.unit}</p>
            <p className="text-[9px] text-[#6B7280] font-light mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {[
          { material: "Structural Steel", carbon: "1.46 kgCO₂e/kg", bar: 65 },
          { material: "Concrete (C40/50)", carbon: "0.12 kgCO₂e/kg", bar: 40 },
          { material: "Reinforcement", carbon: "0.84 kgCO₂e/kg", bar: 52 },
        ].map((row) => (
          <div key={row.material} className="flex items-center gap-3 text-[11px]">
            <span className="w-36 text-[#6B7280] font-light">{row.material}</span>
            <span className="w-24 text-right text-[#374151] font-light">
              {row.carbon}
            </span>
            <div className="flex-1 h-1.5 rounded-full bg-[#F3F4F6] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#06B6D4]/50"
                style={{ width: `${row.bar}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <WorksWith />
        <AiWorkflow />
        <div id="product">
          <ProductSection
            eyebrow="Quantity Intelligence"
            title="Every material, every element, counted"
            description="Datum's quantity takeoff agent reads your structural model and extracts precise quantities for every beam, column, slab, and connection — with material classifications and waste factors."
            features={[
              {
                title: "Automatic Material Classification",
                description: "Steel grades, concrete classes, and rebar types identified from IFC properties.",
              },
              {
                title: "Waste Factor Intelligence",
                description: "Industry-standard waste factors applied per material type and construction method.",
              },
              {
                title: "Multi-Format Export",
                description: "Export to Excel, CSV, or integrate directly with cost estimation software.",
              },
            ]}
            visual={<QuantityTakeoffVisual />}
          />
          <ProductSection
            eyebrow="Code Compliance"
            title="Verify design against active building codes"
            description="Run thousands of compliance checks in seconds. Datum checks structural adequacy, serviceability, and durability against Eurocodes, ACI 318, AISC 360, and BS EN 1992."
            features={[
              {
                title: "Multi-Code Support",
                description: "Eurocodes, ACI, AISC, BS EN, and more. Automatically updated when standards change.",
              },
              {
                title: "Clause-Level Traceability",
                description: "Every check traces back to the specific code clause and design assumption.",
              },
              {
                title: "Audit-Ready Reports",
                description: "Generate compliance reports formatted for regulatory submission.",
              },
            ]}
            visual={<ComplianceVisual />}
            reversed
          />
          <ProductSection
            eyebrow="Bid Automation"
            title="From model to tender in days, not weeks"
            description="Automatically extract quantities, link to regional cost databases, and generate client-ready bid packages with full traceability to model elements."
            features={[
              {
                title: "Quantity-Driven Pricing",
                description: "Bid quantities derived directly from structural model — no manual measurement.",
              },
              {
                title: "Regional Cost Databases",
                description: "Linked to industry cost data for accurate, location-specific pricing.",
              },
              {
                title: "Client-Ready Formats",
                description: "Export tender documents in formats your clients expect.",
              },
            ]}
            visual={<BidVisual />}
          />
          <ProductSection
            eyebrow="RFI Generation"
            title="Instant, sourced responses to field questions"
            description="AI-generated RFI responses that reference model data, code clauses, and design assumptions — with full audit trail and reviewer approval workflow."
            features={[
              {
                title: "Context-Aware Answers",
                description: "Every response references the specific IFC element, design assumption, and code provision.",
              },
              {
                title: "Full Audit Trail",
                description: "Timestamps, reviewer approvals, and change tracking for regulatory compliance.",
              },
              {
                title: "Team Collaboration",
                description: "Assign reviewers, track status, and manage RFI workflows in one place.",
              },
            ]}
            visual={<RfiVisual />}
            reversed
          />
          <ProductSection
            eyebrow="Sustainability"
            title="ESG metrics built into every model"
            description="Automatically calculate embodied carbon, recycled content, and EPD coverage from your structural model. Generate sustainability reports for LEED, BREEAM, and NABERS."
            features={[
              {
                title: "Embodied Carbon Calculation",
                description: "Automatic carbon footprint assessment per EN 15978 methodology.",
              },
              {
                title: "EPD Integration",
                description: "Environmental Product Declarations linked to material quantities.",
              },
              {
                title: "Rating System Support",
                description: "LEED, BREEAM, NABERS, and Green Star compliance reporting.",
              },
            ]}
            visual={<SustainabilityVisual />}
          />
        </div>
        <CaseStudies />
        <EnterpriseSecurity />
        <Pricing />
      </main>
      <FinalCta />
      <Footer />
    </div>
  );
}
