const { fileTypeFromBuffer } = require("file-type");
const AppError = require("../utils/appError");

const allowedMimeTypes = [
  "application/pdf",

  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",

  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",

  "image/jpeg",
  "image/png",
  "image/webp",
];

exports.validateFileType = async (req, res, next) => {
  if (!req.file) return next();

  const detectedType = await fileTypeFromBuffer(req.file.buffer);

  if (!detectedType) {
    return next(new AppError("Unable to determine file type", 400));
  }

  if (!allowedMimeTypes.includes(detectedType.mime)) {
    return next(new AppError("Invalid file type", 400));
  }

  next();
};
