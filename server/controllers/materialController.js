const Material = require("../models/materialModel");
const School = require("../models/schoolModel");
const Department = require("../models/departmentModel");
const Level = require("../models/levelModel");
const Semester = require("../models/semesterModel");
const User = require("../models/userModel");
const SavedMaterial = require("../models/savedModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const APIFeatures = require("../utils/apiFeatures");
const cloudinary = require("../config/cloudinary");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");
const { convertToPdf } = require("../utils/convertToPdf");

const getFolder = (mimeType) => {
  if (mimeType.includes("pdf")) return "archiv/materials/pdf";

  if (mimeType.startsWith("image")) return "archiv/materials/images";

  return "archiv/materials/documents";
};

const getResourceType = (mimeType) => {
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  return "raw";
};

exports.getMaterial = catchAsync(async (req, res, next) => {
  const material = await Material.findById(req.params.materialId)
    .populate({
      path: "uploadedBy",
      select: "name photo",
    })
    .populate({
      path: "school",
      select: "name acronym",
    })
    .populate({
      path: "department",
      select: "name",
    })
    .populate({
      path: "level",
      select: "name",
    })
    .populate({
      path: "semester",
      select: "name",
    });

  if (!material) {
    return next(new AppError("No material found with that ID", 404));
  }

  await Promise.all([
    School.findByIdAndUpdate(material.school, {
      $inc: {
        "stats.viewsCount": 1,
        "stats.popularityScore": 1,
      },
    }),

    Department.findByIdAndUpdate(material.department, {
      $inc: {
        "stats.viewsCount": 1,
        "stats.popularityScore": 1,
      },
    }),
  ]);

  const isSaved = await SavedMaterial.exists({
    user: req.user?.id,
    material: material._id,
  });

  const materialObj = material.toObject();
  materialObj.isSaved = !!isSaved;

  res.status(200).json({
    status: "success",
    data: {
      material: materialObj,
    },
  });
});

exports.getAllMaterials = catchAsync(async (req, res, next) => {
  let filter = {};

  // department
  if (req.params.departmentId) {
    filter.department = req.params.departmentId;
  }

  // level
  if (req.query.level) {
    filter.level = req.query.level;
  }

  // semester
  if (req.params.semesterId) {
    filter.semester = req.params.semesterId;
  }
  if (req.query.semester && !filter.semester) {
    filter.semester = req.query.semester;
  }

  // catergory
  if (req.query.category) {
    filter.category = req.query.category;
  }

  const features = new APIFeatures(Material.find(filter), req.query)
    .search(["title", "category"])
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const materials = await features.query;

  //
  // COUNT
  //

  const countQuery = {
    ...filter,
  };

  if (req.query.category) {
    countQuery.category = req.query.category;
  }

  if (req.query.search) {
    countQuery.$or = [
      {
        title: {
          $regex: req.query.search,
          $options: "i",
        },
      },
      {
        category: {
          $regex: req.query.search,
          $options: "i",
        },
      },
    ];
  }

  const total = await Material.countDocuments(countQuery);
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const totalPages = Math.ceil(total / limit);

  res.status(200).json({
    status: "success",
    result: materials.length,
    total,
    page,
    totalPages,
    data: {
      materials,
    },
  });
});

exports.uploadMaterial = catchAsync(async (req, res, next) => {
  if (!req.file) {
    return next(new AppError("Please upload a file", 400));
  }
  if (!req.body.levelId) {
    return next(new AppError("Please select a level.", 400));
  }
  if (!req.body.semester) {
    return next(new AppError("Please select a semester.", 400));
  }
  const [semester, level, user] = await Promise.all([
    Semester.findById(req.body.semester),
    Level.findById(req.body.levelId),
    User.findById(req.user.id),
  ]);

  if (!user) {
    return next(new AppError("No user found.", 404));
  }
  if (!level) {
    return next(new AppError("Invalid level", 404));
  }
  if (!semester) {
    return next(new AppError("Invalid semester", 404));
  }

  if (!req.user.isVerified) {
    return next(new AppError("Verify your email before uploading.", 403));
  }

  if (!user.school || !user.department) {
    return next(
      new AppError("Complete your profile before uploading materials.", 400),
    );
  }

  if (level.department.toString() !== user.department.toString()) {
    return next(new AppError("Invalid level selected.", 400));
  }
  if (semester.level.toString() !== level._id.toString()) {
    return next(new AppError("Invalid semester selected.", 400));
  }

  // Convert file if necessary
  const convertedFile = await convertToPdf(req.file);

  const folder = getFolder(convertedFile.mimetype);
  const resourceType = getResourceType(convertedFile.mimetype);

  const uploadResult = await uploadToCloudinary(
    convertedFile.buffer,
    folder,
    resourceType,
    convertedFile.filename,
  );

  const material = await Material.create({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,

    fileUrl: uploadResult.secure_url,
    filePublicId: uploadResult.public_id,

    fileType: convertedFile.mimetype,
    fileSize: convertedFile.buffer.length,

    originalFileName: req.file.originalname,
    wasConverted: convertedFile.wasConverted,

    school: user.school,
    department: user.department,
    level: level._id,
    semester: semester._id ?? req.body.semester,
    uploadedBy: req.user.id,
  });

  await Promise.all([
    School.findByIdAndUpdate(user.school, {
      $inc: {
        "stats.materialsCount": 1,
        "stats.popularityScore": 5,
      },
    }),

    Department.findByIdAndUpdate(user.department, {
      $inc: {
        "stats.materialsCount": 1,
        "stats.popularityScore": 5,
      },
    }),
  ]);

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

  if (
    material.uploadedBy.toString() !== req.user.id &&
    req.user.role !== "admin"
  ) {
    return next(
      new AppError("You do not have permission to delete this material", 403),
    );
  }

  //   cloudinary delete logic
  try {
    await cloudinary.uploader.destroy(material.filePublicId);
  } catch (err) {
    return next(new AppError("Failed to delete file from cloud storage", 500));
  }

  await Material.findByIdAndDelete(req.params.materialId);

  await Promise.all([
    School.findByIdAndUpdate(material.school, {
      $inc: {
        "stats.materialsCount": -1,
        "stats.popularityScore": -5,
      },
    }),

    Department.findByIdAndUpdate(material.department, {
      $inc: {
        "stats.materialsCount": -1,
        "stats.popularityScore": -5,
      },
    }),
  ]);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
