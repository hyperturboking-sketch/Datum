import {
  siBentley,
  siTrimble,
  siArcgis,
  siBim,
  type SimpleIcon,
} from "simple-icons";
import Image from "next/image";

const GOOGLE_PATHS = [
  { d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z", fill: "#EA4335" },
  { d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z", fill: "#4285F4" },
  { d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z", fill: "#FBBC05" },
  { d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z", fill: "#34A853" },
];

interface Integration {
  name: string;
  color: string;
  img?: string;
  siIcon?: SimpleIcon;
  multiPath?: Array<{ d: string; fill: string }>;
}

const integrations: Integration[] = [
  { name: "Revit", color: "#186BFF", img: "/logos/revit.svg" },
  { name: "AutoCAD", color: "#E51050", img: "/logos/autocad.svg" },
  { name: "Bentley", color: "#3F9DBF", siIcon: siBentley },
  { name: "SketchUp", color: "#0057F7", img: "/logos/sketchup.svg" },
  { name: "Trimble", color: "#27337B", siIcon: siTrimble },
  { name: "ArcGIS", color: "#2C7AC3", siIcon: siArcgis },
  { name: "BIM", color: "#0F62FE", siIcon: siBim },
  { name: "HubSpot", color: "#FF7A59", img: "/logos/hubspot.svg" },
  { name: "Google", color: "#4285F4", multiPath: GOOGLE_PATHS },
  { name: "QuickBooks", color: "#2CA01C", img: "/logos/quickbooks.svg" },
  { name: "Slack", color: "#4A154B", img: "/logos/slack.svg" },
  { name: "Salesforce", color: "#00A1E0", img: "/logos/salesforce.svg" },
];

function IntegrationTile({ integration }: { integration: Integration }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-[12px] border border-[#E2E8F0] bg-white px-6 py-4">
      {integration.img ? (
        <Image
          src={integration.img}
          alt={integration.name}
          width={0}
          height={0}
          sizes="100vw"
          className="h-6 w-auto shrink-0"
        />
      ) : integration.multiPath ? (
        <svg viewBox="0 0 48 48" role="img" aria-label={integration.name} className="size-6 shrink-0">
          {integration.multiPath.map((p, i) => (
            <path key={i} fill={p.fill} d={p.d} />
          ))}
        </svg>
      ) : integration.siIcon ? (
        <svg
          viewBox="0 0 24 24"
          role="img"
          aria-label={integration.siIcon.title}
          className="size-6 shrink-0"
        >
          <path fill={integration.color} d={integration.siIcon.path} />
        </svg>
      ) : null}
      {integration.img ? (
        <span className="sr-only">{integration.name}</span>
      ) : (
        <span className="text-[14px] font-medium whitespace-nowrap text-[#0F172A]">
          {integration.name}
        </span>
      )}
    </div>
  );
}

export default function IntegrationGrid() {
  const track = [...integrations, ...integrations];
  return (
    <section
      id="integrations"
      aria-label="Integrations"
      className="border-y border-[#E2E8F0] bg-[#F8FAFC]"
    >
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-4 text-[13px] font-medium uppercase tracking-[0.18em] text-[#4F46E5]">
            Integrations
          </p>
          <h2 className="font-serif text-[36px] font-medium leading-[1.1] tracking-[-0.02em] text-[#0F172A] sm:text-[44px]">
            Plays well with your entire toolchain
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-[#64748B]">
            Import from the design tools you already use. Export to the systems
            your clients rely on.
          </p>
        </div>

        <div className="relative mt-16 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#F8FAFC] to-transparent" aria-hidden="true" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#F8FAFC] to-transparent" aria-hidden="true" />
          <div className="flex w-max animate-scroll gap-4">
            {track.map((integration, i) => (
              <IntegrationTile key={`${integration.name}-${i}`} integration={integration} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
