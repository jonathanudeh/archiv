const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const cloudinary = require("../config/cloudinary");
const APIFeatures = require("../utils/apiFeatures");
const uploadToCloudinary = require("../utils/uploadToCloudinary");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.id) {
    filter = { user: req.params.id };
  }

  const features = new APIFeatures(User.find(filter), req.query)
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

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined!",
  });
};

//
//

// confirm email isnt already taken
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400,
      ),
    );
  }

  const filteredBody = filterObj(req.body, "name");
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

  // or
  // await User.findByIdAndUpdate(id, { active: false })

  if (!user) {
    return next(new AppError("No user found with that ID", 404));
  }

  user.active = false;
  await User.save();

  res.status(204).json({
    status: "success",
    data: null,
  });
});
