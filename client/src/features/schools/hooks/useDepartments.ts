import { useQuery } from "@tanstack/react-query";
import { getDepartments } from "../apis/getDepartments";

export function useDepartments(schoolId?: string) {
  const { data: departments, isPending: isLoadingDepartment } = useQuery({
    queryKey: ["departments", schoolId],
    queryFn: () => getDepartments(schoolId!),
    enabled: !!schoolId,
  });

  return {
    departments,
    isLoadingDepartment,
  };
}
