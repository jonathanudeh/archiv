// features/materials/hooks/useMaterial.ts

import { useQuery } from "@tanstack/react-query";
import { getMaterial } from "../api/getMaterial";

export function useMaterial(materialId: string) {
  const {
    data: material,
    isLoading: isLoadingMaterial,
    error: materialError,
  } = useQuery({
    queryKey: ["material", materialId],
    queryFn: () => getMaterial(materialId),
    enabled: !!materialId,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return {
    material,
    isLoadingMaterial,
    materialError,
  };
}
