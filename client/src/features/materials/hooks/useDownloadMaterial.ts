import { useState } from "react";

import { downloadMaterial } from "../api/downloadMaterial";

import { useNotification } from "@/src/providers/NotificationProvider";

export function useDownloadMaterial() {
  const [isDownloading, setIsDownloading] = useState(false);
  const { error } = useNotification();

  function startDownload(materialId: string) {
    try {
      setIsDownloading(true);

      downloadMaterial(materialId);
    } catch {
      error("Unable to download material.");
    } finally {
      setIsDownloading(false);
    }
  }

  return {
    startDownload,
    isDownloading,
  };
}
