"use client";

import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { ChevronRight } from "lucide-react";
import { getFileMeta } from "@/src/utils/getFileMeta";

type Props = {
  id: string;
  title: string;
  fileType: string;
  createdAt: string;
};

export default function MaterialListItem({
  id,
  title,
  fileType,
  createdAt,
}: Props) {
  const meta = getFileMeta(fileType);
  const Icon = meta.icon;

  return (
    <Link
      href={`/materials/${id}`}
      className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300 hover:bg-slate-50 hover:shadow-sm"
    >
      <Icon />

      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium text-slate-900">{title}</h4>

        <p className="mt-1 text-sm text-slate-500">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <div className="rounded-full bg-slate-100 p-2">
        <ChevronRight className="h-4 w-4 text-slate-900" />
      </div>
    </Link>
  );
}
