const mongoose = require("mongoose");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");
const Department = require("../models/departmentModel");
const School = require("../models/schoolModel");
const slugify = require("slugify");
const Level = require("../models/levelModel");
const Semester = require("../models/semesterModel");

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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // 1. Allow nested route to set school ID
    if (!req.body.school) req.body.school = req.params.schoolId;

    if (!req.body.school) {
      throw new AppError("School ID is required to create a department.", 400);
    }

    // 2. Validate school exists
    const schoolExists = await School.findById(req.body.school).session(
      session,
    );

    if (!schoolExists) {
      throw new AppError("Invalid school ID", 400);
    }

    // 3. Normalize name
    const name = req.body.name.trim().toLowerCase();
    const slug = slugify(name, { lower: true, strict: true });

    // 4. Check duplicate department in same school
    const existingDepartment = await Department.findOne({
      name,
      school: req.body.school,
    }).session(session);

    if (existingDepartment) {
      throw new AppError(
        "A department with that name already exists in this school.",
        400,
      );
    }

    // 5. Create Department (must use array with session)
    const [newDepartment] = await Department.create(
      [
        {
          ...req.body,
          name,
          slug,
        },
      ],
      { session },
    );

    // 6. AUTO CREATE LEVELS
    const levelsToCreate = [];

    for (let i = 1; i <= newDepartment.numberOfLevels; i++) {
      levelsToCreate.push({
        name: `${i * 100}`, // 100, 200...
        department: newDepartment._id,
      });
    }

    const createdLevels = await Level.insertMany(levelsToCreate, {
      session,
    });

    // 7. AUTO CREATE SEMESTERS
    const semestersToCreate = [];

    createdLevels.forEach((level) => {
      semestersToCreate.push(
        { name: "first", level: level._id },
        { name: "second", level: level._id },
      );
    });

    await Semester.insertMany(semestersToCreate, { session });

    // 8. COMMIT TRANSACTION
    await session.commitTransaction();
    session.endSession();

    // 9. RESPONSE
    res.status(201).json({
      status: "success",
      data: {
        department: newDepartment,
      },
    });
  } catch (err) {
    // roll back everything
    await session.abortTransaction();
    session.endSession();

    return next(err);
  }
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
      school: department.school,
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
