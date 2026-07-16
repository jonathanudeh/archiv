const SavedMaterial = require("../models/savedModel");
const School = require("../models/schoolModel");
const Department = require("../models/departmentModel");
const Material = require("../models/materialModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const AnalyticsService = require("../services/analyticsService");

exports.saveMaterial = catchAsync(async (req, res, next) => {
  if (!req.user.id) {
    return next(new AppError("Log in to save material", 404));
  }
  const material = await Material.findById(req.params.materialId);

  if (!material) {
    return next(new AppError("Material not found", 404));
  }

  const existing = await SavedMaterial.findOne({
    user: req.user.id,
    material: material._id,
  });

  if (existing) {
    return next(new AppError("Material already saved", 400));
  }

  const saved = await SavedMaterial.create({
    user: req.user.id,
    material: material._id,
  });

  await AnalyticsService.trackSave(material);

  res.status(201).json({
    status: "success",
    data: {
      saved,
    },
  });
});

exports.unsaveMaterial = catchAsync(async (req, res, next) => {
  const material = await Material.findById(req.params.materialId);
  const saved = await SavedMaterial.findOneAndDelete({
    user: req.user.id,
    material: req.params.materialId,
  });

  if (!saved) {
    return next(new AppError("Saved material not found", 404));
  }

  await AnalyticsService.trackUnsave(material);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getMySavedMaterials = catchAsync(async (req, res, next) => {
  const savedMaterials = await SavedMaterial.find({
    user: req.user.id,
  })
    .populate({
      path: "material",
      populate: {
        path: "uploadedBy",
        select: "name photo",
      },
    })
    .sort("-createdAt");

  res.status(200).json({
    status: "success",
    results: savedMaterials.length,
    data: {
      savedMaterials,
    },
  });
});
