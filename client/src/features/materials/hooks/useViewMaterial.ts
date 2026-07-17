import { useMutation, useQueryClient } from "@tanstack/react-query";
import { viewMaterial } from "../api/viewMaterial";

export function useViewMaterial() {
  const queryClient = useQueryClient();
  const { mutate: trackView } = useMutation({
    mutationFn: viewMaterial,

    onSuccess: (_, materialId) => {
      queryClient.invalidateQueries({
        queryKey: ["material", materialId],
      });
    },
  });

  return { trackView };
}
