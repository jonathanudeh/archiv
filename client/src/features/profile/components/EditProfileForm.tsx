"use client";

import { useId, useState, ChangeEvent } from "react";
import Image from "next/image";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";

import {
  updateProfileSchema,
  UpdateProfileSchema,
} from "../schemas/updateProfileSchema";

import { useAuth } from "@/src/providers/AuthProvider";
import { useUpdateProfile } from "../hooks/useUpdateProfile";

import { School } from "../../schools/types/schools";
import { Department } from "@/src/types/department";

import SearchableSchoolSelect from "@/src/components/ui/SearchableSchoolSelect";
import SearchableDepartmentSelect from "@/src/components/ui/SearchableDepartmentSelect";

export default function EditProfileForm() {
  const { user } = useAuth();

  const inputId = useId();

  const [preview, setPreview] = useState<string>();

  const { updateUser, isUpdatingUser } = useUpdateProfile();

  /**
   * Determine whether school/department
   * has already been selected.
   */
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

  /**
   * Watch selected school and department
   */
  const selectedSchool = useWatch({
    control,
    name: "school",
  });

  const selectedDepartment = useWatch({
    control,
    name: "department",
  });

  const bio = useWatch({
    control,
    name: "bio",
  });

  /**
   * Submit
   */
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
      {/* Profile Photo */}

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
          className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-full bg-black/40 transition-opacity hover:bg-black/50"
        >
          <Camera size={30} className="text-white" />
        </label>

        <input
          id={inputId}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];

            if (!file) return;

            setValue("photo", file);

            setPreview(URL.createObjectURL(file));
          }}
        />
      </div>

      {/* Full Name */}

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

      {/* Bio */}

      <div className="space-y-2">
        <label className="text-sm font-medium text-slate-700">Bio</label>

        <textarea
          {...register("bio")}
          rows={5}
          maxLength={300}
          className="focus:ring-primary/20 focus:border-primary w-full resize-none rounded-2xl border border-slate-200 bg-white px-4 py-3 transition outline-none focus:ring-4"
          placeholder="Tell people about yourself..."
        />

        <div className="flex justify-between">
          {errors.bio && (
            <p className="text-sm text-red-500">{errors.bio.message}</p>
          )}

          <span className="ml-auto text-xs text-slate-400">
            {bio?.length ?? 0}/300
          </span>
        </div>
      </div>

      {/* School */}

      {schoolLocked ? (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">School</label>

          <div className="flex items-center justify-between rounded-full border border-blue-100 bg-blue-50 px-4 py-3">
            <div>
              {user?.school && (
                <p className="text-primary font-medium capitalize">
                  {typeof user.school !== "string" ? user.school.name : ""}
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

          <SearchableSchoolSelect
            value={selectedSchool}
            onChange={(school: School) =>
              setValue("school", school._id, {
                shouldValidate: true,
              })
            }
          />

          {errors.school && (
            <p className="text-sm text-red-500">{errors.school.message}</p>
          )}
        </div>
      )}

      {/* Department */}

      {departmentLocked ? (
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">
            Department
          </label>

          <div className="flex items-center justify-between rounded-full border border-blue-100 bg-blue-50 px-4 py-3">
            <div>
              {user?.department && (
                <p className="text-primary font-medium capitalize">
                  {typeof user.department !== "string"
                    ? user.department.name
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

          <SearchableDepartmentSelect
            schoolId={selectedSchool}
            value={selectedDepartment}
            onChange={(department: Department) =>
              setValue("department", department._id, {
                shouldValidate: true,
              })
            }
          />

          {errors.department && (
            <p className="text-sm text-red-500">{errors.department.message}</p>
          )}
        </div>
      )}

      {/* Selection Notice */}

      <div className="rounded-2xl bg-slate-50 p-3 text-xs">
        {schoolLocked ? (
          <p className="text-amber-700">
            * School & Department selection can only be done once. Contact
            support if you need a correction.
          </p>
        ) : (
          <p className="text-red-600">
            School and department can only be selected once.
          </p>
        )}
      </div>

      {/* Submit */}

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
