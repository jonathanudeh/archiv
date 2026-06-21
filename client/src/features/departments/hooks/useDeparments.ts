import { useQuery } from "@tanstack/react-query";
import { getDepartmentsBySchool } from "../api/getDepartmentsBySchool";

export function useDepartments(
  schoolId: string,
  page = 1,
  limit = 12,
  search = "",
) {
  const {
    data,
    isPending: isLoadingDepartments,
    error: departmentsError,
  } = useQuery({
    queryKey: ["departments", schoolId, page, limit, search],
    queryFn: () => getDepartmentsBySchool(schoolId, page, limit, search),
    enabled: !!schoolId,
  });

  return {
    departments: data?.data?.departments ?? [],
    totalPages: data?.totalPages ?? 1,
    page: data?.page ?? 1,
    total: data?.total ?? 0,
    isLoadingDepartments,
    departmentsError,
  };
}
