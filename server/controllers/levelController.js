const Level = require("../models/levelModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getLevels = catchAsync(async (req, res, next) => {
  const filter = {};

  if (req.params.departmentId) {
    filter.department = req.params.departmentId;
  }

  const features = new APIFeatures(
    Level.find(filter).populate({
      path: "department",
      select: "name slug",
    }),
    req.query,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const levels = await features.query;

  res.status(200).json({
    status: "success",
    results: levels.length,
    data: {
      levels,
    },
  });
});
