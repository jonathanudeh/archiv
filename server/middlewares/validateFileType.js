const { fileTypeFromBuffer } = require("file-type");

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
