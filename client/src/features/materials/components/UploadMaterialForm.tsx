"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, FileText, School, GraduationCap } from "lucide-react";

import { useAuth } from "@/src/providers/AuthProvider";
import { isPopulatedDepartment, isPopulatedSchool } from "@/src/types/user";
import { School as SchoolType } from "@/src/features/schools/types/schools";
import { Department } from "@/src/types/department";

import SearchableSchoolSelect from "@/src/components/ui/SearchableSchoolSelect";
import SearchableDepartmentSelect from "@/src/components/ui/SearchableDepartmentSelect";

import { useLevels } from "../hooks/useLevels";
import { useSemesters } from "../hooks/useSemesters";

import {
  uploadMaterialSchema,
  UploadMaterialSchema,
} from "../schema/uploadMaterialSchema";

import { useUploadMaterial } from "../hooks/useUpload";
import { useRouter } from "next/navigation";

export default function UploadMaterialForm() {
  // const [progress, setProgress] = useState(0);
  const [uploadProgress, setUploadProgress] = useState({
    percentage: 0,
    loaded: 0,
    total: 0,
  });
  const { user } = useAuth();
  const router = useRouter();

  const isAdmin = user?.role === "admin";

  const profileSchool = isPopulatedSchool(user?.school)
    ? user.school
    : undefined;

  const profileDepartment = isPopulatedDepartment(user?.department)
    ? user.department
    : undefined;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    resetField,
    reset,
    formState: { errors },
  } = useForm<UploadMaterialSchema>({
    resolver: zodResolver(uploadMaterialSchema),

    defaultValues: {
      school: "",
      department: "",
    },
  });

  /**
   * Watchers
   */

  const selectedSchool = useWatch({
    control,
    name: "school",
  });

  const selectedDepartment = useWatch({
    control,
    name: "department",
  });

  const selectedLevel = useWatch({
    control,
    name: "levelId",
  });

  const selectedFile = useWatch({
    control,
    name: "file",
  });

  const fileSize = selectedFile ? selectedFile.size / (1024 * 1024) : 0;
  /**
   * Lock contributor/user to their profile
   */

  useEffect(() => {
    if (!isAdmin) {
      if (profileSchool) {
        setValue("school", profileSchool._id);
      }

      if (profileDepartment) {
        setValue("department", profileDepartment._id);
      }
    }
  }, [isAdmin, profileSchool, profileDepartment, setValue]);

  /**
   * Reset dependent fields
   */

  useEffect(() => {
    resetField("department");
    resetField("levelId");
    resetField("semester");
  }, [selectedSchool, resetField]);

  useEffect(() => {
    resetField("levelId");
    resetField("semester");
  }, [selectedDepartment, resetField]);

  useEffect(() => {
    resetField("semester");
  }, [selectedLevel, resetField]);

  /**
   * Queries
   */

  const { levels } = useLevels(selectedDepartment);
  const { semesters } = useSemesters(selectedDepartment, selectedLevel);
  const { uploadMaterial, isUploading } = useUploadMaterial();

  async function onSubmit(data: UploadMaterialSchema) {
    const result = await uploadMaterial({
      ...data,
      file: data.file,
      onProgress: setUploadProgress,
    });

    reset({
      school: !isAdmin && profileSchool ? profileSchool._id : "",
      department: !isAdmin && profileDepartment ? profileDepartment._id : "",
      title: "",
      description: "",
      // category: "",
      levelId: "",
      semester: "",
      file: undefined,
    });

    setUploadProgress({
      percentage: 0,
      loaded: 0,
      total: 0,
    });

    // Redirect to the uploaded material
    if (result?.data?.material?._id) {
      router.push(`/materials/${result.data.material._id}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-6"
    >
      {/* Header */}

      <div>
        <h1 className="text-primary text-2xl font-bold">Upload Material</h1>

        <p className="mt-1 text-sm text-slate-500">
          Upload academic materials to Archiv.
          <span className="block text-amber-500">
            {(!profileSchool || !profileDepartment) &&
              "You must finish editing your profile before you can upload."}
          </span>
        </p>
      </div>

      {/* School */}

      <div>
        <label className="mb-2 block text-sm font-medium">School</label>

        {isAdmin ? (
          <SearchableSchoolSelect
            value={selectedSchool}
            onChange={(school: SchoolType) =>
              setValue("school", school._id, {
                shouldValidate: true,
              })
            }
          />
        ) : (
          <div className="rounded-full border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <School className="h-4 w-4 text-slate-500" />

              <span className="text-xs font-medium text-slate-500 uppercase">
                School
              </span>
            </div>

            <p className="font-medium capitalize">
              {profileSchool?.name ?? "No school selected"}
            </p>
          </div>
        )}

        <p className="mt-1 text-sm text-red-500">{errors.school?.message}</p>
      </div>

      {/* Department */}

      <div>
        <label className="mb-2 block text-sm font-medium">Department</label>

        {isAdmin ? (
          <SearchableDepartmentSelect
            schoolId={selectedSchool}
            value={selectedDepartment}
            onChange={(department: Department) =>
              setValue("department", department._id, {
                shouldValidate: true,
              })
            }
          />
        ) : (
          <div className="rounded-full border border-slate-200 bg-slate-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <GraduationCap className="h-4 w-4 text-slate-500" />

              <span className="text-xs font-medium text-slate-500 uppercase">
                Department
              </span>
            </div>

            <p className="font-medium capitalize">
              {profileDepartment?.name ?? "No department selected"}
            </p>
          </div>
        )}

        <p className="mt-1 text-sm text-red-500">
          {errors.department?.message}
        </p>
      </div>

      {/* Title */}

      <div>
        <label className="mb-2 block text-sm font-medium">Title</label>

        <input
          {...register("title")}
          placeholder="CSC 202 Data Structures Note"
          className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <p className="mt-1 text-sm text-red-500">{errors.title?.message}</p>
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block text-sm font-medium">Description</label>

        <textarea
          {...register("description")}
          rows={4}
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.description?.message}
        </p>
      </div>

      {/* Category */}

      <div>
        <label className="mb-2 block text-sm font-medium">Category</label>

        <select
          {...register("category")}
          className="w-full rounded-full border border-slate-300 px-4 py-3"
        >
          <option value="">Select category</option>
          <option value="material">Material</option>
          <option value="lecture note">Lecture Note</option>
          <option value="past question">Past Question</option>
          <option value="assignment">Assignment</option>
          <option value="project">Project</option>
          <option value="textbook">Textbook</option>
          <option value="lab report">Lab Report</option>
          <option value="other">Other</option>
        </select>

        <p className="mt-1 text-sm text-red-500">{errors.category?.message}</p>
      </div>

      {/* Level & Semester */}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Level</label>

          <select
            {...register("levelId")}
            disabled={!selectedDepartment}
            className="w-full rounded-full border border-slate-300 px-4 py-3 disabled:bg-slate-100"
          >
            <option value="">Select level</option>

            {levels?.map((level) => (
              <option key={level._id} value={level._id}>
                {level.name}
              </option>
            ))}
          </select>

          <p className="mt-1 text-sm text-red-500">{errors.levelId?.message}</p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Semester</label>

          <select
            {...register("semester")}
            disabled={!selectedLevel}
            className="w-full rounded-full border border-slate-300 px-4 py-3 disabled:bg-slate-100"
          >
            <option value="">Select semester</option>

            {semesters?.map((semester) => (
              <option key={semester._id} value={semester._id}>
                {semester.name}
              </option>
            ))}
          </select>

          <p className="mt-1 text-sm text-red-500">
            {errors.semester?.message}
          </p>
        </div>
      </div>

      {/* File */}

      <div>
        <label className="mb-2 block text-sm font-medium">Material File</label>

        <label
          className={`flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-8 transition ${
            selectedFile
              ? "cursor-not-allowed border-slate-200 bg-slate-50"
              : "cursor-pointer border-slate-300 hover:border-blue-500"
          }`}
        >
          <UploadCloud className="mb-3 h-8 w-8 text-slate-500" />

          <span className="font-medium">
            {selectedFile ? "File selected" : "Click to select file"}
          </span>

          {!selectedFile && (
            <span className="mt-1 text-sm text-slate-500">
              PDF, DOCX, PPTX, XLSX, JPG, PNG...
            </span>
          )}

          <input
            type="file"
            className="hidden"
            disabled={!!selectedFile || isUploading}
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setValue("file", file, {
                shouldValidate: true,
              });
            }}
          />
        </label>

        {selectedFile && (
          <div className="mt-3 flex items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
            <div className="flex min-w-0 items-center gap-3">
              <FileText className="h-4 w-4 shrink-0" />

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {fileSize.toFixed(2)} MB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setValue("file", undefined as never);
              }}
              className="shrink-0 cursor-pointer rounded-full border border-red-500 p-2 text-xs font-medium text-red-500 hover:bg-red-500 hover:text-red-600"
            >
              Remove
            </button>
          </div>
        )}
        <p className="mt-1 text-sm text-red-500">
          {errors.file?.message as string}
        </p>
      </div>

      {/* Progress */}

      {isUploading && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-700">
              {uploadProgress.percentage < 100
                ? "Uploading..."
                : "Processing..."}
            </span>

            <span className="text-slate-500">{uploadProgress.percentage}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{
                width: `${uploadProgress.percentage}%`,
              }}
            />
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={isUploading}
        className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center gap-2 rounded-full py-3 font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUploading
          ? uploadProgress.percentage < 100
            ? `Uploading ${uploadProgress.percentage}%`
            : "Processing..."
          : "Upload Material"}

        {uploadProgress.total > 0 && (
          <p className="text-sm">
            {(uploadProgress.loaded / (1024 * 1024)).toFixed(2)} MB /{" "}
            {(uploadProgress.total / (1024 * 1024)).toFixed(2)} MB
          </p>
        )}
      </button>
    </form>
  );
}
