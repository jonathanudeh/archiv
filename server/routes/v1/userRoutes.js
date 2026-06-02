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
} = require("../../controllers/userController");

const router = express.Router();

router.get("/me", protect, getMe);
router.patch("/updateMe", protect, upload.single("photo"), updateMe);
router.delete("/deleteMe", protect, deleteMe);

router
  .route("/")
  .get(protect, restrictTo("admin"), getAllUsers)
  .post(createUser);

router
  .route("/:id")
  .get(protect, getUser)
  .patch(protect, updateUser)
  .delete(protect, restrictTo("admin"), deleteUser);

module.exports = router;
