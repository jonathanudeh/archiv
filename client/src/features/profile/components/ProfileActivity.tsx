"use client";

import { useActivity } from "../hooks/useActivity";

import ActivityCard from "./ActivityCard";
import RecentUploads from "./RecentUploads";
import RecentSaved from "./RecentSaved";
import { MiniSpinner } from "@/src/components/ui/MiniSpinner";

export default function ProfileActivity() {
  const { activity, isActivitiesLoading } = useActivity();

  if (isActivitiesLoading) {
    return <MiniSpinner />;
  }

  return (
    <section className="space-y-8">
      <div>
        <h2 className="mb-4 text-lg font-semibold">Activity Overview</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <ActivityCard
            label="Materials Uploaded"
            value={activity?.stats.uploadedCount ?? 0}
          />

          <ActivityCard
            label="Materials Saved"
            value={activity?.stats.savedCount ?? 0}
          />
        </div>
      </div>

      {(activity?.stats.uploadedCount ?? 0) > 0 && <RecentUploads />}

      {(activity?.stats.savedCount ?? 0) > 0 && <RecentSaved />}
    </section>
  );
}
