import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../api/updatePassword";
import { useNotification } from "@/src/providers/NotificationProvider";
import { AxiosError } from "axios";

export function useUpdatePassword() {
  const { success, error } = useNotification();

  const { mutateAsync: updateUserPassword, isPending: isUpdatingPassword } =
    useMutation({
      mutationFn: updatePassword,

      onSuccess: () => {
        success("Password updated successfully");
      },

      onError: (err: AxiosError<{ message: string }>) => {
        error(err?.response?.data?.message || "Failed to update password");
      },
    });

  return {
    updateUserPassword,
    isUpdatingPassword,
  };
}
