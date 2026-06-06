const User = require("../models/userModel");
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

// might remove
// exports.createUser = (req, res) => {
//   res.status(500).json({
//     status: "error",
//     message: "This route is not yet defined!",
//   });
// };

//
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
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const { id } = req.user;
  const user = await User.findById(id);

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
