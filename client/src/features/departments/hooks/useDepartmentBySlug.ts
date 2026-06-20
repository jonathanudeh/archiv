import { useQuery } from "@tanstack/react-query";
import { getDepartment } from "../api/getDepartmentBySlug";

export function useDepartmentBySlug(slug: string) {
  const { data: departmentBySlug, isLoading: isLoadingDeptBySlug } = useQuery({
    queryKey: ["department", slug],
    queryFn: () => getDepartment(slug),
    enabled: !!slug,
  });

  return { departmentBySlug, isLoadingDeptBySlug };
}
