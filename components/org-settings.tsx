"use client";

import { useEffect, useState } from "react";
import { Loader2, UserPlus } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusBadge } from "@/components/status-badge";
import { formatDate, getInitials } from "@/lib/formatters";
import type { Organization, OrgMember, UserRole } from "@/lib/api";

const inputClass =
  "h-9 w-full rounded-md border border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569] focus:border-[#818CF8] focus:outline-none transition-colors disabled:text-[#64748B]";

const selectClass =
  "h-9 rounded-md border border-[#334155] bg-[#0D1117] px-2 text-[13px] text-[#F8FAFC] focus:border-[#818CF8] focus:outline-none";

const labelClass =
  "mb-1.5 block text-[12px] tracking-wider text-[#94A3B8] uppercase";

const roleOptions: UserRole[] = ["admin", "editor", "viewer"];

export function OrgSettings({
  org,
  members,
  currentUserId,
  isLoading,
  onUpdateOrg,
  onInvite,
  onRemoveMember,
}: {
  org: Organization | null;
  members: OrgMember[];
  currentUserId: string | null;
  isLoading: boolean;
  onUpdateOrg: (data: Partial<Organization>) => void | Promise<unknown>;
  onInvite: (email: string, role: UserRole) => void | Promise<unknown>;
  onRemoveMember: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState<UserRole>("editor");
  const [isSavingOrg, setIsSavingOrg] = useState(false);
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    setName(org?.name ?? "");
    setBillingEmail(org?.billing_email ?? "");
  }, [org?.name, org?.billing_email]);

  const workspaceDirty =
    name.trim() !== (org?.name ?? "").trim() ||
    billingEmail.trim() !== (org?.billing_email ?? "").trim();

  async function handleSaveWorkspace(e: React.FormEvent) {
    e.preventDefault();
    if (!workspaceDirty || isSavingOrg) return;
    setIsSavingOrg(true);
    try {
      await onUpdateOrg({
        name: name.trim(),
        billing_email: billingEmail.trim(),
      });
    } finally {
      setIsSavingOrg(false);
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim() || isInviting) return;
    setIsInviting(true);
    try {
      await onInvite(inviteEmail.trim(), inviteRole);
      setInviteEmail("");
    } finally {
      setIsInviting(false);
    }
  }

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-6 w-40 bg-[#1E293B]" />
        <Skeleton className="mt-2 mb-6 h-4 w-52 bg-[#1E293B]" />
        <div className="space-y-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="rounded-lg border border-[#1E293B] bg-[#111827] p-6"
            >
              <Skeleton className="h-4 w-32 bg-[#1E293B]" />
              <div className="mt-4 space-y-4">
                <Skeleton className="h-9 w-full bg-[#1E293B]" />
                <Skeleton className="h-9 w-full bg-[#1E293B]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[20px] font-medium text-[#F8FAFC]">Organization</h2>
      <p className="font-description mb-6 mt-1 text-[13px] text-[#94A3B8]">
        Manage your team and workspace
      </p>

      <div className="mb-4 rounded-lg border border-[#1E293B] bg-[#111827] p-6">
        <p className="mb-4 text-[14px] font-medium text-[#F8FAFC]">
          Workspace Details
        </p>
        <form onSubmit={handleSaveWorkspace} className="space-y-4">
          <div>
            <label htmlFor="org-name" className={labelClass}>
              Organization name
            </label>
            <input
              id="org-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="org-slug" className={labelClass}>
              Slug
            </label>
            <input
              id="org-slug"
              type="text"
              value={org?.slug ?? ""}
              disabled
              readOnly
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="org-billing-email" className={labelClass}>
              Billing email
            </label>
            <input
              id="org-billing-email"
              type="email"
              value={billingEmail}
              onChange={(e) => setBillingEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex justify-end pt-1">
            <button
              type="submit"
              disabled={!workspaceDirty || isSavingOrg}
              className="flex h-9 items-center gap-2 rounded-md border border-[#334155] bg-transparent px-4 text-[13px] text-[#94A3B8] transition-colors hover:bg-[#1E293B] hover:text-[#F8FAFC] disabled:opacity-50"
            >
              {isSavingOrg && (
                <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
              )}
              {isSavingOrg ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>

      <div className="mb-4 rounded-lg border border-[#1E293B] bg-[#111827] p-6">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-[14px] font-medium text-[#F8FAFC]">Team Members</p>
          {org && (
            <p className="text-[12px] text-[#475569] tabular-nums">
              {org.seat_count} of {org.seat_limit} seats used
            </p>
          )}
        </div>

        <form onSubmit={handleInvite} className="mb-4 flex gap-2">
          <input
            type="email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            placeholder="teammate@company.com"
            className="h-9 flex-1 rounded-md border border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569] focus:border-[#818CF8] focus:outline-none"
          />
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value as UserRole)}
            className={selectClass}
          >
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={!inviteEmail.trim() || isInviting}
            className="flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-3 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110 disabled:opacity-50"
          >
            <UserPlus size={14} strokeWidth={1.5} />
            {isInviting ? "Inviting..." : "Invite"}
          </button>
        </form>

        {members.length === 0 ? (
          <p className="font-description text-[13px] text-[#64748B]">
            No members yet.
          </p>
        ) : (
          <div className="space-y-1">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex h-11 items-center justify-between rounded px-3 transition-colors hover:bg-[#1E293B]"
              >
                <div className="flex min-w-0 items-center">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded bg-[#1E293B]">
                    {member.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={member.avatar_url}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-[11px] text-[#94A3B8]">
                        {getInitials(member.name)}
                      </span>
                    )}
                  </div>
                  <span className="ml-3 truncate text-[13px] text-[#F8FAFC]">
                    {member.name}
                  </span>
                  <span className="ml-2 truncate text-[12px] text-[#64748B]">
                    {member.email}
                  </span>
                </div>
                <div className="ml-4 flex shrink-0 items-center">
                  <StatusBadge status={member.role} variant="role" />
                  <span className="ml-3 text-[11px] text-[#475569] tabular-nums">
                    {formatDate(member.joined_at)}
                  </span>
                  {member.id !== currentUserId && (
                    <button
                      type="button"
                      onClick={() => onRemoveMember(member.id)}
                      className="ml-3 cursor-pointer text-[12px] text-[#F87171] transition-colors hover:underline"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-6">
        <p className="mb-3 text-[14px] font-medium text-[#F8FAFC]">Plan</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-[#F8FAFC]">Current plan</span>
            {org && <StatusBadge status={org.plan} variant="plan" />}
          </div>
          <button
            type="button"
            onClick={() => alert("Upgrade modal")}
            className="h-8 rounded-md border border-[#334155] bg-transparent px-3 text-[13px] text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
          >
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
}
