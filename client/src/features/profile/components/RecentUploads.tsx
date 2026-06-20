"use client";

import Link from "next/link";
import { useActivity } from "../hooks/useActivity";
import MaterialListItem from "@/src/components/material/MaterialListItem";

export default function RecentUploads() {
  const { activity } = useActivity();

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Recent Uploads</h2>

        {(activity?.stats.uploadedCount ?? 0) > 3 && (
          <Link
            href="/profile/my-uploads"
            className="text-primary text-sm font-medium hover:underline"
          >
            See all
          </Link>
        )}
      </div>

      <div className="space-y-3">
        {activity?.recentUploads.map((material) => (
          <MaterialListItem
            key={material._id}
            id={material._id}
            title={material.title}
            fileType={material.fileType}
            createdAt={material.createdAt}
          />
        ))}
      </div>
    </section>
  );
}
