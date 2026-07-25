"use client";

import { ChangeEvent } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, School } from "lucide-react";

import { useCreateSchool } from "../hooks/useCreateSchool";
import {
  createSchoolSchema,
  CreateSchoolSchema,
} from "../schemas/createSchoolSchema";

export default function CreateSchoolForm() {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateSchoolSchema>({
    resolver: zodResolver(createSchoolSchema),
  });

  const selectedLogo = useWatch({ control, name: "logo" });

  const { createSchool, isCreatingSchool } = useCreateSchool();

  async function onSubmit(data: CreateSchoolSchema) {
    await createSchool({
      ...data,
      logo: data.logo,
    });

    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-6"
    >
      {/* Header */}

      <div>
        <h1 className="text-primary text-3xl font-bold">Create School</h1>

        <p className="mt-2 text-slate-500">Add a new school to Archiv.</p>
      </div>

      {/* Name */}

      <div>
        <label className="mb-2 block text-sm font-medium">School Name</label>

        <input
          {...register("name")}
          placeholder="University of Benin"
          className="w-full rounded-full border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
        />

        <p className="mt-1 text-sm text-red-500">{errors.name?.message}</p>
      </div>

      {/* Acronym */}

      <div>
        <label className="mb-2 block text-sm font-medium">Acronym</label>

        <input
          {...register("acronym")}
          placeholder="UNIBEN"
          className="w-full rounded-full border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
        />

        <p className="mt-1 text-sm text-red-500">{errors.acronym?.message}</p>
      </div>

      {/* Aliases */}

      <div>
        <label className="mb-2 block text-sm font-medium">Aliases</label>

        <input
          {...register("aliases")}
          placeholder="Former acronyms"
          className="w-full rounded-full border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
        />

        <p className="mt-1 text-xs text-slate-500">
          Separate aliases with commas.
        </p>
      </div>

      {/* Description */}

      <div>
        <label className="mb-2 block text-sm font-medium">Description</label>

        <textarea
          rows={4}
          {...register("description")}
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
        />

        <p className="mt-1 text-sm text-red-500">
          {errors.description?.message}
        </p>
      </div>

      {/* Location */}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">Location</label>

          <input
            {...register("location")}
            placeholder="Benin City"
            className="w-full rounded-full border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.location?.message}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">Country</label>

          <input
            {...register("country")}
            placeholder="Nigeria"
            className="w-full rounded-full border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">{errors.country?.message}</p>
        </div>
      </div>

      {/* Website */}

      <div>
        <label className="mb-2 block text-sm font-medium">Website</label>

        <input
          {...register("website")}
          placeholder="https://uniben.edu"
          className="w-full rounded-full border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
        />

        <p className="mt-1 text-sm text-red-500">{errors.website?.message}</p>
      </div>

      {/* Contact */}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium">
            Contact Email
          </label>

          <input
            {...register("contactEmail")}
            placeholder="info@school.edu"
            className="w-full rounded-full border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.contactEmail?.message}
          </p>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Contact Phone
          </label>

          <input
            {...register("contactPhone")}
            placeholder="+234..."
            className="w-full rounded-full border border-slate-300 px-4 py-3 transition outline-none focus:border-blue-500"
          />

          <p className="mt-1 text-sm text-red-500">
            {errors.contactPhone?.message}
          </p>
        </div>
      </div>

      {/* Logo */}

      <div>
        <label className="mb-2 block text-sm font-medium">School Logo</label>

        <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 p-8 transition hover:border-blue-500">
          <UploadCloud className="mb-3 h-8 w-8 text-slate-500" />

          <span className="font-medium">Click to upload logo</span>

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0];

              if (!file) return;

              setValue("logo", file);
            }}
          />
        </label>

        {selectedLogo && (
          <div className="mt-3 flex items-center gap-2 rounded-full bg-slate-50 p-3">
            <School className="h-4 w-4" />
            <span>{selectedLogo.name}</span>
          </div>
        )}
      </div>

      {/* Submit */}

      <button
        disabled={isCreatingSchool}
        className="bg-primary hover:bg-primary/90 w-full rounded-full py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isCreatingSchool ? "Creating School..." : "Create School"}
      </button>
    </form>
  );
}
