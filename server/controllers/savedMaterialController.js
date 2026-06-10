const SavedMaterial = require("../models/savedModel");
const Material = require("../models/savedModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.saveMaterial = catchAsync(async (req, res, next) => {
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

  res.status(201).json({
    status: "success",
    data: {
      saved,
    },
  });
});

exports.unsaveMaterial = catchAsync(async (req, res, next) => {
  const saved = await SavedMaterial.findOneAndDelete({
    user: req.user.id,
    material: req.params.materialId,
  });

  if (!saved) {
    return next(new AppError("Saved material not found", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
