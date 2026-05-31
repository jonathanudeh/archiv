const Material = require("../models/materialModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");

exports.getAllMaterials = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: "success",
    result: 10,
    data: "",
  });
});

exports.getMaterial = catchAsync(async (req, res, next) => {});

exports.uploadMaterial = catchAsync(async (req, res, next) => {
  const semesterId = req.params.semesterId;

  if (!req.file) {
    return next(new AppError("Please upload a file", 400));
  }

  const uploadResult = await uploadToCloudinary(
    req.file.buffer,
    "archiv/materials",
  );

  const material = await Material.create({
    title: req.body.title,
    description: req.body.description,

    fileUrl: uploadResult.secure_url,

    filePublicId: uploadResult.public_id,

    fileType: req.file.mimetype,

    fileSize: req.file.size,

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

exports.deleteMaterial = catchAsync(async (req, res, next) => {});
