"use client";

import { formatDistanceToNow } from "date-fns";
import { getFileMeta } from "../utils/getFileMeta";

type Props = {
  title: string;
  fileType: string;
  createdAt: string;
};

export default function ActivityItem({ title, fileType, createdAt }: Props) {
  const meta = getFileMeta(fileType);

  const Icon = meta.icon;

  return (
    <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">
      <div
        className={`flex h-12 w-12 items-center justify-center rounded-xl ${meta.bg}`}
      >
        <Icon className={`h-5 w-5 ${meta.iconColor}`} />
      </div>

      <div className="min-w-0 flex-1">
        <h4 className="truncate font-medium text-[#172033]">{title}</h4>

        <p className="text-sm text-slate-500">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>

      <span
        className={`rounded-full px-2 py-1 text-xs font-medium ${meta.bg} ${meta.iconColor}`}
      >
        {meta.label}
      </span>
    </div>
  );
}
