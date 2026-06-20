import MyUploadsList from "@/src/features/profile/components/MyUploadsList";

export default function MyUploadsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <h1 className="mb-8 text-2xl font-bold">My Uploads</h1>

      <MyUploadsList />
    </main>
  );
}
