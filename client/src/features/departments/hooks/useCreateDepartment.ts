"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDepartment } from "../api/createDepartment";
import { useNotification } from "@/src/providers/NotificationProvider";
import { AxiosError } from "axios";

export function useCreateDepartment() {
  const queryClient = useQueryClient();
  const { success, error } = useNotification();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createDepartment,

    onSuccess() {
      success("Department created successfully");

      queryClient.invalidateQueries({
        queryKey: ["departments"],
      });

      queryClient.invalidateQueries({
        queryKey: ["schools"],
      });
    },

    onError(err: AxiosError<{ message: string }>) {
      error(err?.response?.data?.message ?? "Unable to create department.");
    },
  });

  return {
    createDepartment: mutateAsync,
    isCreatingDepartment: isPending,
  };
}
