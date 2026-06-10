import { useMutation } from "@tanstack/react-query";
import { updatePassword } from "../api/updatePassword";
import { useNotification } from "@/src/providers/NotificationProvider";

export function useUpdatePassword() {
  const { success, error } = useNotification();

  const { mutateAsync: updateUserPassword, isPending: isUpdatingPassword } =
    useMutation({
      mutationFn: updatePassword,

      onSuccess: () => {
        success("Password updated successfully");
      },

      onError: (err: any) => {
        error(err?.response?.data?.message || "Failed to update password");
      },
    });

  return {
    updateUserPassword,
    isUpdatingPassword,
  };
}
