import { useMutation } from "@tanstack/react-query";
import { verifyEmail as verifyEmailApi } from "../api/verifyEmail";
import { useNotification } from "@/src/providers/NotificationProvider";
import { AxiosError } from "axios";

export function useVerifyEmail() {
  const { success, error } = useNotification();

  const {
    mutate: verifyEmail,
    isPending: isVerifyingEmail,
    isSuccess: verificationSuccess,
    isError: verificationError,
  } = useMutation({
    mutationFn: verifyEmailApi,

    onSuccess: (data: { message: string }) => {
      success(data.message || "Email verified successfully");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      error(err?.response?.data?.message || "Verification failed");
    },
  });

  return {
    verifyEmail,
    isVerifyingEmail,
    verificationSuccess,
    verificationError,
  };
}
