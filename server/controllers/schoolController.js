const School = require("../models/schoolModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllSchools = catchAsync(async (req, res, next) => {
  const schools = await School.find();

  res.status(200).json({
    status: "success",
    results: schools.length,
    data: {
      schools,
    },
  });
});

exports.getSchoolsByLocation = catchAsync(async (req, res, next) => {
  const queryObj = { ...req.query };
  const excludedFields = ["page", "sort", "limit", "fields"];
  excludedFields.forEach((el) => delete queryObj[el]);

  const schools = await School.find(queryObj);

  res.status(200).json({
    status: "success",
    results: schools.length,
    data: {
      schools,
    },
  });
});

exports.getSchool = catchAsync(async (req, res, next) => {
  const school = await School.findById(req.params.id);

  if (!school) {
    return next(new AppError("No school found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      school,
    },
  });
});

exports.getSchoolBySlug = catchAsync(async (req, res, next) => {
  const school = await School.findOne({ slug: req.params.slug });

  if (!school) {
    return next(new AppError("No school found with that slug", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      school,
    },
  });
});

exports.createSchool = catchAsync(async (req, res, next) => {
  const newSchool = await School.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      school: newSchool,
    },
  });
});

exports.updateSchool = catchAsync(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = slugify(req.body.name, {
      lower: true,
      strict: true,
    });
  }

  const school = await School.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!school) {
    return next(new AppError("No school found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      school,
    },
  });
});

exports.deleteSchool = catchAsync(async (req, res, next) => {
  const school = await School.findByIdAndDelete(req.params.id);

  if (!school) {
    return next(new AppError("No school found with that ID", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
