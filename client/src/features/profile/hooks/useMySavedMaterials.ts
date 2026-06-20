import { useQuery } from "@tanstack/react-query";
import { getMySavedMaterials } from "../api/getMySavedMaterials";
import { Material } from "../../materials/types/material";

export function useMySavedMaterials() {
  const { data: savedMaterials, isPending: isLoadingSavedMaterials } = useQuery<
    Material[]
  >({
    queryKey: ["savedMaterials"],
    queryFn: getMySavedMaterials,
  });

  return {
    savedMaterials,
    isLoadingSavedMaterials,
  };
}
