"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { useSchools } from "../hooks/useSchools";
import Navbar from "../components/landing/Navbar";
import SchoolCard from "../components/landing/SchoolCard";
import Spinner from "../components/ui/Spinner";

const SchoolsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Using your existing hook
  const { schools, isLoadingAllSchools, errorAllSchools } = useSchools();

  if (isLoadingAllSchools) return <Spinner />;

  // Filter logic remains the same
  const filteredSchools = schools?.filter((school: any) =>
    school.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (errorAllSchools) {
    return (
      <div>
        <p>Error finding schools</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-100">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-6 py-12">
        {/* Header Section */}
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <h1 className="text-3xl font-bold text-slate-900">Browse Schools</h1>

          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search for school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pr-4 pl-11 text-sm transition-all focus:ring-2 focus:ring-blue-500/10 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSchools?.map((school: any) => (
            <SchoolCard
              key={school._id}
              school={school}
              // isDetailed={true} // Just pass a flag if you want the arrow/extra info
            />
          ))}
        </div>

        {/* Empty State */}
        {!isLoadingAllSchools && filteredSchools?.length === 0 && (
          <div className="py-20 text-center text-slate-500">
            No schools found matching &quot;{searchTerm}&quot;
          </div>
        )}
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default SchoolsPage;
