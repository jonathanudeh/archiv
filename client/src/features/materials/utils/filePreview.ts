export function getPreviewType(fileType: string) {
  if (fileType.includes("pdf")) {
    return "pdf";
  }

  if (fileType.startsWith("image/")) {
    return "image";
  }

  if (fileType.includes("word") || fileType.includes("document")) {
    return "doc";
  }

  if (fileType.includes("presentation") || fileType.includes("powerpoint")) {
    return "ppt";
  }

  if (fileType.includes("excel") || fileType.includes("spreadsheet")) {
    return "sheet";
  }

  return "unknown";
}
