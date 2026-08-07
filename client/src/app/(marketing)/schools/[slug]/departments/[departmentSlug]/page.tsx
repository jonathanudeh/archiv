"use client";

import Spinner from "@/src/components/ui/Spinner";
import Pagination from "@/src/components/layout/Pagination";
import MaterialFilters from "@/src/features/materials/components/MaterialFilters";
import MaterialsGrid from "@/src/features/materials/components/MaterialsGrid";
import { useMaterials } from "@/src/features/materials/hooks/useMaterials";
import { useDepartmentBySlug } from "@/src/features/departments/hooks/useDepartmentBySlug";
import { useParams } from "next/navigation";
import { useMaterialFilters } from "@/src/hooks/useMaterialFilters";
import { MiniSpinner } from "@/src/components/ui/MiniSpinner";
import { useSchool } from "@/src/features/schools/hooks/useSchoolSlug";

export default function DepartmentPage() {
  const { departmentSlug, slug } = useParams();

  // SCHOOL
  const { school, isLoadingSchool } = useSchool(slug as string);

  const { levelId, semesterId, category, search, page, setFilters } =
    useMaterialFilters();

  const { departmentBySlug, isLoadingDeptBySlug } = useDepartmentBySlug(
    school?._id,
    departmentSlug as string,
  );

  const departmentId = departmentBySlug?._id;

  const { materials, totalPages, isLoading } = useMaterials({
    departmentId,
    levelId,
    semesterId,
    page,
    search,
    category,
  });

  if (isLoadingSchool) {
    return <Spinner />;
  }
  if (isLoadingDeptBySlug) {
    return <Spinner />;
  }

  if (!departmentBySlug) {
    return <div className="p-10 text-center">Department not found.</div>;
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col space-y-6 px-4 py-6 sm:px-6">
      <MaterialFilters
        departmentId={departmentId}
        departmentName={departmentBySlug.name}
        schoolName={departmentBySlug.school?.acronym ?? ""}
        levelId={levelId}
        semesterId={semesterId}
        search={search}
        category={category}
        setFilters={setFilters}
      />

      {isLoading ? (
        <MiniSpinner />
      ) : (
        <>
          <MaterialsGrid materials={materials} />

          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(page) =>
              setFilters({
                page: String(page),
              })
            }
          />
        </>
      )}
    </main>
  );
}
