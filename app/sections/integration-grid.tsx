import {
  siAutocad,
  siAutodeskrevit,
  siQuickbooks,
  siHubspot,
  siBentley,
  siSketchup,
  siTrimble,
  siArcgis,
  siBim,
  type SimpleIcon,
} from "simple-icons";

const SLACK_PATH =
  "M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z";

const SALESFORCE_PATH =
  "M10.005 5.416c.75-.796 1.845-1.306 3.046-1.306 1.56 0 2.954.9 3.689 2.205.63-.3 1.35-.45 2.101-.45 2.849 0 5.159 2.34 5.159 5.22s-2.311 5.22-5.176 5.22c-.345 0-.689-.044-1.02-.104-.645 1.17-1.875 1.95-3.3 1.95-.6 0-1.155-.15-1.65-.375-.659 1.546-2.189 2.624-3.975 2.624-1.859 0-3.45-1.169-4.05-2.819-.27.061-.54.075-.825.075-2.204 0-4.005-1.8-4.005-4.05 0-1.5.811-2.805 2.01-3.51-.255-.57-.39-1.2-.39-1.846 0-2.58 2.1-4.649 4.65-4.649 1.53 0 2.85.704 3.72 1.8";

const GOOGLE_PATHS = [
  { d: "M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z", fill: "#EA4335" },
  { d: "M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z", fill: "#4285F4" },
  { d: "M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z", fill: "#FBBC05" },
  { d: "M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z", fill: "#34A853" },
];

interface Integration {
  name: string;
  color: string;
  siIcon?: SimpleIcon;
  path?: string;
  multiPath?: Array<{ d: string; fill: string }>;
}

const integrations: Integration[] = [
  { name: "Revit", color: "#186BFF", siIcon: siAutodeskrevit },
  { name: "AutoCAD", color: "#E51050", siIcon: siAutocad },
  { name: "Bentley", color: "#3F9DBF", siIcon: siBentley },
  { name: "SketchUp", color: "#0057F7", siIcon: siSketchup },
  { name: "Trimble", color: "#27337B", siIcon: siTrimble },
  { name: "ArcGIS", color: "#2C7AC3", siIcon: siArcgis },
  { name: "BIM", color: "#0F62FE", siIcon: siBim },
  { name: "HubSpot", color: "#FF7A59", siIcon: siHubspot },
  { name: "Google", color: "#4285F4", multiPath: GOOGLE_PATHS },
  { name: "QuickBooks", color: "#2CA01C", siIcon: siQuickbooks },
  { name: "Slack", color: "#4A154B", path: SLACK_PATH },
  { name: "Salesforce", color: "#00A1E0", path: SALESFORCE_PATH },
];

function IntegrationTile({ integration }: { integration: Integration }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-[12px] border border-[#E2E8F0] bg-white px-6 py-4">
      {integration.multiPath ? (
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
      ) : (
        <svg viewBox="0 0 24 24" role="img" className="size-6 shrink-0">
          <path fill={integration.color} d={integration.path} />
        </svg>
      )}
      <span className="text-[14px] font-medium whitespace-nowrap text-[#0F172A]">
        {integration.name}
      </span>
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
