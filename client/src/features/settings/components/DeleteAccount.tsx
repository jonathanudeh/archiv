export default function DeleteAccount() {
  return (
    <section className="rounded-2xl border border-red-200 bg-red-50 p-6">
      <p className="mt-2 text-sm text-red-600">
        Permanently deleting your account removes your profile, saved materials
        and account access.
      </p>

      <button
        disabled
        className="mt-5 rounded-xl bg-red-600 px-5 py-3 font-medium text-white opacity-50"
      >
        Delete Account
      </button>
    </section>
  );
}
