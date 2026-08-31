import { useMutation } from "@tanstack/react-query";
import { viewMaterial } from "../api/viewMaterial";

export function useViewMaterial() {
  // const queryClient = useQueryClient();
  const { mutate: trackView } = useMutation({
    mutationFn: viewMaterial,
  });

  return { trackView };
}
