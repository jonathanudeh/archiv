"use client";

import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, FileText, School, GraduationCap } from "lucide-react";
import { useAuth } from "@/src/providers/AuthProvider";
import { isPopulatedDepartment, isPopulatedSchool } from "@/src/types/user";
import { useLevels } from "../hooks/useLevels";
import { useSemesters } from "../hooks/useSemesters";
import {
  uploadMaterialSchema,
  UploadMaterialSchema,
} from "../schema/uploadMaterialSchema";
import { useUploadMaterial } from "../hooks/useUpload";

export default function UploadMaterialForm() {
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();

  const departmentId = isPopulatedDepartment(user?.department)
    ? user?.department?._id
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
  });

  const selectedLevel = useWatch({ control, name: "levelId" });
  const selectedFile = useWatch({ control, name: "file" });
  const { levels } = useLevels(departmentId);
  const { semesters } = useSemesters(departmentId, selectedLevel);
  const { uploadMaterial, isUploading } = useUploadMaterial();

  useEffect(() => {
    resetField("semester");
  }, [selectedLevel, resetField]);

  async function onSubmit(data: UploadMaterialSchema) {
    await uploadMaterial({
      ...data,
      file: data.file,
      onProgress: setProgress,
    });

    reset();
    setProgress(0);
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
          Upload materials to your department.
          <span className="block text-amber-500">
            (Make sure to finish editing your profile to be eligible for
            uploads)
          </span>
        </p>
      </div>

      {/* Locked School + Department */}

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <School className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-medium text-slate-500 uppercase">
              School
            </span>
          </div>

          <p className="font-medium text-slate-800">
            {isPopulatedSchool(user?.school)
              ? user?.school?.name
              : "No school selected"}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <div className="mb-2 flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-slate-500" />
            <span className="text-xs font-medium text-slate-500 uppercase">
              Department
            </span>
          </div>

          <p className="font-medium text-slate-800">
            {isPopulatedDepartment(user?.department)
              ? user?.department?.name
              : "No department selected"}
          </p>
        </div>
      </div>

      {/* Title */}

      <div>
        <label className="mb-2 block text-sm font-medium">Title</label>

        <input
          {...register("title")}
          placeholder="e.g CSC 202 Data Structures Note"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
        />

        <p className="mt-1 text-sm text-red-500">{errors.title?.message}</p>
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block text-sm font-medium">Description</label>

        <textarea
          {...register("description")}
          rows={4}
          placeholder="Brief description..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
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
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
        >
          <option value="">Select category</option>
          <option value="material">material</option>
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

      {/* Level + Semester */}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Level</label>

          <select
            {...register("levelId")}
            className="w-full rounded-xl border border-slate-300 px-4 py-3"
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
            className="w-full rounded-xl border border-slate-300 px-4 py-3 disabled:bg-slate-100"
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

      {/* File Upload */}

      <div>
        <label className="mb-2 block text-sm font-medium">Material File</label>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-8 transition hover:border-blue-500">
          <UploadCloud className="mb-3 h-8 w-8 text-slate-500" />

          <span className="font-medium">Click to select file</span>

          <span className="mt-1 text-sm text-slate-500">
            PDF, IMAGE, DOCX, PPTX, XLSX, etc...
          </span>

          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png,.webp"
            onChange={(e) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setValue("file", file, {
                shouldValidate: true,
              });
            }}
          />
        </label>

        {selectedFile && (
          <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-50 p-3">
            <FileText className="h-4 w-4" />

            <span className="text-sm">{selectedFile.name}</span>
          </div>
        )}

        <p className="mt-1 text-sm text-red-500">
          {errors.file?.message as string}
        </p>
      </div>

      {/* Submit and progress */}
      {isUploading && (
        <div className="mt-4">
          <div className="h-2 overflow-hidden rounded-full bg-slate-200">
            <div
              className="bg-primary h-full transition-all"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          <p className="mt-2 text-sm text-slate-500">{progress}% uploaded</p>
        </div>
      )}

      <button
        type="submit"
        disabled={isUploading}
        className="bg-primary hover:bg-primary/90 w-full rounded-xl py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isUploading
          ? progress < 100
            ? `Uploading ${progress}%`
            : "Processing..."
          : "Upload Material"}
      </button>
    </form>
  );
}
