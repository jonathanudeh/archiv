const express = require("express");
const { protect, restrictTo } = require("../../controllers/authController");
const {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentBySlug,
} = require("../../controllers/departmentController");
const levelRouter = require("./levelRoutes");

const router = express.Router({ mergeParams: true });

router.use("/:departmentId/levels", levelRouter);

// GET ALL DEPARTMENTS / ALL DEPARTMENTS IN A SCHOOL
router
  .route("/")
  .get(getAllDepartments)
  .post(protect, restrictTo("admin", "contributor"), createDepartment);

// FOR A DEPARTMENT BY ID
router
  .route("/:id")
  .get(getDepartment)
  .patch(protect, restrictTo("admin", "contributor"), updateDepartment)
  .delete(protect, restrictTo("admin"), deleteDepartment);

router.route("/slug/:slug").get(getDepartmentBySlug);

module.exports = router;
