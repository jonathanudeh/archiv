import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMaterial } from "../api/deleteMaterial";

export function useDeleteMaterial() {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteMaterialMutation, isPending: isDeleting } =
    useMutation({
      mutationFn: deleteMaterial,

      onSuccess: (_, materialId) => {
        // Remove this material's cached detail
        queryClient.removeQueries({
          queryKey: ["material", materialId],
        });

        // Refresh material lists
        queryClient.invalidateQueries({
          queryKey: ["materials"],
        });
      },
    });

  return {
    deleteMaterial: deleteMaterialMutation,
    isDeleting,
  };
}
