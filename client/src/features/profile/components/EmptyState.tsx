import { EmptyStateProps } from "../types/material";

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 p-10 text-center">
      <h2 className="text-lg font-semibold text-[#172033]">{title}</h2>

      <p className="mt-2 text-slate-500">{description}</p>
    </div>
  );
}
