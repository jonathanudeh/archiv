"use client";

import Link from "next/link";

import Spinner from "@/src/components/ui/Spinner";
import { usePopularMaterials } from "../../materials/hooks/usePopularMaterials";
import { Material } from "../../materials/types/material";
import MaterialCard from "../../materials/components/MaterialCard";

const PopularMaterials = () => {
  const { popularMaterials, isLoadingPopularMaterials, errorPopularMaterials } =
    usePopularMaterials();

  if (isLoadingPopularMaterials) return <Spinner />;

  if (errorPopularMaterials) {
    return (
      <div className="text-muted py-16 text-center">
        Failed to load materials.
      </div>
    );
  }

  if (!popularMaterials.length) return null;

  return (
    <section className="bg-background">
      <div className="archiv-container pt-3 pb-20">
        {/* HEADER */}
        <div className="mb-12 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-muted text-xs font-medium tracking-[0.2em] uppercase">
              Academic Library
            </p>

            <h2 className="text-foreground mt-2 text-2xl font-bold tracking-[-0.04em] md:text-3xl">
              Popular Materials
            </h2>

            <p className="text-muted mt-2 max-w-xl text-sm md:text-base">
              Discover the academic materials students are viewing, saving, and
              downloading the most.
            </p>
          </div>

          <Link
            href="/materials"
            className="inline-flex items-center justify-center rounded-full bg-[#172033] px-5 py-2.5 text-sm font-semibold text-white transition-all hover:scale-[1.02] hover:bg-[#2b3954]"
          >
            View all materials
          </Link>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularMaterials.map((material: Material) => (
            <MaterialCard key={material._id} material={material} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularMaterials;
