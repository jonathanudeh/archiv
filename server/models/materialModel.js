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
        "lecture-note",
        "past-question",
        "assignment",
        "project",
        "textbook",
        "lab-report",
        "other",
      ],
    },

    fileUrl: {
      type: String,
      required: true,
    },

    filePublicId: String,

    fileType: {
      type: String,
      required: true,
    },

    fileSize: Number,

    originalFileName: String,

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
materialSchema.index({ semester: 1 });
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
