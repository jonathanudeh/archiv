const express = require("express");
const { protect, restrictTo } = require("../../controllers/authController");
const {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
} = require("../../controllers/departmentController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(getAllDepartments)
  .post(protect, restrictTo("admin", "contributor"), createDepartment);

router
  .route("/:id")
  .get(getDepartment)
  .patch(protect, restrictTo("admin", "contributor"), updateDepartment)
  .delete(protect, restrictTo("admin"), deleteDepartment);

module.exports = router;
