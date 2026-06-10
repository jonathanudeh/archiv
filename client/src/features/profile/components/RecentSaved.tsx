"use client";

import { useActivity } from "../hooks/useActivity";
import ActivityItem from "./ActivityItem";

export default function RecentSaved() {
  const { activity } = useActivity();

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold">Saved Materials</h2>

      <div className="space-y-3">
        {activity?.recentSaved.map((saved) => (
          <ActivityItem
            key={saved._id}
            title={saved.material.title}
            fileType={saved.material.fileType}
            createdAt={saved.createdAt}
          />
        ))}
      </div>
    </section>
  );
}
