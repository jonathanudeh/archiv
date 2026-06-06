import { useMutation } from "@tanstack/react-query";
import { verifyEmail as verifyEmailApi } from "../api/verifyEmail";
import { useNotification } from "@/src/providers/NotificationProvider";

export function useVerifyEmail() {
  const { success, error } = useNotification();

  const { mutate: verifyEmail, isPending: isVerifyingEmail } = useMutation({
    mutationFn: verifyEmailApi,

    onSuccess: (data) => {
      success(data.message || "Email verified successfully");
    },

    onError: (err: any) => {
      error(err?.response?.data?.message || "Verification failed");
    },
  });

  return { verifyEmail, isVerifyingEmail };
}
