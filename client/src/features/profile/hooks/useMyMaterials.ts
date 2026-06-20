import { useQuery } from "@tanstack/react-query";
import { getMyMaterials } from "../api/getMyMaterials";

export function useMyMaterials() {
  const { data: materials, isPending: isLoadingMatrials } = useQuery({
    queryKey: ["myMaterials"],
    queryFn: getMyMaterials,
  });

  return {
    materials,
    isLoadingMatrials,
  };
}
