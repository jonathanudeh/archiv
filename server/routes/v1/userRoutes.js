const express = require("express");
const {
  signup,
  login,
  protect,
  restrictTo,
} = require("../../controllers/authController");
const {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
} = require("../../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

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
