"use client";

import { useActivity } from "../hooks/useActivity";
import ActivityItem from "./ActivityItem";

export default function RecentUploads() {
  const { activity } = useActivity();

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Recent Uploads</h2>

      <div className="space-y-3">
        {activity?.recentUploads.map((material) => (
          <ActivityItem
            key={material._id}
            title={material.title}
            fileType={material.fileType}
            createdAt={material.createdAt}
          />
        ))}
      </div>
    </section>
  );
}
