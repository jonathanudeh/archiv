"use client";

import { useAuth } from "@/src/providers/AuthProvider";
import { isPopulatedSchool } from "@/src/types/user";
import { LucideEdit3 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ProfileHeader() {
  const { user } = useAuth();
  const router = useRouter();

  if (!user) return null;

  return (
    <div className="relative mb-6 w-full py-6 md:p-8">
      {/* Edit Profile Action - Top Right Corner */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => {
            router.push("/profile/edit");
          }}
          className="bg-primary flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
        >
          <LucideEdit3 size={16} />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Main Profile Layout Header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        {/* Avatar Container with Disabled Overlay Cover */}
        <div className="relative h-24 w-24 shrink-0">
          <Image
            src={user.photo?.url ?? "/default.jpg"}
            alt={user?.name}
            fill
            loading="eager"
            className="h-full w-full rounded-full border-2 border-white object-cover shadow-md"
          />
        </div>

        {/* Identity Details */}
        <div className="space-y-2">
          <div className="flex flex-row items-center gap-2 md:flex-col md:items-baseline">
            <h1 className="text-2xl font-bold text-[#172033]">{user?.name}</h1>

            {/* Badges Container */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Contributor / Role Badge */}
              {user?.role && user.role !== "user" && (
                <span className="bg-blue-5 inline-flex items-center gap-1.5 rounded-full bg-blue-50/70 px-2.5 py-0.5 text-xs font-medium text-blue-600 capitalize">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                  {user.role}
                </span>
              )}

              {/* Verification Status Badge */}
              {/* {user?.isVerified && (
                <span className="inline-flex items-center gap-1 rounded-full border border-green-200/50 bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  ✓ Verified
                </span>
              )} */}
            </div>
          </div>

          {/* Email Text
          <p className="text-sm text-slate-500">{user?.email}</p> */}

          {/* Bio Field Integration */}
          {user?.bio && (
            <p className="max-w-xl pt-1 text-sm leading-relaxed text-slate-600">
              {user.bio}
            </p>
          )}
        </div>
      </div>

      {/* Thin Horizontal Divider line */}
      <hr className="my-5 border-slate-100" />

      {/* Metadata Inline Info Inline Footer inside Card */}
      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
        {isPopulatedSchool(user.school) && <span>{user.school.acronym}</span>}

        {isPopulatedSchool(user.school) && (
          <span>
            <span className="font-bold text-blue-500">·</span>
          </span>
        )}

        {/* {typeof user?.school !== "string" &&
          typeof user?.department !== "string" &&
          user?.school?.name &&
          user?.department?.name && (
            <span className="font-bold text-blue-500">·</span>
          )} */}

        {typeof user?.department !== "string" && user?.department?.name && (
          <span>{user.department.name}</span>
        )}
      </div>
    </div>
  );
}
