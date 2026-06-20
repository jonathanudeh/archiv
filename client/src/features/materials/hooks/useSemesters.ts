import { useQuery } from "@tanstack/react-query";
import { getSemesters } from "../api/getSemesters";

export function useSemesters(departmentId?: string, levelId?: string) {
  const { data: semesters, isLoading: isLoadingSemesters } = useQuery({
    queryKey: ["semesters", departmentId, levelId],
    queryFn: () => getSemesters(departmentId!, levelId!),
    enabled: !!levelId,
  });

  return {
    semesters,
    isLoadingSemesters,
  };
}
