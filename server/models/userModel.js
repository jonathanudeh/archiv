const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A user must have a name"],
    trim: true,
    minlength: [2, "A user's name must have more or equal than 2 characters"],
    maxlength: [
      100,
      "A user's name must have less or equal than 100 characters",
    ],
  },

  email: {
    type: String,
    required: [true, ""],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },

  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "A password must have more or equal than 8 characters"],
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on CREATE and SAVE!!!
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords are not the same!",
    },
  },

  role: {
    type: String,
    enum: ["user", "contributor", "admin"],
    default: "user",
  },

  photo: String,
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  passwordChangedAt: Date,
});

userSchema.pre("save", async function (next) {
  // Only run if password was modified
  if (!this.isModified("password")) return next();

  // Hash password
  this.password = await bcrypt.hash(this.password, 12);

  // Remove passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
