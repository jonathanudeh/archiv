const express = require("express");
const upload = require("../../middlewares/multerUpload");
const rateLimit = require("express-rate-limit");
const {
  getAllMaterials,
  deleteMaterial,
  getMaterial,
  uploadMaterial,
} = require("../../controllers/materialController");
const {
  protect,
  restrictTo,
  optionalProtect,
  requireVerified,
} = require("../../controllers/authController");
const { validateFileType } = require("../../middlewares/validateFileType");

const router = express.Router({ mergeParams: true });

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: "Upload limit reached. Wait an hour.",
});

router
  .route("/")
  .get(getAllMaterials)
  .post(
    protect,
    requireVerified,
    uploadLimiter,
    upload.single("file"),
    validateFileType,
    uploadMaterial,
  );

router
  .route("/:materialId")
  .get(optionalProtect, getMaterial)
  .delete(protect, requireVerified, deleteMaterial);

module.exports = router;
