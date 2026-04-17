const mongoose = require("mongoose");

const levelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please input a level"],
    },

    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "A level must belong to a department."],
    },
  },
  {
    timestamps: true,
  },
);

// prevent duplicates like "100 level" twice in same department
levelSchema.index({ department: 1, name: 1 }, { unique: true });

const Level = mongoose.model("Level", levelSchema);
module.exports = Level;
