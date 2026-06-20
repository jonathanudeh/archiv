"use client";

import MaterialListItem from "@/src/components/material/MaterialListItem";
import { Material } from "../types/material";

type Props = {
  materials: Material[];
};

export default function MaterialsGrid({ materials }: Props) {
  if (!materials.length) {
    return (
      <div className="rounded-2xl border p-10 text-center text-slate-500">
        No materials found.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
