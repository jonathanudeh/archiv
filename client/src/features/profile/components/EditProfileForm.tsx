"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateProfileSchema,
  UpdateProfileSchema,
} from "../schemas/updateProfileSchema";
import { useAuth } from "@/src/providers/AuthProvider";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { useSchools } from "../../schools/hooks/useSchools";
import { useDepartments } from "../../schools/hooks/useDepartments";
import { Camera } from "lucide-react";

export default function EditProfileForm() {
  const { user } = useAuth();
  const inputId = useId();
  const [preview, setPreview] = useState<string>();
  const { updateUser, isUpdatingUser } = useUpdateProfile();
  const schoolLocked = !!user?.school && typeof user.school !== "string";
  const departmentLocked =
    !!user?.department && typeof user.department !== "string";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<UpdateProfileSchema>({
    resolver: zodResolver(updateProfileSchema),

    defaultValues: {
      name: user?.name,
      bio: user?.bio,
      school: typeof user?.school !== "string" ? user?.school?._id : undefined,
      department:
        typeof user?.department !== "string"
          ? user?.department?._id
          : undefined,
    },
  });

  const selectedSchool = useWatch({ control, name: "school" });
  const { schools } = useSchools();
  const { departments } = useDepartments(selectedSchool);

  async function onSubmit(values: UpdateProfileSchema) {
    const formData = new FormData();

    formData.append("name", values.name);

    if (values.bio) {
      formData.append("bio", values.bio);
    }

    if (values.school && !schoolLocked) {
      formData.append("school", values.school);
    }

    if (values.department && !departmentLocked) {
      formData.append("department", values.department);
    }

    const photo = values.photo as File;
    if (photo) {
      formData.append("photo", photo);
    }

    await updateUser(formData);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="relative h-35 w-35 shrink-0">
        <Image
          src={preview || user?.photo?.url || "/default.jpg"}
          alt={user?.name ?? ""}
          fill
          priority
          sizes="140px"
          className="rounded-full border-2 border-white object-cover shadow-md"
        />

        <label
          htmlFor={inputId}
          className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 opacity-100 transition-opacity"
        >
          <Camera size={30} className="text-white" />
        </label>

        <input
          id={inputId}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setValue("photo", file);

            setPreview(URL.createObjectURL(file));
          }}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Full Name</label>

        <input
          {...register("name")}
          className="focus:ring-primary/20 focus:border-primary w-full rounded-full border border-slate-200 bg-white px-4 py-3 transition outline-none focus:ring-4"
          placeholder="Your full name"
        />

        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Bio</label>

        <textarea
          {...register("bio")}
          rows={5}
          maxLength={300}
          className="focus:ring-primary/20 focus:border-primary w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 transition outline-none focus:ring-4"
          placeholder="Tell people about yourself..."
        />

        <div className="flex justify-between">
          {errors.bio && (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          )}

          <span className="ml-auto text-xs text-slate-400">
            {useWatch({ control, name: "bio" })?.length ?? 0}/300
          </span>
        </div>
      </div>

      {schoolLocked ? (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">School</label>

          <div className="flex items-center justify-between rounded-full border border-blue-100 bg-blue-50 px-4 py-3">
            <div>
              {user?.school && (
                <p className="text-primary font-medium capitalize">
                  {typeof user.school !== "string" ? user?.school.name : ""}
                </p>
              )}

              <p className="text-xs text-slate-500">Locked after selection</p>
            </div>

            <span className="text-sm font-medium text-blue-600">🔒</span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">School</label>

          <select
            {...register("school")}
            className="focus:ring-primary/20 focus:border-primary w-full rounded-full border border-slate-200 bg-white px-4 py-3 capitalize transition outline-none focus:ring-4"
          >
            <option value="">Select School</option>

            {schools?.map((school) => (
              <option key={school._id} value={school._id}>
                {school.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {departmentLocked ? (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Department
          </label>

          <div className="flex items-center justify-between rounded-full border border-blue-100 bg-blue-50 px-4 py-3">
            <div>
              {user?.department && (
                <p className="text-primary font-medium">
                  {typeof user.department !== "string"
                    ? user?.department.name
                    : ""}
                </p>
              )}

              <p className="text-xs text-slate-500">Locked after selection</p>
            </div>

            <span className="text-sm font-medium text-blue-600">🔒</span>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Department
          </label>

          <select
            {...register("department")}
            disabled={!selectedSchool}
            className="focus:ring-primary/20 focus:border-primary w-full rounded-lg border border-slate-200 bg-white p-4 px-4 py-3 transition outline-none focus:ring-4 disabled:bg-slate-100"
          >
            <option value="">Select Department</option>

            {departments?.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="p-3 text-xs">
        {schoolLocked ? (
          <>
            <p className="mt-1 text-amber-700">
              * School & Department Selection Can only be done once. Contact
              support if you need a correction.
            </p>
          </>
        ) : (
          <p className="text-red-600">
            School and department can only be selected once.
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center rounded-full py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
        disabled={isUpdatingUser}
      >
        {isUpdatingUser ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
