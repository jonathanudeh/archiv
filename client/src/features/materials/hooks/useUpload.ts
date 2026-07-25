import { useMutation } from "@tanstack/react-query";
import { uploadMaterial } from "../api/uploadMaterial";
import { useNotification } from "@/src/providers/NotificationProvider";
import { AxiosError } from "axios";

export function useUploadMaterial() {
  const { success, error } = useNotification();

  const { mutateAsync, isPending: isLoadingUploading } = useMutation({
    mutationFn: uploadMaterial,

    onSuccess() {
      success("Material uploaded successfully");
    },

    onError(err: AxiosError<{ message: string }>) {
      error(err?.response?.data?.message ?? "Upload failed");
    },
  });

  return {
    uploadMaterial: mutateAsync,
    isUploading: isLoadingUploading,
  };
}
