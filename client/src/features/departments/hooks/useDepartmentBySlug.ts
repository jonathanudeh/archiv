import { useQuery } from "@tanstack/react-query";
import { getDepartment } from "../api/getDepartmentBySlug";

export function useDepartmentBySlug(schoolId?: string, deptSlug?: string) {
  const { data: departmentBySlug, isLoading: isLoadingDeptBySlug } = useQuery({
    queryKey: ["department", schoolId, deptSlug],
    queryFn: () => getDepartment(schoolId!, deptSlug!),
    enabled: !!schoolId && !!deptSlug,
  });

  return { departmentBySlug, isLoadingDeptBySlug };
}
