"use client";

import { useSchools } from "@/src/hooks/useSchools";
import SchoolCard from "../../../components/SchoolCard";
import Spinner from "../../../components/ui/Spinner";
import Link from "next/link";

const PopularSchools = () => {
  const { schools, isLoadingAllSchools, errorAllSchools } = useSchools();

  if (isLoadingAllSchools) return <Spinner />;

  if (errorAllSchools) {
    return (
      <div className="text-muted py-16 text-center">
        Failed to load schools.
      </div>
    );
  }

  return (
    <section className="bg-background">
      <div className="archiv-container py-20">
        {/* HEADER */}
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            {/* small label */}
            <p className="text-muted text-xs font-medium tracking-[0.2em] uppercase">
              Academic Index
            </p>

            {/* title */}
            <h2 className="text-foreground mt-2 text-2xl font-bold tracking-[-0.04em] md:text-3xl">
              Popular Schools
            </h2>

            <p className="text-muted mt-2 max-w-xl text-sm md:text-base">
              Explore institutions and access structured academic materials
              across departments and levels.
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/schools"
            className="inline-flex items-center justify-center rounded-full bg-[#172033] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-[#2b3954]"
          >
            View all schools
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {schools?.map((school: any) => (
            <SchoolCard key={school._id} school={school} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularSchools;
