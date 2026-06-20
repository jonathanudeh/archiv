"use client";

import { MiniSpinner } from "@/src/components/ui/MiniSpinner";
import { useMyMaterials } from "../hooks/useMyMaterials";
import EmptyState from "./EmptyState";
import MaterialListItem from "@/src/components/material/MaterialListItem";

export default function MyUploadsList() {
  const { materials, isLoadingMatrials } = useMyMaterials();

  if (isLoadingMatrials) {
    return <MiniSpinner />;
  }

  if (!materials?.length) {
    return (
      <EmptyState
        title="No uploads yet"
        description="Your uploaded materials will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {materials.map((material) => (
        <MaterialListItem
          key={material._id}
          id={material._id}
          title={material.title}
          fileType={material.fileType}
          createdAt={material.createdAt}
        />
      ))}
    </div>
  );
}
