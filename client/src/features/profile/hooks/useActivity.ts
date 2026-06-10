import { useQuery } from "@tanstack/react-query";
import { getActivity } from "../api/getActivity";

export function useActivity() {
  const {
    data: activity,
    isPending: isActivitiesLoading,
    error: activityError,
  } = useQuery({
    queryKey: ["activity"],
    queryFn: getActivity,
  });

  return {
    activity,
    isActivitiesLoading,
    activityError,
  };
}
