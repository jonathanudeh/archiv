"use client";

import { Bookmark, Calendar, Download, Eye } from "lucide-react";
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
      className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-slate-300 hover:shadow-md"
    >
      {/* FILE TYPE */}
      <div className="mb-5 flex items-center justify-between">
        {/* TITLE */}
        <div>
          <h2 className="group-hover:text-primary line-clamp-2 text-lg font-bold text-slate-900 transition">
            {material.title}
          </h2>

          {/* DESCRIPTION */}
          {material.description && (
            <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-500">
              {material.description}
            </p>
          )}
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 uppercase">
          {getFileType(material.fileType)}
        </span>
      </div>

      {/* CATEGORY */}
      <div className="mt-5 flex gap-2">
        {material.school?.acronym && (
          <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 uppercase">
            {material.school.acronym}
          </span>
        )}
        <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 capitalize">
          {material.category}
        </span>
        <span className="inline-flex truncate rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 capitalize">
          {material.department.name} {material.level.name}L
        </span>
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

          <span className="flex items-center gap-1">
            <Bookmark size={14} />
            {material.saveCount ?? 0}
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
