import Link from "next/link";

interface ActionCardProps {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function ActionCard({
  href,
  icon,
  title,
  description,
}: ActionCardProps) {
  return (
    <Link
      href={href}
      className="group block rounded-lg border border-[rgba(255,255,255,0.12)] bg-[#18181b] p-4 transition-colors hover:bg-[#262626]"
    >
      <div className="mb-3 text-[#525252] transition-colors group-hover:text-[#A3A3A3]">
        {icon}
      </div>
      <p className="text-[14px] font-medium text-[#E5E5E5]">{title}</p>
      <p className="font-description mt-1 text-[13px] leading-normal text-[#737373]">{description}</p>
    </Link>
  );
}
