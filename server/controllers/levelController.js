const Level = require("../models/levelModel");
const catchAsync = require("../utils/catchAsync");

exports.getLevels = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.departmentId) {
    filter = { department: req.params.departmentId };
  }

  const levels = await Level.find(filter);

  res.status(200).json({
    status: "success",
    data: { levels },
  });
});
