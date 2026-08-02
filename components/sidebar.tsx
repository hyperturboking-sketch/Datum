"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import MenuIcon from "@mui/icons-material/Menu";
import {
  DashboardIcon,
  ProjectsIcon,
  BidsIcon,
  ComplianceIcon,
  RfisIcon,
  SustainabilityIcon,
  ReportsIcon,
  SettingsIcon,
} from "@/components/icons/nav-icons";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/lib/auth";
import { getInitials } from "@/lib/formatters";

const navItems = [
  { label: "Dashboard", href: "/", icon: DashboardIcon },
  { label: "Projects", href: "/projects", icon: ProjectsIcon },
  { label: "Bids", href: "/bids", icon: BidsIcon },
  { label: "Compliance", href: "/compliance", icon: ComplianceIcon },
  { label: "RFIs", href: "/rfis", icon: RfisIcon },
  { label: "Sustainability", href: "/sustainability", icon: SustainabilityIcon },
  { label: "Reports", href: "/reports", icon: ReportsIcon },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
];

function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <g fill="#FFFFFF">
        <path d="M118 150C118 132 132 118 150 118L150 118C168 118 182 132 182 150L182 362C182 380 168 394 150 394C132 394 118 380 118 362Z" />
        <path d="M230 120C230 108 240 98 252 98L370 98C387 98 401 112 401 129L401 212C401 224 388 231 378 225L248 151C237 145 230 133 230 120Z" />
        <path d="M230 392C230 404 240 414 252 414L370 414C387 414 401 400 401 383L401 300C401 288 388 281 378 287L248 361C237 367 230 379 230 392Z" />
      </g>
    </svg>
  );
}

function Logo({ collapsed }: { collapsed: boolean }) {
  if (collapsed) {
    return (
      <div className="flex justify-center px-3 py-5">
        <LogoMark className="size-6 shrink-0 text-[#E5E5E5]" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2.5 px-6 py-5">
      <LogoMark className="size-6 shrink-0 text-[#E5E5E5]" />
      <span
        className="font-serif text-[25px] font-extralight leading-none tracking-tight text-[#E5E5E5]"
        style={{ fontStretch: "80%" }}
      >
        datum
      </span>
    </div>
  );
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, signOut } = useAuth();

  const handleSignOut = () => {
    signOut();
    router.push("/login");
  };

  return (
    <aside
      className={cn(
        "fixed inset-y-0 left-0 z-40 hidden h-screen flex-col border-r border-[rgba(255,255,255,0.12)] bg-[#18181b] transition-[width] duration-200 lg:flex",
        collapsed ? "w-14" : "w-[200px]"
      )}
    >
      <Logo collapsed={collapsed} />

      <nav
        className={cn("flex flex-1 flex-col gap-0.5", collapsed ? "items-center px-2" : "px-3")}
        aria-label="Primary"
      >
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-[6px] px-3 py-2 text-[14px] transition-colors",
                collapsed && "justify-center px-0",
                isActive
                  ? "bg-[#262626] text-[#E5E5E5]"
                  : "text-[#A6A6A6] hover:bg-[#262626] hover:text-[#E5E5E5]"
              )}
            >
              <Icon fontSize={16} className="shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-[rgba(255,255,255,0.12)] pt-3 pb-4">
        <div className={cn("flex", collapsed ? "justify-center px-2" : "px-3")}>
          <button
            type="button"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="flex size-8 items-center justify-center rounded-[6px] text-[#A6A6A6] transition-colors hover:bg-[#262626] hover:text-[#E5E5E5]"
          >
            {collapsed ? (
              <MenuIcon style={{ fontSize: 18 }} />
            ) : (
              <MenuOpenIcon style={{ fontSize: 18 }} />
            )}
          </button>
        </div>

        {isLoading ? (
          <div className="mt-3 flex items-center gap-2.5 px-3">
            <Skeleton className="size-7 rounded-full" />
            {!collapsed && <Skeleton className="h-3.5 w-20" />}
          </div>
        ) : user ? (
          <div className="mt-1 flex flex-col gap-0.5">
            <div
              className={cn(
                "flex items-center gap-2.5 px-3 py-2",
                collapsed && "justify-center px-0"
              )}
            >
              <Avatar className="size-7">
                {user.avatar_url ? (
                  <AvatarImage src={user.avatar_url} alt={user.name} />
                ) : null}
                <AvatarFallback className="bg-[#1A1A1A] text-[11px] text-[#B3B3B3]">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <span className="truncate text-[14px] text-[#B3B3B3]">{user.name}</span>
              )}
            </div>
            {!collapsed && (
              <div className="flex flex-col gap-0.5">
                <Link
                  href="/settings/profile"
                  className="flex items-center gap-3 rounded-[6px] px-3 py-1.5 text-[13px] text-[#A6A6A6] transition-colors hover:bg-[#262626] hover:text-[#E5E5E5]"
                >
                  <PersonIcon style={{ fontSize: 15 }} />
                  Profile
                </Link>
                <Link
                  href="/settings/org"
                  className="flex items-center gap-3 rounded-[6px] px-3 py-1.5 text-[13px] text-[#A6A6A6] transition-colors hover:bg-[#262626] hover:text-[#E5E5E5]"
                >
                  <BusinessIcon style={{ fontSize: 15 }} />
                  Organization
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-3 rounded-[6px] px-3 py-1.5 text-left text-[13px] text-[#A6A6A6] transition-colors hover:bg-[#262626] hover:text-[#E5E5E5]"
                >
                  <LogoutIcon style={{ fontSize: 15 }} />
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </aside>
  );
}
