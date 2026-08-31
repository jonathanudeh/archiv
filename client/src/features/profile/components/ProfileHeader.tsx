"use client";

import { useAuth } from "@/src/providers/AuthProvider";
import { isPopulatedSchool } from "@/src/types/user";
import { LucideEdit3, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileHeader() {
  const { user } = useAuth();
  const router = useRouter();
  const [showPhoto, setShowPhoto] = useState(false);

  useEffect(() => {
    if (!showPhoto) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowPhoto(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent background scrolling while photo is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [showPhoto]);

  if (!user) return null;

  const photoUrl = user.photo?.url ?? "/default.jpg";

  return (
    <>
      <div className="relative mb-6 w-full py-6 md:p-8">
        {/* Edit Profile Action - Top Right Corner */}
        <div className="absolute top-6 right-6">
          <button
            onClick={() => {
              router.push("/profile/edit");
            }}
            className="bg-primary flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-all hover:opacity-90 active:scale-95"
          >
            <LucideEdit3 size={16} />
            <span>Edit Profile</span>
          </button>
        </div>

        {/* Main Profile Layout Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          {/* Avatar */}
          <button
            type="button"
            onClick={() => setShowPhoto(true)}
            className="group relative h-24 w-24 shrink-0 cursor-pointer rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            aria-label="View profile photo"
          >
            <Image
              src={photoUrl}
              alt={user.name}
              fill
              loading="eager"
              className="h-full w-full rounded-full border-2 border-white object-cover shadow-md transition-transform duration-200 group-hover:scale-105"
            />

            {/* Subtle hover overlay */}
            <span className="absolute inset-0 rounded-full bg-black/0 transition-colors duration-200 group-hover:bg-black/10" />
          </button>

          {/* Identity Details */}
          <div className="space-y-2">
            <div className="flex flex-row items-center gap-2 md:flex-col md:items-baseline">
              <h1 className="text-2xl font-bold text-[#172033]">{user.name}</h1>

              {/* Badges Container */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Contributor / Role Badge */}
                {user.role && user.role !== "user" && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50/70 px-2.5 py-0.5 text-xs font-medium text-blue-600 capitalize">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    {user.role}
                  </span>
                )}
              </div>
            </div>

            {/* Bio */}
            {user.bio && (
              <p className="max-w-xl pt-1 text-sm leading-relaxed text-slate-600">
                {user.bio}
              </p>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="my-5 border-slate-100" />

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-500 sm:text-sm">
          {isPopulatedSchool(user.school) && (
            <span className="uppercase">{user.school.acronym}</span>
          )}

          {isPopulatedSchool(user.school) && (
            <span>
              <span className="font-bold text-blue-500">·</span>
            </span>
          )}

          {typeof user.department !== "string" && user.department?.name && (
            <span className="capitalize">{user.department.name}</span>
          )}
        </div>
      </div>

      {/* Fullscreen Profile Photo Modal */}
      {showPhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setShowPhoto(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Profile photo preview"
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={() => setShowPhoto(false)}
            className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close photo preview"
          >
            <X size={24} />
          </button>

          {/* Large Image */}
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={photoUrl}
              alt={user.name}
              width={1000}
              height={1000}
              className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
