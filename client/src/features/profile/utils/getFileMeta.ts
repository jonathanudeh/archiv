import {
  FileText,
  FileSpreadsheet,
  FileImage,
  FileArchive,
  Presentation,
} from "lucide-react";

export function getFileMeta(fileType: string) {
  if (fileType.includes("pdf")) {
    return {
      icon: FileText,
      bg: "bg-red-100",
      iconColor: "text-red-600",
      label: "PDF",
    };
  }

  if (fileType.includes("word") || fileType.includes("document")) {
    return {
      icon: FileText,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
      label: "DOCX",
    };
  }

  if (fileType.includes("presentation") || fileType.includes("powerpoint")) {
    return {
      icon: Presentation,
      bg: "bg-orange-100",
      iconColor: "text-orange-600",
      label: "PPT",
    };
  }

  if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
    return {
      icon: FileSpreadsheet,
      bg: "bg-green-100",
      iconColor: "text-green-600",
      label: "XLSX",
    };
  }

  if (fileType.startsWith("image/")) {
    return {
      icon: FileImage,
      bg: "bg-purple-100",
      iconColor: "text-purple-600",
      label: "IMG",
    };
  }

  return {
    icon: FileArchive,
    bg: "bg-slate-100",
    iconColor: "text-slate-600",
    label: "FILE",
  };
}
