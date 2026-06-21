const slugify = require("slugify");
const School = require("../models/schoolModel");
const Department = require("../models/departmentModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const cloudinary = require("../config/cloudinary");
const APIFeatures = require("../utils/apiFeatures");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");
const { filterObj } = require("../utils/filterObj");

// GET /api/v1/schools?page=1&limit=20
exports.getAllSchools = catchAsync(async (req, res, next) => {
  const query = School.find();
  const features = new APIFeatures(query, {
    ...req.query,
    sort: req.query.sort || "-stats.popularityScore",
  })
    .search(["name", "description", "location", "acronym", "aliases"])
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const schools = await features.query;

  // COUNT QUERY
  const countQuery = {};

  if (req.query.search) {
    countQuery.$or = [
      {
        name: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        acronym: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        aliases: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ];
  }

  const total = await School.countDocuments(countQuery);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;

  res.status(200).json({
    status: "success",
    total,
    page,
    totalPages: Math.ceil(total / limit),
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

  const features = new APIFeatures(School.find(queryObj), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const schools = await features.query;

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
  const user = await User.findById(req.user.id);

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
  if (!req.body || Object.keys(req.body).length <= 0) {
    return next(new AppError("Please provide data to create a school", 400));
  }

  const filteredBody = filterObj(
    req.body,
    "name",
    "acronym",
    "aliases",
    "description",
    "location",
    "website",
    "contactEmail",
    "contactPhone",
    "country",
  );

  filteredBody.createdBy = req.user.id;

  if (req.file) {
    const uploadedLogo = await uploadToCloudinary(
      req.file.buffer,
      "archiv/schoolLogos",
    );

    filteredBody.logo = {
      url: uploadedLogo.secure_url,
      public_id: uploadedLogo.public_id,
    };
  }

  if (filteredBody.aliases && typeof filteredBody.aliases === "string") {
    filteredBody.aliases = filteredBody.aliases
      .split(",")
      .map((alias) => alias.trim())
      .filter(Boolean);
  }

  const newSchool = await School.create(filteredBody);

  res.status(201).json({
    status: "success",
    data: {
      school: newSchool,
    },
  });
});

exports.updateSchool = catchAsync(async (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return next(new AppError("Please provide data to update", 400));
  }

  const school = await School.findById(req.params.id).select("+createdBy");

  if (!school) {
    return next(new AppError("No school found with that ID", 404));
  }

  if (
    school.createdBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new AppError("You don't have permission to update this school", 403),
    );
  }

  const filteredBody = filterObj(
    req.body || {},
    "name",
    "acronym",
    "aliases",
    "description",
    "location",
    "website",
    "contactEmail",
    "contactPhone",
    "country",
  );

  if (filteredBody.name) {
    filteredBody.slug = slugify(filteredBody.name, {
      lower: true,
      strict: true,
    });
  }

  if (req.file) {
    if (school.logo?.public_id) {
      await cloudinary.uploader.destroy(school.logo.public_id);
    }

    const uploaded = await uploadToCloudinary(
      req.file.buffer,
      "archiv/schoolLogos",
    );

    filteredBody.logo = {
      url: uploaded.secure_url,
      public_id: uploaded.public_id,
    };
  }

  if (filteredBody.aliases && typeof filteredBody.aliases === "string") {
    filteredBody.aliases = filteredBody.aliases
      .split(",")
      .map((alias) => alias.trim())
      .filter(Boolean);
  }

  filteredBody.updatedAt = Date.now();
  filteredBody.updatedBy = req.user.id;

  const updatedSchool = await School.findByIdAndUpdate(
    req.params.id,
    filteredBody,
    {
      new: true,
      runValidators: true,
    },
  );

  res.status(200).json({
    status: "success",
    data: {
      school: updatedSchool,
    },
  });
});

exports.deleteSchool = catchAsync(async (req, res, next) => {
  if (req.user.role !== "admin") {
    return next(
      new AppError("You are not authorized to delete this school", 403),
    );
  }

  const school = await School.findById(req.params.id);

  if (!school) {
    return next(new AppError("No school found with that ID", 404));
  }

  if (school.logo?.public_id) {
    try {
      await cloudinary.uploader.destroy(school.logo.public_id);
    } catch (err) {
      return next(
        new AppError("Error occurred while deleting school logo", 500),
      );
    }
  }

  await School.deleteOne({ _id: req.params.id });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
