"use client";

import { MiniSpinner } from "@/src/components/ui/MiniSpinner";
import { useMaterial } from "../hooks/useMaterial";
import MaterialDetails from "./MaterialDetails";

type Props = {
  materialId: string;
};

export default function MaterialPage({ materialId }: Props) {
  const { material, isLoadingMaterial } = useMaterial(materialId);

  if (isLoadingMaterial) {
    return <MiniSpinner />;
  }

  if (!material) {
    return <div className="py-20 text-center">Material not found</div>;
  }

  return <MaterialDetails material={material} />;
}
