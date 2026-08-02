interface IconProps {
  className?: string;
  fontSize?: number;
}

function BaseIcon({ className, fontSize, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={fontSize ?? 16}
      height={fontSize ?? 16}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function DashboardIcon({ className, fontSize }: IconProps) {
  return (
    <BaseIcon className={className} fontSize={fontSize}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
    </BaseIcon>
  );
}

export function ProjectsIcon({ className, fontSize }: IconProps) {
  return (
    <BaseIcon className={className} fontSize={fontSize}>
      <path d="M4 7.5A1.5 1.5 0 0 1 5.5 6h4l1.5 2H18.5A1.5 1.5 0 0 1 20 9.5v8A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5z" />
    </BaseIcon>
  );
}

export function BidsIcon({ className, fontSize }: IconProps) {
  return (
    <BaseIcon className={className} fontSize={fontSize}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
      <path d="M9.5 4.5v15M15.5 4.5v15" />
      <path d="M3.5 10h17" strokeWidth={2.25} />
      <path d="M3.5 15h17" />
    </BaseIcon>
  );
}

export function ComplianceIcon({ className, fontSize }: IconProps) {
  return (
    <BaseIcon className={className} fontSize={fontSize}>
      <path d="M12 3.5l6 2.5v5.2c0 3.9-2.5 6.9-6 8.3-3.5-1.4-6-4.4-6-8.3V6z" />
      <path d="M9 12.2l2 2 4-4.4" />
    </BaseIcon>
  );
}

export function RfisIcon({ className, fontSize }: IconProps) {
  return (
    <BaseIcon className={className} fontSize={fontSize}>
      <path d="M20 6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h1v3.5L11 16h7a2 2 0 0 0 2-2z" />
    </BaseIcon>
  );
}

export function SustainabilityIcon({ className, fontSize }: IconProps) {
  return (
    <BaseIcon className={className} fontSize={fontSize}>
      <path d="M5.5 18.5C5.5 9.5 10.5 5.5 18.5 5.5c0 8-4 13-13 13z" />
      <path d="M5.5 18.5C8 13.5 12 9.5 17 7.5" />
    </BaseIcon>
  );
}

export function ReportsIcon({ className, fontSize }: IconProps) {
  return (
    <BaseIcon className={className} fontSize={fontSize}>
      <path d="M3.5 20h17" />
      <path d="M7.5 20v-6M12 20v-10M16.5 20v-4" />
    </BaseIcon>
  );
}

const SETTINGS_TEETH = [0, 45, 90, 135, 180, 225, 270, 315];

export function SettingsIcon({ className, fontSize }: IconProps) {
  const inner = 5.2;
  const outer = 7.2;
  return (
    <BaseIcon className={className} fontSize={fontSize}>
      <circle cx="12" cy="12" r="3.2" />
      {SETTINGS_TEETH.map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const cos = Math.cos(rad);
        const sin = Math.sin(rad);
        return (
          <path
            key={deg}
            d={`M${(12 + cos * inner).toFixed(2)} ${(12 + sin * inner).toFixed(2)}L${(
              12 + cos * outer
            ).toFixed(2)} ${(12 + sin * outer).toFixed(2)}`}
          />
        );
      })}
    </BaseIcon>
  );
}
