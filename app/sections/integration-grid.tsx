import "devicons/css";
import {
  siAutocad,
  siAutodeskrevit,
  siQuickbooks,
  type SimpleIcon,
} from "simple-icons";

interface Integration {
  name: string;
  color: string;
  devicon?: string;
  siIcon?: SimpleIcon;
  letter?: string;
}

const integrations: Integration[] = [
  { name: "Revit", color: "#186BFF", siIcon: siAutodeskrevit },
  { name: "Tekla", color: "#4DB6AC", letter: "T" },
  { name: "AutoCAD", color: "#E51050", siIcon: siAutocad },
  { name: "Planswift", color: "#F36C21", letter: "P" },
  { name: "Bluebeam", color: "#00A4E4", letter: "B" },
  { name: "Slack", color: "#4A154B", devicon: "devicons-slack" },
  { name: "Salesforce", color: "#00A1E0", devicon: "devicons-salesforce" },
  { name: "HubSpot", color: "#FF7A59", devicon: "devicons-hubspot" },
  { name: "Google", color: "#4285F4", devicon: "devicons-google" },
  { name: "QuickBooks", color: "#2CA01C", siIcon: siQuickbooks },
];

function IntegrationTile({ integration }: { integration: Integration }) {
  return (
    <div className="flex shrink-0 items-center gap-3 rounded-[12px] border border-[#E2E8F0] bg-white px-6 py-4">
      {integration.siIcon ? (
        <svg
          viewBox="0 0 24 24"
          role="img"
          aria-label={integration.siIcon.title}
          className="size-6 shrink-0"
        >
          <path fill={integration.color} d={integration.siIcon.path} />
        </svg>
      ) : integration.devicon ? (
        <span
          className={`devicons text-[22px] ${integration.devicon}`}
          style={{ color: integration.color }}
          aria-hidden="true"
        />
      ) : (
        <span
          className="flex size-6 shrink-0 items-center justify-center rounded-[8px] text-[12px] font-semibold text-white"
          style={{ backgroundColor: integration.color }}
        >
          {integration.letter}
        </span>
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
