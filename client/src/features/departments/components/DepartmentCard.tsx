import { BookCheck, Layers3 } from "lucide-react";
import Link from "next/link";

interface Props {
  name: string;
  slug: string;
  schoolSlug: string;
  numberOfLevels: number;
  materialsCount: number;
}

const DepartmentCard = ({
  name,
  slug,
  schoolSlug,
  numberOfLevels,
  materialsCount,
}: Props) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3);

  return (
    <Link
      href={`/schools/${schoolSlug}/departments/${slug}`}
      className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white uppercase">
          {initials}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 capitalize">
            {name}
          </h3>

          <div className="mt-3 flex flex-wrap gap-2">
            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs">
              <BookCheck size={14} />
              {materialsCount} Materials
            </span>

            <span className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-xs">
              <Layers3 size={14} />
              {numberOfLevels} Levels
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DepartmentCard;
