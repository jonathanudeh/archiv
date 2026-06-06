import { useMutation } from "@tanstack/react-query";

import { resendVerification } from "../api/resendVerification";

export function useResendVerification() {
  const {
    mutate: resendEmail,
    isPending: isResendingEmail,
    error: resendEmailError,
  } = useMutation({
    mutationFn: resendVerification,
  });

  return {
    resendEmail,
    isResendingEmail,
    resendEmailError,
  };
}
