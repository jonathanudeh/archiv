export interface Level {
  _id: string;
  name: string;
}

export interface Semester {
  _id: string;
  name: "first" | "second";
}

export interface UploadMaterialInput {
  title: string;
  description?: string;
  category: string;
  levelId: string;
  semester: string;
  file: File;

  onProgress?: (progress: number) => void;
}
