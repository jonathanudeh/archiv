import ContributionGuard from "@/src/components/guards/ContributionGuard";
import CreateDepartmentForm from "@/src/features/departments/components/CreateDepartmentForm";

export default function CreateDepartmentPage() {
  return (
    <ContributionGuard>
      <main className="mx-auto max-w-4xl px-6 py-8">
        <CreateDepartmentForm />
      </main>
    </ContributionGuard>
  );
}
