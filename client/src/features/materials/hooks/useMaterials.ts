import { useQuery } from "@tanstack/react-query";
import { getMaterials } from "../api/getMaterials";

type Params = {
  departmentId?: string;
  levelId?: string;
  semesterId?: string;
  page?: number;
  search?: string;
  category?: string;
};

export function useMaterials({
  departmentId,
  levelId,
  semesterId,
  page,
  search,
  category,
}: Params) {
  const query = useQuery({
    queryKey: ["materials", semesterId, page, search, category],
    queryFn: () =>
      getMaterials({
        departmentId: departmentId!,
        levelId: levelId!,
        semesterId: semesterId!,
        page,
        search,
        category,
      }),
    enabled: !!departmentId,
  });

  return {
    materials: query.data?.data.materials ?? [],
    totalPages: query.data?.totalPages ?? 1,
    page: query.data?.page ?? 1,
    total: query.data?.total ?? 0,
    isLoading: query.isPending,
  };
}
