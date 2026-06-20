import { useMutation } from "@tanstack/react-query";
import { uploadMaterial } from "../api/uploadMaterial";
import { useNotification } from "@/src/providers/NotificationProvider";

export function useUploadMaterial() {
  const { success, error } = useNotification();

  const { mutateAsync, isPending: isLoadingUploading } = useMutation({
    mutationFn: uploadMaterial,

    onSuccess() {
      success("Material uploaded successfully");
    },

    onError(err: any) {
      error(err?.response?.data?.message ?? "Upload failed");
    },
  });

  return {
    uploadMaterial: mutateAsync,
    isUploading: isLoadingUploading,
  };
}
