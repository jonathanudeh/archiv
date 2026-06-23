import ContributionGuard from "@/src/components/guards/ContributionGuard";
import CreateSchoolForm from "@/src/features/schools/components/CreateSchoolForm";

export default function CreateSchoolPage() {
  return (
    <ContributionGuard>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <CreateSchoolForm />
      </main>
    </ContributionGuard>
  );
}


