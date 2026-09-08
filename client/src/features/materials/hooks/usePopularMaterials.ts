import { useQuery } from "@tanstack/react-query";
import { getPopularMaterials } from "../api/getPopularMaterials";

export function usePopularMaterials() {
  const {
    data,
    isLoading: isLoadingPopularMaterials,
    error: errorPopularMaterials,
  } = useQuery({
    queryKey: ["popular-materials"],
    queryFn: () => getPopularMaterials(4),
    staleTime: 1000 * 60 * 10,
  });

  return {
    popularMaterials: data?.data.materials ?? [],
    isLoadingPopularMaterials,
    errorPopularMaterials,
  };
}
