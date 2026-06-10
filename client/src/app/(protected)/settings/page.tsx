import SettingsLink from "@/src/features/settings/components/SettingsLink";

export default function SettingsPage() {
  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="mb-6 text-3xl font-bold text-[#172033]">Settings</h1>

      <div className="space-y-4">
        <SettingsLink
          href="/settings/update-password"
          title="Security"
          description="Change your account password"
        />

        <SettingsLink
          href="/settings/delete-account"
          title="Danger Zone"
          description="Delete your Archiv account"
        />
      </div>
    </main>
  );
}
