import type { Metadata } from "next";
import Navbar from "./sections/navbar";
import Hero from "./sections/hero";
import TrustedBy from "./sections/trusted-by";
import HowItWorks from "./sections/how-it-works";
import ProductShowcase from "./sections/product-showcase";
import FeatureSection from "./sections/feature-section";
import CaseStudies from "./sections/case-studies";
import Pricing from "./sections/pricing";
import Footer from "./sections/footer";

export const metadata: Metadata = {
  title: "Datum — The Operating System for Structural Engineering",
  description:
    "Enterprise-grade AI platform that transforms IFC models into actionable intelligence. Quantity takeoffs, code compliance, bid automation, and RFI generation — all in one pass.",
};

const architectureFeatures = [
  {
    title: "IFC Model Parsing",
    description:
      "Full IFC4 and IFC2x3 support with automatic geometry extraction, material mapping, and structural member classification.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Multi-Model Reconciliation",
    description:
      "Compare structural models across disciplines. Detect clashes, inconsistencies, and version drift automatically.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Structural Classification",
    description:
      "Automatic identification of beams, columns, slabs, walls, and connections using AI-enhanced IFC taxonomy.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

const complianceFeatures = [
  {
    title: "Automated Code Checks",
    description:
      "Run design verification against Eurocodes, ACI 318, AISC 360, and BS EN 1992 in seconds, not weeks.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Regulatory Updates",
    description:
      "Code databases updated automatically when standards change. Never miss a regulation revision again.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M21 12a9 9 0 11-6.219-8.56" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M21 3v6h-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Compliance Reporting",
    description:
      "Generate audit-ready compliance reports with full traceability to code clauses and design assumptions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const bidFeatures = [
  {
    title: "Quantity-Driven Bids",
    description:
      "Automatically generate bid quantities from structural models. No manual measurement, no transcription errors.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Cost Estimation",
    description:
      "Link model quantities to regional cost databases. Real-time pricing as your design evolves.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Tender Documents",
    description:
      "Export bid packages in client-ready formats. Bill of quantities, schedule of rates, and preliminary estimates included.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M22 6l-10 7L2 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const rfiFeatures = [
  {
    title: "AI-Generated Responses",
    description:
      "Structural RFIs answered automatically with references to model data, code clauses, and design intent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Contextual Intelligence",
    description:
      "Every response references the specific IFC element, design assumption, and applicable code provision.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 16v-4M12 8h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Audit Trail",
    description:
      "Full response history with timestamps, reviewer approvals, and change tracking for regulatory compliance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
        <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-[#09090B]">
      <Navbar />
      <main>
        <Hero />
        <TrustedBy />
        <HowItWorks />
        <ProductShowcase />
        <div id="features">
          <FeatureSection
            eyebrow="Architecture Intelligence"
            title="Understand every structural element"
            description="Datum's IFC parser extracts geometry, materials, and structural properties from your models with sub-millimeter accuracy."
            features={architectureFeatures}
          />
          <FeatureSection
            eyebrow="Code Compliance"
            title="Verify design against active building codes"
            description="Run thousands of compliance checks in seconds. Datum checks structural adequacy, serviceability, and durability against the codes you specify."
            features={complianceFeatures}
            reversed
          />
          <FeatureSection
            eyebrow="Bid Automation"
            title="From model to tender in days, not weeks"
            description="Automatically extract quantities, link to cost databases, and generate client-ready bid packages."
            features={bidFeatures}
          />
          <FeatureSection
            eyebrow="RFI Generation"
            title="Instant, sourced responses to field questions"
            description="AI-generated RFI responses that reference model data, code clauses, and design assumptions — with full audit trail."
            features={rfiFeatures}
            reversed
          />
        </div>
        <CaseStudies />
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
