const mongoose = require("mongoose");
const slugify = require("slugify");

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    slug: String,

    description: {
      type: String,
      trim: true,
    },

    category: {
      type: String,
      enum: [
        "material",
        "lecture note",
        "past question",
        "assignment",
        "project",
        "textbook",
        "lab report",
        "other",
      ],
      required: true,
    },

    fileUrl: {
      type: String,
    },

    filePublicId: String,

    fileKey: {
      type: String,
    },

    fileType: {
      type: String,
      required: true,
    },

    fileSize: Number,

    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: true,
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
    },

    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },

    semester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tags: [String],

    originalFileName: {
      type: String,
      required: true,
    },

    wasConverted: {
      type: Boolean,
      default: false,
    },

    downloadCount: {
      type: Number,
      default: 0,
    },

    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// INDEXES for faster queries
materialSchema.index({
  school: 1,
  department: 1,
  level: 1,
  semester: 1,
  createdAt: -1,
});
materialSchema.index({ uploadedBy: 1 });
materialSchema.index({ title: "text", description: "text" });

materialSchema.pre("save", function () {
  if (!this.isModified("title")) return;

  this.slug = slugify(this.title, {
    lower: true,
  });
});

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
