import { Department } from "./department";
import { School } from "./school";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "contributor" | "admin";
  isVerified: boolean;
  bio?: string;
  photo?: {
    url: string;
    public_id?: string;
  };

  // relations (ObjectIds from MongoDB)
  school?: string | School;
  department?: string | Department;
  materialsUploaded: number;

  // timestamps
  createdAt?: string;
  updatedAt?: string;
}

export function isPopulatedSchool(
  school: string | School | undefined,
): school is School {
  return typeof school !== "string" && !!school;
}

export function isPopulatedDepartment(
  department: string | Department | undefined,
): department is Department {
  return !!department && typeof department !== "string";
}
