import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { updateProfile } from "../api/updateProfile";
import { useNotification } from "@/src/providers/NotificationProvider";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { success, error } = useNotification();

  const { mutateAsync: updateUser, isPending: isUpdatingUser } = useMutation({
    mutationFn: updateProfile,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["me"],
      });
      success("Profile updated successfully");
      router.replace("/profile");
    },

    onError: (err: AxiosError<{ message: string }>) => {
      error(err?.response?.data?.message || "Failed to update profile");
    },
  });

  return {
    updateUser,
    isUpdatingUser,
  };
}
