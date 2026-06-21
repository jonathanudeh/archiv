const User = require("../models/userModel");
const SavedMaterial = require("../models/savedModel");
const School = require("../models/schoolModel");
const Department = require("../models/departmentModel");
const Material = require("../models/materialModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cloudinary = require("../config/cloudinary");
const APIFeatures = require("../utils/apiFeatures");
const { uploadToCloudinary } = require("../utils/uploadToCloudinary");
const { filterObj } = require("../utils/filterObj");

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError("This route is not for password updates.", 400));
  }

  if (!req.body.role && !req.body.active) {
    return next(
      new AppError("Please provide at least one field to update.", 400),
    );
  }

  if (req.body.role === "admin") {
    return next(new AppError("You cannot assign admin role to a user.", 403));
  }

  if (req.body.role && !["user", "contributor"].includes(req.body.role)) {
    return next(new AppError("Invalid role.", 400));
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      role: req.body.role,
      active: req.body.active,
    },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!user) {
    return next(new AppError("No user found", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

//

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400,
      ),
    );
  }

  const filteredBody = filterObj(
    req.body,
    "name",
    "bio",
    "school",
    "department",
  );

  const user = await User.findById(req.user.id);

  if (filteredBody.school && user.school) {
    return next(new AppError("School cannot be changed once selected.", 400));
  }

  if (filteredBody.department && user.department) {
    return next(
      new AppError("Department cannot be changed once selected.", 400),
    );
  }

  await Promise.all([
    filteredBody.school
      ? School.findByIdAndUpdate(filteredBody.school, {
          $inc: {
            "stats.studentsCount": 1,
            "stats.popularityScore": 1,
          },
        })
      : Promise.resolve(),

    filteredBody.department
      ? Department.findByIdAndUpdate(filteredBody.department, {
          $inc: {
            "stats.studentsCount": 1,
            "stats.popularityScore": 1,
          },
        })
      : Promise.resolve(),
  ]);

  if (req.file) {
    if (user.photo?.public_id) {
      try {
        await cloudinary.uploader.destroy(user.photo.public_id);
      } catch (err) {
        console.error(err.message);
      }
    }

    const result = await uploadToCloudinary(req.file.buffer, "archiv/users");

    filteredBody.photo = {
      url: result.secure_url,
      public_id: result.public_id,
    };
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  })
    .populate({ path: "school", select: "name acronym" })
    .populate({ path: "department", select: "name" });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id)
    .populate({ path: "school", select: "name acronym" })
    .populate({ path: "department", select: "name" });

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.getMyActivity = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const [uploadedCount, savedCount, recentUploads, recentSaved] =
    await Promise.all([
      Material.countDocuments({
        uploadedBy: userId,
      }),

      SavedMaterial.countDocuments({
        user: userId,
      }),

      Material.find({
        uploadedBy: userId,
      })
        .select("title fileType createdAt")
        .sort("-createdAt")
        .limit(3)
        .lean(),

      SavedMaterial.find({
        user: userId,
      })
        .populate({
          path: "material",
          select: "title fileType createdAt",
        })
        .sort("-createdAt")
        .limit(3)
        .lean(),
    ]);

  res.status(200).json({
    status: "success",
    data: {
      stats: {
        uploadedCount,
        savedCount,
      },

      recentUploads,
      recentSaved,
    },
  });
});

exports.getMyMaterials = catchAsync(async (req, res, next) => {
  const materials = await Material.find({
    uploadedBy: req.user.id,
  })
    .sort("-createdAt")
    .populate("uploadedBy", "name photo");

  res.status(200).json({
    status: "success",
    results: materials.length,
    data: {
      materials,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;

  const user = await User.findById(id);

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  if (user.photo?.public_id) {
    await cloudinary.uploader.destroy(user.photo.public_id);
  }

  await User.findByIdAndUpdate(req.user.id, {
    active: false,
  });

  res.status(204).json({
    status: "success",
    data: null,
  });
});
