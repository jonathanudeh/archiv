"use client";

import { Bookmark, Calendar, Download, Eye, FileText } from "lucide-react";
import { format } from "date-fns";
import { useRouter } from "next/navigation";

import { Material } from "../types/material";

type Props = {
  material: Material;
};

export default function MaterialCard({ material }: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/materials/${material._id}`);
  };

  return (
    <article
      onClick={handleClick}
      className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
    >
      {/* FILE TYPE */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100">
          <FileText className="h-5 w-5 text-slate-600" />
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 uppercase">
          {getFileType(material.fileType)}
        </span>
      </div>

      {/* TITLE */}
      <h2 className="group-hover:text-primary line-clamp-2 text-lg font-bold text-slate-900 transition">
        {material.title}
      </h2>

      {/* DESCRIPTION */}
      {material.description && (
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
          {material.description}
        </p>
      )}

      {/* CATEGORY */}
      <div className="mt-5">
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 capitalize">
          {material.category}
        </span>
      </div>

      {/* ACADEMIC INFO */}
      <div className="mt-5 space-y-2 text-sm text-slate-500">
        {material.department?.name && (
          <p className="truncate">
            <span className="font-medium text-slate-700">Department:</span>{" "}
            {material.department.name}
          </p>
        )}

        {material.level?.name && (
          <p>
            <span className="font-medium text-slate-700">Level:</span>{" "}
            {material.level.name}
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
        <div className="flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Eye size={14} />
            {material.viewCount ?? 0}
          </span>

          <span className="flex items-center gap-1">
            <Download size={14} />
            {material.downloadCount ?? 0}
          </span>
        </div>

        <div className="flex items-center gap-1 text-xs text-slate-400">
          <Calendar size={13} />
          {format(new Date(material.createdAt), "MMM d, yyyy")}
        </div>
      </div>
    </article>
  );
}

function getFileType(fileType?: string) {
  if (!fileType) return "FILE";

  if (fileType.includes("pdf")) return "PDF";
  if (fileType.includes("word") || fileType.includes("document")) {
    return "DOC";
  }
  if (fileType.includes("presentation") || fileType.includes("powerpoint")) {
    return "PPT";
  }
  if (fileType.includes("spreadsheet") || fileType.includes("excel")) {
    return "XLS";
  }
  if (fileType.startsWith("image/")) return "IMAGE";

  return "FILE";
}
