const express = require("express");
const upload = require("../../middlewares/multerUpload");
const {
  getAllMaterials,
  deleteMaterial,
  getMaterial,
  uploadMaterial,
} = require("../../controllers/materialController");
const { protect, restrictTo } = require("../../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(getAllMaterials)
  .post(protect, upload.single("file"), uploadMaterial);
router.route("/:materialId").get(getMaterial).delete(protect, deleteMaterial);

module.exports = router;
