"use client";

import { Building2, CreditCard, Key, User } from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "organization", label: "Organization", icon: Building2 },
  { id: "api-keys", label: "API Keys", icon: Key },
  { id: "billing", label: "Billing", icon: CreditCard },
] as const;

export type SettingsTab = (typeof TABS)[number]["id"];

export function SettingsTabs({
  activeTab,
  onTabChange,
}: {
  activeTab: SettingsTab;
  onTabChange: (tab: SettingsTab) => void;
}) {
  return (
    <nav className="flex w-[200px] shrink-0 flex-col gap-1">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2.5 border-l-2 py-2 pr-4 text-left text-[13px] transition-colors",
              isActive
                ? "border-[#818CF8] bg-[#1E293B] pl-3 text-[#F8FAFC]"
                : "rounded-r-md border-transparent pl-3 text-[#64748B] hover:bg-[#111827] hover:text-[#94A3B8]"
            )}
          >
            <Icon
              size={16}
              strokeWidth={1.5}
              className={isActive ? "text-[#818CF8]" : "text-[#64748B]"}
            />
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
