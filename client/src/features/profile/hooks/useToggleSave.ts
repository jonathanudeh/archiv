import { useMutation, useQueryClient } from "@tanstack/react-query";

import { saveMaterial as saveMaterialApi } from "../api/saveMaterial";
import { unsaveMaterial as unsaveMaterialApi } from "../api/unsaveMaterial";

import { useNotification } from "@/src/providers/NotificationProvider";
import { AxiosError } from "axios";

export function useToggleSaveMaterial() {
  const queryClient = useQueryClient();

  const { success, error } = useNotification();

  const { mutateAsync: saveMaterial, isPending: isSaving } = useMutation({
    mutationFn: saveMaterialApi,

    onSuccess() {
      success("Material saved");

      queryClient.invalidateQueries({
        queryKey: ["material"],
      });
      queryClient.invalidateQueries({
        queryKey: ["savedMaterials"],
      });

      queryClient.invalidateQueries({
        queryKey: ["activity"],
      });
    },

    onError(err: any) {
      error(err?.response?.data?.message);
    },
  });

  const { mutateAsync: unsaveMaterial, isPending: isUnsaving } = useMutation({
    mutationFn: unsaveMaterialApi,

    onSuccess() {
      success("Material removed from saved");

      queryClient.invalidateQueries({
        queryKey: ["savedMaterials"],
      });

      queryClient.invalidateQueries({
        queryKey: ["activity"],
      });
    },

    onError(err: any) {
      error(err?.response?.data?.message);
    },
  });

  return {
    saveMaterial,
    unsaveMaterial,

    isSaving: isSaving || isUnsaving,
  };
}
