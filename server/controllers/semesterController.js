const Semester = require("../models/semesterModel");
const catchAsync = require("../utils/catchAsync");

exports.getSemesters = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.levelId) {
    filter = { level: req.params.levelId };
  }

  const semesters = await Semester.find(filter);

  res.status(200).json({
    status: "success",
    data: { semesters },
  });
});
