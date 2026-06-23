"use client";

import { Building2, Lock } from "lucide-react";

type Props = {
  schoolName: string;
};

export default function LockedSchoolCard({ schoolName }: Props) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
      <div className="mb-2 flex items-center gap-2">
        <Building2 className="h-4 w-4 text-slate-500" />

        <span className="text-xs font-medium text-slate-500 uppercase">
          School
        </span>
      </div>

      <p className="font-medium text-slate-800">{schoolName}</p>

      <div className="mt-2 flex items-center gap-1 text-xs text-slate-500">
        <Lock className="h-3 w-3" />
        Locked to your profile
      </div>
    </div>
  );
}
