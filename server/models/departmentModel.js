const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A department must have a name"],
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
    },

    school: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
      required: [true, "A department must belong to a school"],
    },

    logo: String,
    color: String,
  },
  { timestamps: true },
);
