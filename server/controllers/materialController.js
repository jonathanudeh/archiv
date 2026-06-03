const Material = require("../models/materialModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("../config/cloudinary");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");

const getFolder = (mimeType) => {
  if (mimeType.includes("pdf")) return "archiv/materials/pdf";

  if (mimeType.startsWith("image")) return "archiv/materials/images";

  return "archiv/materials/documents";
};

exports.getMaterial = catchAsync(async (req, res, next) => {
  const material = await Material.findById(req.params.materialId);

  if (!material) {
    return next(new AppError("No material found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      material,
    },
  });
});

exports.getAllMaterials = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.semesterId)
    filter = {
      semester: req.params.semesterId,
    };

  const features = new APIFeatures(Material.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const materials = await features.query;

  res.status(200).json({
    status: "success",
    result: materials.length,
    data: {
      materials,
    },
  });
});

exports.uploadMaterial = catchAsync(async (req, res, next) => {
  const semesterId = req.params.semesterId;

  const semester = await Semester.findById(semesterId);

  if (!semester) {
    return next(new AppError("Invalid semester", 404));
  }

  if (!req.user.isVerified) {
    return next(new AppError("Verify your email before uploading.", 403));
  }

  if (!req.file) {
    return next(new AppError("Please upload a file", 400));
  }

  const folder = getFolder(req.file.mimetype);
  const uploadResult = await uploadToCloudinary(req.file.buffer, folder);

  const material = await Material.create({
    title: req.body.title,
    description: req.body.description,

    fileUrl: uploadResult.secure_url,

    filePublicId: uploadResult.public_id,

    fileType: req.file.mimetype,

    fileSize: req.file.size,

    originalFileName: req.file.originalname,

    semester: semesterId,

    uploadedBy: req.user.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      material,
    },
  });
});

exports.deleteMaterial = catchAsync(async (req, res, next) => {
  const material = await Material.findById(req.params.materialId);

  if (
    material.uploadedBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new AppError("You do not have permission to delete this material", 403),
    );
  }

  if (!material) {
    return next(new AppError("No material found with that ID", 404));
  }

  //   cloudinary delete logic
  try {
    await cloudinary.uploader.destroy(material.filePublicId);
  } catch (err) {
    return next(new AppError("Failed to delete file from cloud storage", 500));
  }

  await Material.findByIdAndDelete(req.params.materialId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
