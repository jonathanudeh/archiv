// app/(protected)/profile/edit/page.tsx

import EditProfileForm from "@/src/features/profile/components/EditProfileForm";

export default function EditProfilePage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <EditProfileForm />
    </main>
  );
}
