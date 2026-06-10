import Link from "next/link";
import { ChevronRight } from "lucide-react";

type Props = {
  href: string;
  title: string;
  description: string;
};

export default function SettingsLink({ href, title, description }: Props) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-slate-300 hover:shadow-sm"
    >
      <div>
        <h2 className="font-semibold text-[#172033]">{title}</h2>

        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <ChevronRight className="h-5 w-5 text-slate-400" />
    </Link>
  );
}
