"use client";

import Link from "next/link";
import { useActivity } from "../hooks/useActivity";
import MaterialListItem from "@/src/components/material/MaterialListItem";

export default function RecentSaved() {
  const { activity } = useActivity();

  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Saved Materials</h2>

        {(activity?.stats.savedCount ?? 0) > 3 && (
          <Link
            href="/profile/saved"
            className="text-primary text-sm font-medium hover:underline"
          >
            See all
          </Link>
        )}
      </div>

      <div className="space-y-3">
        {activity?.recentSaved.map((saved) => (
          <MaterialListItem
            key={saved._id}
            id={saved.material._id}
            title={saved.material.title}
            fileType={saved.material.fileType}
            createdAt={saved.createdAt}
          />
        ))}
      </div>
    </section>
  );
}
