"use client";
import { useSchools } from "@/app/hooks/useSchools";
import SchoolCard from "./SchoolCard";
import Spinner from "../ui/Spinner";
import Link from "next/link";

const PopularSchools = () => {
  const { schools, isLoadingAllSchools, errorAllSchools } = useSchools();

  if (isLoadingAllSchools) return <Spinner />;
  if (errorAllSchools)
    return (
      <div className="p-10 text-center text-slate-400">
        Error loading schools.
      </div>
    );

  return (
    <section className="mx-auto w-full bg-gray-100 px-6 py-12">
      <h2 className="mb-8 text-xl font-bold text-slate-800">Popular Schools</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {schools?.map((school: any) => (
          <SchoolCard key={school._id} school={school} />
        ))}
      </div>

      {/* All schools button */}
      <button className="mt-10 rounded-sm bg-blue-900 px-4 py-2 text-white">
        <Link href={`/schools`}>All Schools</Link>
      </button>
    </section>
  );
};

export default PopularSchools;
