"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { getInitials } from "@/lib/formatters";
import type { UserProfile } from "@/lib/api";

const inputClass =
  "h-9 w-full rounded-md border border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569] focus:border-[#818CF8] focus:outline-none transition-colors disabled:text-[#64748B]";

const labelClass =
  "mb-1.5 block text-[12px] tracking-wider text-[#94A3B8] uppercase";

export function ProfileSettings({
  profile,
  isLoading,
  onSave,
  isSaving,
}: {
  profile: UserProfile | null;
  isLoading: boolean;
  onSave: (data: Partial<UserProfile>) => void;
  isSaving: boolean;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarChanged, setAvatarChanged] = useState(false);
  const [avatarRemoved, setAvatarRemoved] = useState(false);

  useEffect(() => {
    setName(profile?.name ?? "");
  }, [profile?.name]);

  const displayAvatar = avatarChanged
    ? avatarPreview
    : profile?.avatar_url ?? null;
  const isDirty =
    name.trim() !== (profile?.name ?? "").trim() || avatarChanged;

  function handleAvatarFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarChanged(true);
    setAvatarRemoved(false);
    e.target.value = "";
  }

  function handleRemoveAvatar() {
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarPreview(null);
    setAvatarChanged(true);
    setAvatarRemoved(true);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isDirty || isSaving) return;
    const data: Partial<UserProfile> = { name: name.trim() };
    if (avatarChanged) {
      data.avatar_url = avatarRemoved ? null : avatarPreview;
    }
    setAvatarChanged(false);
    setAvatarRemoved(false);
    onSave(data);
  }

  return (
    <div>
      <h2 className="text-[20px] font-medium text-[#F8FAFC]">Profile</h2>
      <p className="font-description mb-6 mt-1 text-[13px] text-[#94A3B8]">
        Manage your personal information
      </p>

      {isLoading || !profile ? (
        <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-lg bg-[#1E293B]" />
            <Skeleton className="h-8 w-28 bg-[#1E293B]" />
          </div>
          <div className="mt-6 space-y-5">
            <Skeleton className="h-9 w-full bg-[#1E293B]" />
            <Skeleton className="h-9 w-full bg-[#1E293B]" />
            <Skeleton className="h-9 w-full bg-[#1E293B]" />
          </div>
          <div className="mt-6 flex justify-end border-t border-[#1E293B] pt-4">
            <Skeleton className="h-9 w-28 bg-[#1E293B]" />
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="rounded-lg border border-[#1E293B] bg-[#111827] p-6"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg border border-[#334155] bg-[#1E293B]">
              {displayAvatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={displayAvatar}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-[20px] font-medium text-[#94A3B8]">
                  {getInitials(name || profile.name)}
                </span>
              )}
            </div>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-8 rounded-md border border-[#334155] bg-transparent px-3 text-[13px] text-[#94A3B8] transition-colors hover:border-[#475569] hover:text-[#F8FAFC]"
              >
                Upload Avatar
              </button>
              {(profile.avatar_url || avatarPreview) && (
                <button
                  type="button"
                  onClick={handleRemoveAvatar}
                  className="ml-2 cursor-pointer text-[12px] text-[#F87171] transition-colors hover:underline"
                >
                  Remove
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarFile}
                className="hidden"
              />
            </div>
          </div>

          <div className="mt-5 space-y-5">
            <div>
              <label htmlFor="profile-name" className={labelClass}>
                Full name
              </label>
              <input
                id="profile-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="profile-email" className={labelClass}>
                Email address
              </label>
              <input
                id="profile-email"
                type="email"
                value={profile.email}
                disabled
                readOnly
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="profile-role" className={labelClass}>
                Role
              </label>
              <input
                id="profile-role"
                type="text"
                value={profile.role}
                disabled
                readOnly
                className={inputClass}
              />
            </div>
          </div>

          <div className="mt-5 border-t border-[#1E293B] pt-5">
            <label htmlFor="profile-password" className={labelClass}>
              Password
            </label>
            <button
              type="button"
              onClick={() => alert("Password change modal")}
              className="h-8 rounded-md border border-[#334155] bg-transparent px-3 text-[13px] text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
            >
              Change Password
            </button>
          </div>

          <div className="mt-6 flex justify-end border-t border-[#1E293B] pt-4">
            <button
              type="submit"
              disabled={!isDirty || isSaving}
              className="flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-4 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110 disabled:opacity-50"
            >
              {isSaving && (
                <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
              )}
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
