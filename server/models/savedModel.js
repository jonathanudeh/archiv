const mongoose = require("mongoose");

const savedMaterialSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

savedMaterialSchema.index({ user: 1, material: 1 }, { unique: true });

const SavedMaterial = mongoose.model("SavedMaterial", savedMaterialSchema);

module.exports = SavedMaterial;
