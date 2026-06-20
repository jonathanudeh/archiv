import ArchivFileIcon from "../components/material/icons/ArchivFileIcon";
import DocumentIcon from "../components/material/icons/DocumentIcon";
import ImageFileIcon from "../components/material/icons/ImageFileIcon";

export function getFileMeta(fileType: string) {
  const type = fileType?.toLowerCase() ?? "";

  if (type.includes("pdf")) {
    return {
      icon: DocumentIcon,
      label: "PDF",
    };
  }

  if (type.includes("word") || type.includes("document")) {
    return {
      icon: DocumentIcon,
      label: "DOCX",
    };
  }

  if (type.startsWith("image/")) {
    return {
      icon: ImageFileIcon,
      bg: "bg-purple-100",
      label: "IMG",
    };
  }

  return {
    icon: ArchivFileIcon,
    bg: "bg-slate-100",
    label: "FILE",
  };
}
