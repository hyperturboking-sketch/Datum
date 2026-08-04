"use client";

import Image from "next/image";

const integrations = [
  { name: "Revit", img: "/logos/revit.svg", wordmark: true },
  { name: "AutoCAD", img: "/logos/autocad.svg", wordmark: true },
  { name: "SketchUp", img: "/logos/sketchup.svg", wordmark: true },
  { name: "HubSpot", img: "/logos/hubspot.svg", wordmark: true },
  { name: "QuickBooks", img: "/logos/quickbooks.svg", wordmark: true },
  { name: "Slack", img: "/logos/slack.svg", wordmark: false },
  { name: "Salesforce", img: "/logos/salesforce.svg", wordmark: false },
  { name: "Google", img: "/logos/google.svg", wordmark: false },
  { name: "Bentley", img: "/logos/bentley.svg", wordmark: false },
  { name: "Trimble", img: "/logos/trimble.svg", wordmark: false },
  { name: "ArcGIS", img: "/logos/arcgis.svg", wordmark: false },
  { name: "BIM", img: "/logos/bim.svg", wordmark: false },
];

function IntegrationItem({ integration }: { integration: typeof integrations[0] }) {
  return (
    <div className="flex items-center gap-2.5 shrink-0 px-6">
      <Image
        src={integration.img}
        alt={integration.name}
        width={0}
        height={0}
        sizes="100vw"
        className="h-5 w-auto"
      />
      {!integration.wordmark && (
        <span className="text-[13px] font-medium text-[#9CA3AF] tracking-wide">
          {integration.name}
        </span>
      )}
    </div>
  );
}

export default function WorksWith() {
  return (
    <section className="relative bg-[#FAFAFA] border-y border-[#F3F4F6] py-14 lg:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.25em] text-[#9CA3AF] mb-10">
          Works with
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

        {/* Scrolling Track */}
        <div className="flex w-max animate-scroll hover:animation-play-state-paused">
          {/* Duplicate set for seamless loop */}
          {[...integrations, ...integrations].map((integration, i) => (
            <IntegrationItem
              key={`${integration.name}-${i}`}
              integration={integration}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
