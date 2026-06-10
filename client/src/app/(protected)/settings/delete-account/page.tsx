import BackButton from "@/src/components/ui/BackButton";
import DeleteAccount from "@/src/features/settings/components/DeleteAccount";

export default function UpdatePasswordPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="mb-6 flex items-center gap-3">
        <BackButton />

        <h2 className="text-xl font-semibold text-red-700">Danger Zone</h2>
      </div>

      <DeleteAccount />
    </main>
  );
}
