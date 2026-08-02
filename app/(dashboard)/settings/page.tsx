"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle } from "lucide-react";
import { useAuth } from "@/lib/auth";
import {
  useApiKeys,
  useCreateApiKey,
  useInviteMember,
  useOrganization,
  useProfile,
  useRemoveMember,
  useRevokeApiKey,
  useUpdateOrganization,
  useUpdateProfile,
} from "@/lib/queries";
import { extractErrorMessage } from "@/lib/api";
import { SettingsTabs, type SettingsTab } from "@/components/settings-tabs";
import { ProfileSettings } from "@/components/profile-settings";
import { OrgSettings } from "@/components/org-settings";
import {
  ApiKeySettings,
  type CreatedApiKey,
} from "@/components/api-key-settings";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

function PageSkeleton() {
  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="mx-auto max-w-6xl">
        <Skeleton className="h-7 w-28" />
        <Skeleton className="mt-2 h-4 w-56" />
        <div className="mt-6 flex gap-6">
          <div className="flex w-[200px] shrink-0 flex-col gap-1">
            {[0, 1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
          <div className="flex-1">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="mt-2 h-4 w-44" />
            <div className="mt-6 rounded-lg border border-[#1E293B] bg-[#111827] p-6">
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [createdKey, setCreatedKey] = useState<CreatedApiKey | null>(null);

  const profileQuery = useProfile();
  const orgQuery = useOrganization();
  const keysQuery = useApiKeys();
  const updateProfileMutation = useUpdateProfile();
  const updateOrgMutation = useUpdateOrganization();
  const inviteMutation = useInviteMember();
  const removeMemberMutation = useRemoveMember();
  const createKeyMutation = useCreateApiKey();
  const revokeKeyMutation = useRevokeApiKey();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [authLoading, isAuthenticated, router]);

  const profile = profileQuery.data ?? null;
  const { org, members } = orgQuery.data ?? { org: null, members: [] };
  const apiKeys = keysQuery.data?.api_keys ?? [];

  const activeError =
    activeTab === "profile"
      ? profileQuery.isError
      : activeTab === "organization"
        ? orgQuery.isError
        : activeTab === "api-keys"
          ? keysQuery.isError
          : false;

  const activeLoading =
    activeTab === "profile"
      ? profileQuery.isLoading
      : activeTab === "organization"
        ? orgQuery.isLoading
        : activeTab === "api-keys"
          ? keysQuery.isLoading
          : false;

  function handleRetry() {
    if (activeTab === "profile") void profileQuery.refetch();
    if (activeTab === "organization") void orgQuery.refetch();
    if (activeTab === "api-keys") void keysQuery.refetch();
  }

  if (authLoading) {
    return <PageSkeleton />;
  }

  if (activeError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#0D1117]">
        <AlertTriangle size={24} className="text-[#F87171]" />
        <p className="font-description mt-2 text-[14px] text-[#94A3B8]">
          Failed to load settings
        </p>
        <button
          type="button"
          onClick={handleRetry}
          className="mt-4 h-8 rounded-md border border-[#334155] bg-transparent px-3 text-[13px] text-[#94A3B8] transition-colors hover:text-[#F8FAFC]"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D1117]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-[24px] font-medium text-[#F8FAFC]">Settings</h1>
          <p className="font-description mt-1 text-[13px] text-[#94A3B8]">
            Manage your account and workspace
          </p>
        </div>

        <div className="flex gap-6">
          <SettingsTabs activeTab={activeTab} onTabChange={setActiveTab} />

          <div className="min-w-0 flex-1">
            {activeLoading ? (
              <div>
                <Skeleton className="h-6 w-24" />
                <Skeleton className="mt-2 h-4 w-44" />
                <div className="mt-6 space-y-4">
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
            ) : (
              <>
                {activeTab === "profile" && (
                  <ProfileSettings
                    profile={profile}
                    isLoading={false}
                    onSave={(data) =>
                      updateProfileMutation.mutate(data, {
                        onSuccess: () => toast.success("Profile saved"),
                        onError: (error) =>
                          toast.error(extractErrorMessage(error)),
                      })
                    }
                    isSaving={updateProfileMutation.isPending}
                  />
                )}

                {activeTab === "organization" && (
                  <OrgSettings
                    org={org}
                    members={members}
                    currentUserId={profile?.id ?? null}
                    isLoading={false}
                    onUpdateOrg={async (data) => {
                      try {
                        await updateOrgMutation.mutateAsync(data);
                        toast.success("Organization updated");
                      } catch (error) {
                        toast.error(extractErrorMessage(error));
                      }
                    }}
                    onInvite={async (email, role) => {
                      try {
                        await inviteMutation.mutateAsync({ email, role });
                        toast.success("Invite sent");
                      } catch (error) {
                        toast.error(extractErrorMessage(error));
                      }
                    }}
                    onRemoveMember={(id) =>
                      removeMemberMutation.mutate(id, {
                        onSuccess: () => toast.success("Member removed"),
                        onError: (error) =>
                          toast.error(extractErrorMessage(error)),
                      })
                    }
                  />
                )}

                {activeTab === "api-keys" && (
                  <ApiKeySettings
                    apiKeys={apiKeys}
                    isLoading={false}
                    isCreating={createKeyMutation.isPending}
                    createdKey={createdKey}
                    onCreate={async (name) => {
                      try {
                        const result = await createKeyMutation.mutateAsync(name);
                        setCreatedKey({
                          name: result.key.name,
                          fullKey: result.full_key,
                        });
                        toast.success("API key generated");
                      } catch (error) {
                        toast.error(extractErrorMessage(error));
                      }
                    }}
                    onRevoke={(id) =>
                      revokeKeyMutation.mutate(id, {
                        onSuccess: () => {
                          setCreatedKey(null);
                          toast.success("API key revoked");
                        },
                        onError: (error) =>
                          toast.error(extractErrorMessage(error)),
                      })
                    }
                  />
                )}

                {activeTab === "billing" && (
                  <div className="rounded-lg border border-[#1E293B] bg-[#111827] p-6">
                    <p className="font-description text-[13px] text-[#64748B]">
                      Billing settings will appear here.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
