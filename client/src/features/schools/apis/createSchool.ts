import API from "@/src/lib/axios";

import { CreateSchoolInput } from "../types/createSchool";

export async function createSchool(data: CreateSchoolInput) {
  const formData = new FormData();
  formData.append("name", data.name);

  if (data.acronym) {
    formData.append("acronym", data.acronym);
  }
  if (data.aliases) {
    formData.append("aliases", data.aliases);
  }
  if (data.description) {
    formData.append("description", data.description);
  }
  if (data.location) {
    formData.append("location", data.location);
  }
  if (data.country) {
    formData.append("country", data.country);
  }
  if (data.website) {
    formData.append("website", data.website);
  }
  if (data.contactEmail) {
    formData.append("contactEmail", data.contactEmail);
  }

  if (data.contactPhone) {
    formData.append("contactPhone", data.contactPhone);
  }
  if (data.logo) {
    formData.append("logo", data.logo);
  }

  const res = await API.post("/schools", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data.data.school;
}
