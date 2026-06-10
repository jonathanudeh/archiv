import BackButton from "@/src/components/ui/BackButton";
import UpdatePasswordForm from "@/src/features/settings/components/UpdatePasswordForm";

export default function UpdatePasswordPage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <div className="flex gap-3">
        <BackButton />

        <div className="mb-6">
          <h1 className="text-primary text-2xl font-semibold">Security</h1>

          <p className="mt-1 text-sm text-slate-500">
            Change your account password.
          </p>
        </div>
      </div>

      <UpdatePasswordForm />
    </main>
  );
}
