const express = require("express");
const {
  saveMaterial,
  unsaveMaterial,
} = require("../../controllers/savedMaterialController");
const { protect } = require("../../controllers/authController");

const router = express.Router();

router.post("/:materialId", protect, saveMaterial);
router.delete("/:materialId", protect, unsaveMaterial);

module.exports = router;
