import { useQuery } from "@tanstack/react-query";
import { getLevels } from "../api/getLevels";

export function useLevels(departmentId?: string) {
  const { data: levels, isLoading: isLoadingLevels } = useQuery({
    queryKey: ["levels", departmentId],
    queryFn: () => getLevels(departmentId!),
    enabled: !!departmentId,
  });

  return {
    levels,
    isLoadingLevels,
  };
}
