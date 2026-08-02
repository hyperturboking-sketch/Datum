"use client";

import { useState } from "react";
import {
  AlertTriangle,
  Check,
  Copy,
  Key,
  Loader2,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate, formatRelativeTime } from "@/lib/formatters";
import type { ApiKey } from "@/lib/api";

export interface CreatedApiKey {
  name: string;
  fullKey: string;
}

export function ApiKeySettings({
  apiKeys,
  isLoading,
  isCreating,
  createdKey,
  onCreate,
  onRevoke,
}: {
  apiKeys: ApiKey[];
  isLoading: boolean;
  isCreating: boolean;
  createdKey: CreatedApiKey | null;
  onCreate: (name: string) => void | Promise<unknown>;
  onRevoke: (id: string) => void;
}) {
  const [name, setName] = useState("");
  const [copiedKeyId, setCopiedKeyId] = useState<string | null>(null);

  function copyText(text: string, keyId: string | null) {
    void navigator.clipboard.writeText(text);
    if (keyId) {
      setCopiedKeyId(keyId);
      window.setTimeout(() => setCopiedKeyId(null), 1500);
    }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || isCreating) return;
    await onCreate(name.trim());
    setName("");
  }

  if (isLoading) {
    return (
      <div>
        <Skeleton className="h-6 w-32 bg-[#1E293B]" />
        <Skeleton className="mt-2 mb-6 h-4 w-64 bg-[#1E293B]" />
        <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-6">
          <Skeleton className="h-14 w-full bg-[#1E293B]" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-12 w-full bg-[#1E293B]" />
            <Skeleton className="h-12 w-full bg-[#1E293B]" />
            <Skeleton className="h-12 w-full bg-[#1E293B]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[20px] font-medium text-[#F8FAFC]">API Keys</h2>
      <p className="font-description mb-6 mt-1 text-[13px] text-[#94A3B8]">
        Manage access tokens for external integrations
      </p>

      <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-6">
        <div className="mb-4 flex items-start gap-2 rounded-md border border-[rgba(245,158,11,0.20)] bg-[rgba(245,158,11,0.05)] p-3">
          <AlertTriangle size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#F59E0B]" />
          <p className="font-description text-[12px] text-[#94A3B8]">
            Keep your API keys secure. Do not share them in client-side code or
            public repositories.
          </p>
        </div>

        <form onSubmit={handleCreate} className="mb-4 flex gap-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Production Key"
            className="h-9 flex-1 rounded-md border border-[#334155] bg-[#0D1117] px-3 text-[13px] text-[#F8FAFC] placeholder:text-[#475569] focus:border-[#818CF8] focus:outline-none"
          />
          <button
            type="submit"
            disabled={!name.trim() || isCreating}
            className="flex h-9 items-center gap-2 rounded-md bg-[#818CF8] px-3 text-[13px] font-medium text-[#0B0F19] transition-colors hover:brightness-110 disabled:opacity-50"
          >
            {isCreating && (
              <Loader2 size={14} strokeWidth={1.5} className="animate-spin" />
            )}
            {isCreating ? "Generating..." : "Generate Key"}
          </button>
        </form>

        {createdKey && (
          <div className="mb-4 rounded-md border border-[rgba(129,140,248,0.20)] bg-[rgba(129,140,248,0.05)] p-2">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate font-mono text-[12px] text-[#818CF8]">
                {createdKey.fullKey}
              </span>
              <button
                type="button"
                onClick={() => copyText(createdKey.fullKey, null)}
                aria-label="Copy new API key"
                className="flex shrink-0 cursor-pointer items-center text-[#64748B] transition-colors hover:text-[#F8FAFC]"
              >
                <Copy size={14} strokeWidth={1.5} />
              </button>
            </div>
            <p className="font-description mt-1 text-[11px] text-[#94A3B8]">
              Copy this now — you won&apos;t see it again.
            </p>
          </div>
        )}

        {apiKeys.length === 0 ? (
          <p className="font-description text-[13px] text-[#64748B]">
            No API keys generated yet.
          </p>
        ) : (
          <div className="space-y-2">
            {apiKeys.map((key) => (
              <div
                key={key.id}
                className="flex h-12 items-center justify-between rounded-md border border-[#1E293B] bg-[#0D1117] px-4"
              >
                <div className="flex min-w-0 items-center">
                  <Key
                    size={14}
                    strokeWidth={1.5}
                    className="mr-2 shrink-0 text-[#64748B]"
                  />
                  <span className="truncate text-[13px] text-[#F8FAFC]">
                    {key.name}
                  </span>
                  <span className="ml-2 truncate font-mono text-[12px] text-[#94A3B8]">
                    {key.prefix}
                  </span>
                </div>
                <div className="ml-4 flex shrink-0 items-center">
                  <span className="text-[11px] text-[#475569] tabular-nums">
                    {key.last_used_at
                      ? `Last used ${formatRelativeTime(key.last_used_at)}`
                      : formatDate(key.created_at)}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyText(key.prefix, key.id)}
                    aria-label={`Copy key ${key.name}`}
                    className="ml-3 cursor-pointer text-[#64748B] transition-colors hover:text-[#F8FAFC]"
                  >
                    {copiedKeyId === key.id ? (
                      <Check size={14} strokeWidth={1.5} className="text-[#22C55E]" />
                    ) : (
                      <Copy size={14} strokeWidth={1.5} />
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => onRevoke(key.id)}
                    className="ml-3 flex cursor-pointer items-center gap-1 text-[12px] text-[#F87171] transition-colors hover:underline"
                  >
                    <Trash2 size={12} strokeWidth={1.5} />
                    Revoke
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
