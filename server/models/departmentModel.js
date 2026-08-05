const mongoose = require("mongoose");
const slugify = require("slugify");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A department must have a name"],
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
    },

    aliases: [
      {
        type: String,
        trim: true,
        uppercase: true,
      },
    ],

    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "A department must belong to a school"],
    },

    numberOfLevels: {
      type: Number,
      required: [true, "A department must have number of levels"],
      min: 1,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      select: false,
    },

    stats: {
      materialsCount: {
        type: Number,
        default: 0,
      },

      downloadsCount: {
        type: Number,
        default: 0,
      },

      savesCount: {
        type: Number,
        default: 0,
      },

      viewsCount: {
        type: Number,
        default: 0,
      },

      popularityScore: {
        type: Number,
        default: 0,
        index: true,
      },
    },
  },
  { timestamps: true },
);

// INDEXES
// Ensure unique department name within the same school
departmentSchema.index({ name: "text" });
departmentSchema.index({ school: 1 });
departmentSchema.index({ name: 1, school: 1 }, { unique: true });

departmentSchema.pre("save", function () {
  if (!this.isModified("name")) return;

  this.slug = slugify(this.name, {
    lower: true,
  });
});

const Department = mongoose.model("Department", departmentSchema);

module.exports = Department;
