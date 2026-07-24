const libre = require("libreoffice-convert");
const AppError = require("../utils/appError");
// const { promisify } = require("util");

// const convert = promisify(libre.convert);
const convert = libre.convert;

exports.convertToPdf = async (file) => {
  const mime = file.mimetype;

  // PDFs stay as they are
  if (mime === "application/pdf") {
    return {
      buffer: file.buffer,
      mimetype: mime,
      filename: file.originalname,
      wasConverted: false,
    };
  }

  // Images stay as they are
  if (mime.startsWith("image/")) {
    return {
      buffer: file.buffer,
      mimetype: mime,
      filename: file.originalname,
      wasConverted: false,
    };
  }

  // Convert Office documents
  try {
    const pdfBuffer = await convert(file.buffer, ".pdf", undefined);

    const filename = file.originalname.replace(/\.[^/.]+$/, "") + ".pdf";

    return {
      buffer: pdfBuffer,
      mimetype: "application/pdf",
      filename,
      wasConverted: true,
    };
  } catch (err) {
    throw new AppError("Failed to convert document to PDF.", 500);
  }
};
