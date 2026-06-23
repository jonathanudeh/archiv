"use client";

import SettingsLink from "@/src/features/settings/components/SettingsLink";
import { canContribute } from "@/src/lib/permissions";
import { useAuth } from "@/src/providers/AuthProvider";

export default function SettingsPage() {
  const { user } = useAuth();

  const contributor = canContribute(user);

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-[#172033]">Settings</h1>

      <div className="space-y-4">
        <SettingsLink
          href="/settings/update-password"
          title="Security"
          description="Change your account password"
        />

        {contributor && (
          <>
            <SettingsLink
              href="/contribute/school"
              title="Create School"
              description="Add a new school to Archiv"
            />

            <SettingsLink
              href="/contribute/department"
              title="Create Department"
              description="Add a new department to Archiv"
            />
          </>
        )}

        <SettingsLink
          href="/settings/delete-account"
          title="Danger Zone"
          description="Delete your Archiv account"
        />
      </div>
    </main>
  );
}
