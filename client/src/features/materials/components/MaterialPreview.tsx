"use client";
// src/features/materials/components/MaterialPreview.tsx

import Image from "next/image";
import { FileText } from "lucide-react";
import { getPreviewType } from "../utils/filePreview";

type Props = {
  fileUrl: string;
  fileType: string;
  title: string;
};

export default function MaterialPreview({ fileUrl, fileType, title }: Props) {
  const previewType = getPreviewType(fileType);

  if (previewType === "pdf") {
    return (
      <iframe
        src={fileUrl}
        title={title}
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
