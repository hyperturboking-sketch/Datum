"use client";

import { useRouter } from "next/navigation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/lib/auth";
import { getInitials } from "@/lib/formatters";
import { cn } from "@/lib/utils";

interface HeaderProps {
  collapsed: boolean;
}

export function Header({ collapsed }: HeaderProps) {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const unreadNotifications = 0;

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 flex h-16 items-center justify-between border-b border-[rgba(255,255,255,0.12)] bg-[#0A0A0A]/60 px-6 backdrop-blur-md transition-[left] duration-200 lg:px-8",
        collapsed ? "lg:left-14" : "lg:left-[200px]"
      )}
    >
      <div className="flex items-center">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="flex size-7 items-center justify-center rounded-[6px] text-[#737373] transition-colors hover:bg-[#1A1A1A] hover:text-[#E5E5E5]"
        >
          <ChevronLeftIcon style={{ fontSize: 18 }} />
        </button>
        <h2 className="ml-2 text-[18px] font-medium text-[#E5E5E5]">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <SearchIcon
            style={{ fontSize: 16 }}
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#737373]"
          />
          <input
            type="text"
            placeholder="Search..."
            className="h-9 w-64 rounded-[6px] bg-[#1A1A1A] pr-10 pl-9 text-[13px] text-[#E5E5E5] placeholder:text-[#525252] focus:outline-none focus:ring-1 focus:ring-[#404040]"
          />
          <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-[11px] text-[#525252]">
            ⌘K
          </span>
        </div>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                aria-label="Notifications"
                className="relative flex size-7 items-center justify-center rounded-[6px] text-[#737373] transition-colors hover:bg-[#1A1A1A] hover:text-[#E5E5E5]"
              >
                <NotificationsNoneIcon style={{ fontSize: 18 }} />
                {unreadNotifications > 0 && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-[#A3A3A3]" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>Notifications</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {isLoading ? (
          <Skeleton className="size-7 rounded-full" />
        ) : user ? (
          <Avatar className="size-7">
            {user.avatar_url ? <AvatarImage src={user.avatar_url} alt={user.name} /> : null}
            <AvatarFallback className="bg-[#1A1A1A] text-[11px] text-[#A3A3A3]">
              {getInitials(user.name)}
            </AvatarFallback>
          </Avatar>
        ) : null}
      </div>
    </header>
  );
}
