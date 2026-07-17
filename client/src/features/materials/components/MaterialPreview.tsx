"use client";
// src/features/materials/components/MaterialPreview.tsx

import Image from "next/image";
import { FileText } from "lucide-react";
import { getPreviewType } from "../utils/filePreview";
import { useViewMaterial } from "../hooks/useViewMaterial";

type Props = {
  materialId: string;
  fileUrl: string;
  fileType: string;
  title: string;
};

export default function MaterialPreview({
  materialId,
  fileUrl,
  fileType,
  title,
}: Props) {
  const { trackView } = useViewMaterial();
  const previewType = getPreviewType(fileType);

  if (previewType === "pdf") {
    return (
      <iframe
        src={fileUrl}
        title={title}
        onLoad={() => trackView(materialId)} //count view when preview actually loads
        className="h-100 w-full rounded-2xl border border-slate-200 md:h-225"
      />
    );
  }

  if (previewType === "image") {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <Image
          src={fileUrl}
          alt={title}
          width={1200}
          height={1600}
          onLoad={() => trackView(materialId)} //count view when preview actually loads
          className="h-auto w-full"
        />
      </div>
    );
  }

  if (
    previewType === "doc" ||
    previewType === "ppt" ||
    previewType === "sheet"
  ) {
    return (
      <iframe
        src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(fileUrl)}`}
        className="h-225 w-full rounded-2xl border border-slate-200"
        title={title}
        onLoad={() => trackView(materialId)} //count view when preview actually loads
      />
    );
  }

  return (
    <div className="flex h-125 flex-col items-center justify-center rounded-2xl border border-slate-200">
      <FileText className="mb-4 h-16 w-16 text-slate-400" />

      <h3 className="font-semibold">Preview unavailable</h3>

      <p className="mt-2 text-slate-500">Download this file to view it.</p>
    </div>
  );
}
