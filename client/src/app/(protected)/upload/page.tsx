// src/app/(protected)/upload/page.tsx

import UploadMaterialForm from "@/src/features/materials/components/UploadMaterialForm";

export default function UploadPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <UploadMaterialForm />
    </main>
  );
}
