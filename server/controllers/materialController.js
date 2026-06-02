const Material = require("../models/materialModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("../config/cloudinary");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");

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

  if (!material) {
    return next(new AppError("No material found with that ID", 404));
  }

  //   cloudinary delete logic
  try {
    await cloudinary.uploader.destroy(material.filePublicId);
  } catch (err) {
    // TODO: use custom alert
    console.error(err);
  }

  await Material.findByIdAndDelete(req.params.materialId);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
