const mongoose = require("mongoose");
const slugify = require("slugify");

const schoolSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A school must have a name"],
      unique: true,
      trim: true,
      minlength: [5, "A school name must have more or equal than 5 characters"],
      maxlength: [
        50,
        "A school name must have less or equal than 50 characters",
      ],
    },
    slug: {
      type: String,
      unique: true,
    },
    logo: {
      type: String,
      required: [true, "A school must have a logo"],
    },
    primaryColor: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [
        500,
        "A school's description must have less or equal than 500 characters",
      ],
    },
    location: {
      type: String,
      trim: true,
      maxlength: [
        100,
        "A school's location must have less or equal than 100 characters",
      ],
    },
    website: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);

schoolSchema.pre("save", function () {
  if (!this.isModified("name")) return;

  this.slug = slugify(this.name, {
    lower: true,
  });
});

const School = mongoose.model("School", schoolSchema);

module.exports = School;
