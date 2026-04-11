const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Department = require("../models/departmentModel");
const School = require("../models/schoolModel");
const slugify = require("slugify");

// get all departments or all dept in a school if ID is provided
exports.getAllDepartments = catchAsync(async (req, res, next) => {
  let filter = {};

  if (req.params.schoolId)
    filter = {
      school: req.params.schoolId,
    };

  const departments = await Department.find(filter).populate("school");

  res.status(200).json({
    status: "success",
    results: departments.length,
    data: {
      departments,
    },
  });
});

// get a single department by id
exports.getDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findById(req.params.id).populate(
    "school",
  );

  if (!department) {
    return next(new AppError("Department not found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      department,
    },
  });
});

// create a department and assign it to a school
exports.createDepartment = catchAsync(async (req, res, next) => {
  // Allow nested routes to set the school ID
  if (!req.body.school) req.body.school = req.params.schoolId;

  // check if the school id is valid before creating the department
  if (!req.body.school) {
    return next(
      new AppError("School ID is required to create a department.", 400),
    );
  }

  // 3. Validate school exists
  const schoolExists = await School.findById(req.body.school);
  if (!schoolExists) {
    return next(new AppError("Invalid school ID", 400));
  }

  const name = req.body.name.trim().toLowerCase();
  // check if deparment already exists in the school before creating the department
  const existingDepartment = await Department.findOne({
    name,
    school: req.body.school,
  });

  if (existingDepartment) {
    return next(
      new AppError(
        "A department with that name already exists in this school.",
        400,
      ),
    );
  }

  const newDepartment = await Department.create({
    ...req.body,
    name,
  });

  res.status(201).json({
    status: "success",
    data: {
      department: newDepartment,
    },
  });
});

exports.updateDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    return next(new AppError("Department not found.", 404));
  }

  // Normalize name if updating
  if (req.body.name) {
    const name = req.body.name.trim().toLowerCase();

    // Check duplicate in SAME school
    const existingDepartment = await Department.findOne({
      name,
      school: dept.school,
      _id: { $ne: req.params.id },
    });

    if (existingDepartment) {
      return next(
        new AppError(
          "A department with that name already exists in this school.",
          400,
        ),
      );
    }

    req.body.name = name;
    req.body.slug = slugify(name, { lower: true, strict: true });
  }

  const updatedDepartment = await Department.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updatedDepartment) {
    return next(new AppError("Department not found.", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      department: updatedDepartment,
    },
  });
});

exports.deleteDepartment = catchAsync(async (req, res, next) => {
  const department = await Department.findByIdAndDelete(req.params.id);

  if (!department) {
    return next(new AppError("Department not found.", 404));
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
s;
