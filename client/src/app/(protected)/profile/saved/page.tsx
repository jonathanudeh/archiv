import MySavedMaterialsList from "@/src/features/profile/components/MySavedMaterialsList";

export default function SavedMaterialsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-8 text-2xl font-bold">Saved Materials</h1>

      <MySavedMaterialsList />
    </main>
  );
}
