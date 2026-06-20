"use client";

import { MiniSpinner } from "@/src/components/ui/MiniSpinner";
import { useMySavedMaterials } from "../hooks/useMySavedMaterials";
import EmptyState from "./EmptyState";
import MaterialListItem from "@/src/components/material/MaterialListItem";

export default function MySavedMaterialsList() {
  const { savedMaterials, isLoadingSavedMaterials } = useMySavedMaterials();

  if (isLoadingSavedMaterials) {
    return <MiniSpinner />;
  }

  if (!savedMaterials?.length) {
    return (
      <EmptyState
        title="No saved materials"
        description="Materials you save will appear here."
      />
    );
  }

  return (
    <div className="space-y-4">
      {savedMaterials.map((material) => (
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
