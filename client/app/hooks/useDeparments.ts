import { useQuery } from "@tanstack/react-query";
import { getDepartmentsBySchool } from "../services/departmentService";

// fetch departments of a school by the school Id
export function useDepartments(schoolId: string) {
  const {
    data: schoolDepartments,
    isLoading: isLoadingSchDepartments,
    error: schDeptError,
  } = useQuery({
    queryKey: ["departments", schoolId],
    queryFn: async () => getDepartmentsBySchool(schoolId),
    enabled: !!schoolId,
  });

  return { schoolDepartments, isLoadingSchDepartments, schDeptError };
}
