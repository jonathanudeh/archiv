const express = require("express");
const upload = require("../../middlewares/multerUpload");
const { protect, restrictTo } = require("../../controllers/authController");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  deleteMe,
  getMe,
  updateMe,
  getMyActivity,
  getMyMaterials,
} = require("../../controllers/userController");
const {
  getMySavedMaterials,
} = require("../../controllers/savedMaterialController");

const router = express.Router();

router.get("/me", protect, getMe);
router.get("/me/activity", protect, getMyActivity);
router.get("/me/materials", protect, getMyMaterials);
router.get("/me/savedMaterials", protect, getMySavedMaterials);
router.patch("/updateMe", protect, upload.single("photo"), updateMe);
router.delete("/deleteMe", protect, deleteMe);

router.route("/").get(protect, restrictTo("admin"), getAllUsers);
// .post(protect, restrictTo("admin"), createUser);

router
  .route("/:id")
  .get(protect, restrictTo("admin"), getUser)
  .patch(protect, restrictTo("admin"), updateUser)
  .delete(protect, restrictTo("admin"), deleteUser);

module.exports = router;
