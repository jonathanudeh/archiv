"use client";

import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAuth } from "@/src/providers/AuthProvider";
import { isPopulatedSchool } from "@/src/types/user";
import { School } from "@/src/features/schools/types/schools";

import { MiniSpinner } from "@/src/components/ui/MiniSpinner";

import LockedSchoolCard from "./LockedSchoolCard";

import {
  createDepartmentSchema,
  CreateDepartmentSchema,
} from "../schemas/createDepartmentSchema";

import { useCreateDepartment } from "../hooks/useCreateDepartment";
import SearchableSchoolSelect from "@/src/components/ui/SearchableSchoolSelect";

export default function CreateDepartmentForm() {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  const school = isPopulatedSchool(user?.school) ? user.school : undefined;

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateDepartmentSchema>({
    resolver: zodResolver(createDepartmentSchema),
    defaultValues: {
      name: "",
      school: "",
      numberOfLevels: 4,
    },
  });

  const { createDepartment, isCreatingDepartment } = useCreateDepartment();

  const selectedSchoolId = useWatch({ control, name: "school" });

  useEffect(() => {
    if (!isAdmin && school) {
      setValue("school", school._id, {
        shouldValidate: true,
      });
    }
  }, [isAdmin, school, setValue]);

  async function onSubmit(data: CreateDepartmentSchema) {
    await createDepartment(data);

    reset({
      name: "",
      school: !isAdmin && school ? school._id : "",
      numberOfLevels: 4,
    });
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-3xl space-y-6"
    >
      <div>
        <h1 className="text-primary text-2xl font-bold">Create Department</h1>

        <p className="mt-1 text-sm text-slate-500">
          Add a new department to Archiv.
        </p>
      </div>

      {/* SCHOOL */}

      <div>
        <label className="mb-2 block text-sm font-medium">School</label>

        {isAdmin ? (
          <SearchableSchoolSelect
            value={selectedSchoolId}
            onChange={(school: School) =>
              setValue("school", school._id, {
                shouldValidate: true,
              })
            }
          />
        ) : (
          school && <LockedSchoolCard schoolName={school.name} />
        )}

        <p className="mt-1 text-sm text-red-500">{errors.school?.message}</p>
      </div>

      {/* DEPARTMENT NAME */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Department Name
        </label>

        <input
          {...register("name")}
          placeholder="Computer Science"
          className="w-full rounded-full border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <p className="mt-1 text-sm text-red-500">{errors.name?.message}</p>
      </div>

      {/* NUMBER OF LEVELS */}

      <div>
        <label className="mb-2 block text-sm font-medium">
          Number of Levels
        </label>

        <select
          {...register("numberOfLevels", {
            valueAsNumber: true,
          })}
          className="w-full rounded-full border border-slate-300 px-4 py-3"
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
        </select>

        <p className="mt-1 text-sm text-red-500">
          {errors.numberOfLevels?.message}
        </p>
      </div>

      {/* SUBMIT */}

      <button
        type="submit"
        disabled={isCreatingDepartment}
        className="bg-primary hover:bg-primary/90 flex w-full items-center justify-center rounded-full py-3 font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isCreatingDepartment ? <MiniSpinner /> : "Create Department"}
      </button>
    </form>
  );
}
