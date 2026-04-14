"use client";

import Spinner from "@/app/components/ui/Spinner";
import { useDepartments } from "@/app/hooks/useDeparments";
// /school/[slug]

import { useSchool } from "@/app/hooks/useSchools";
import Image from "next/image";
import { useParams } from "next/navigation";

const SchoolPage = () => {
  const { slug } = useParams();
  const { school, isLoadingSchool, errorSchool } = useSchool(slug as string);

  // TODO - fetch departments by pupular algorithm
  const { schoolDepartments, isLoadingSchDepartments, schDeptError } =
    useDepartments(school?._id);

  if (isLoadingSchool || isLoadingSchDepartments) return <Spinner />;
  if (errorSchool || schDeptError || !school)
    return <div className="p-20 text-center">School not found.</div>;

  // Use the primary color for the hero background, default to gold/cream
  const themeColor = school.primaryColor || "#FDF4E3";

  return (
    <main className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section
        className="relative px-6 pt-10 pb-16 md:px-12"
        style={{
          background: `radial-gradient(circle at top right, white, ${themeColor} 70%)`,
        }}
      >
        {/* Subtle SVG Texture Overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-10 mix-blend-multiply" />

        <div className="relative z-10 mx-auto flex max-w-7xl items-center gap-6">
          {/* School Logo with White Glow */}
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 border-white bg-white shadow-xl md:h-32 md:w-32">
            <Image
              src={school.logo}
              alt={school.name}
              fill
              className="object-contain p-4"
            />
          </div>

          {/* School Titles */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-800 md:text-4xl">
              {school.name}{" "}
              {/* <span className="block font-medium text-slate-400">
                ({school.slug.toUpperCase()})
              </span> */}
            </h1>
            <p className="text-sm font-bold tracking-[0.2em] text-slate-600/60 uppercase md:text-base">
              {school.slug.toUpperCase()}
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12">
        <div className="mb-10 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">
            Popular Departments
          </h2>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Example Department Card - You can map your school.departments here */}

          {isLoadingSchDepartments ? (
            <Spinner />
          ) : (
            schoolDepartments?.map((dept) => (
              <DepartmentCard
                key={dept._id}
                title={dept.name}
                icon={dept.icon}
                bgColor={dept.bgColor}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
};

// Sub-component for Departments
const DepartmentCard = ({
  title,
  icon,
  bgColor,
}: {
  title: string;
  icon: string;
  bgColor: string;
}) => (
  <div
    className="flex flex-col gap-4 rounded-2xl border border-white p-6 shadow-sm transition-transform hover:scale-[1.01]"
    style={{ backgroundColor: bgColor }}
  >
    <div className="flex items-center gap-4">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500 text-white shadow-md">
        {/* Placeholder for Icon */}
        <span className="text-2xl font-bold">{title[0]}</span>
      </div>
      <h3 className="w-32 text-xl leading-tight font-extrabold text-slate-800">
        {title}
      </h3>
    </div>

    <div className="mt-2 flex gap-4">
      {["100 Level", "200 Level", "300 Level"].map((level, i) => (
        <div key={level} className="flex items-center gap-1.5">
          <div
            className={`h-1.5 w-1.5 rounded-sm bg-slate-400 ${i === 0 ? "opacity-100" : "opacity-30"}`}
          />
          <span
            className={`text-[11px] font-bold ${i === 0 ? "text-slate-900" : "text-slate-400"}`}
          >
            {level}
          </span>
        </div>
      ))}
    </div>
  </div>
);

export default SchoolPage;
