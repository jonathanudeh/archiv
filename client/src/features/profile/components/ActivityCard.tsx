import { ActivityCardProps } from "../types/activity";

export default function ActivityCard({ label, value }: ActivityCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6">
      <p className="text-sm text-slate-500">{label}</p>

      <h3 className="mt-3 text-4xl font-bold text-[#172033]">{value}</h3>
    </div>
  );
}
