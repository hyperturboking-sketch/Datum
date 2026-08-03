import type { Metadata } from "next";
import Navbar from "./sections/navbar";
import StatsBar from "./sections/stats-bar";
import SystemArchitecture from "./sections/system-architecture";
import ProblemSolution from "./sections/problem-solution";
import WorkflowPipeline from "./sections/workflow-pipeline";
import FeatureGrid from "./sections/feature-grid";
import IntegrationGrid from "./sections/integration-grid";
import Pricing from "./sections/pricing";
import DatumStripe from "./sections/datum-stripe";
import Footer from "./sections/footer";
import BridgeHero3D from "@/components/bridge-hero-3d";

export const metadata: Metadata = {
  title: "Datum — AI for AEC Engineering",
  description:
    "Datum is the AI platform that reads structural models, calculates quantities, checks code compliance, and answers RFIs — all from your IFC files.",
};

const heroImages = [
  "/images/bridge_layer_1.jpg",
  "/images/bridge_layer_2.jpg",
  "/images/bridge_layer_3.jpg",
  "/images/bridge_layer_4.jpg",
];

export default function LandingPage() {
  return (
    <div id="top" className="min-h-screen bg-white">
      <Navbar />
      <main>
        <BridgeHero3D images={heroImages} />
        <StatsBar />
        <SystemArchitecture />
        <ProblemSolution />
        <WorkflowPipeline />
        <FeatureGrid />
        <IntegrationGrid />
        <Pricing />
        <DatumStripe />
      </main>
      <Footer />
    </div>
  );
}
