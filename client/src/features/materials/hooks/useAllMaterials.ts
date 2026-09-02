import { useQuery } from "@tanstack/react-query";
import { getAllMaterials } from "../api/getAllMaterials";

type Params = {
  page?: number;
  search?: string;
  category?: string;
  level?: string;
  semester?: string;
  sort?: string;
};

export function useAllMaterials({
  page = 1,
  search,
  category,
  level,
  semester,
  sort,
}: Params) {
  const query = useQuery({
    queryKey: ["all-materials", page, search, category, level, semester, sort],

    queryFn: () =>
      getAllMaterials({
        page,
        search,
        category,
        level,
        semester,
        sort,
      }),
  });

  return {
    materials: query.data?.data.materials ?? [],
    totalPages: query.data?.totalPages ?? 1,
    page: query.data?.page ?? 1,
    total: query.data?.total ?? 0,

    isLoadingAllMaterials: query.isPending,
    errorAllMaterials: query.error,
  };
}
