// models/semesterModel.js
const mongoose = require("mongoose");

const semesterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["first", "second"],
      required: true,
    },

    level: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Level",
      required: true,
    },
  },
  { timestamps: true },
);

semesterSchema.index({ level: 1, name: 1 }, { unique: true });

const Semester = mongoose.model("Semester", semesterSchema);
module.exports = Semester;
