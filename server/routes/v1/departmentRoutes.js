const express = require("express");
const {
  protect,
  restrictTo,
  requireVerified,
} = require("../../controllers/authController");
const {
  createDepartment,
  getAllDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentBySlug,
} = require("../../controllers/departmentController");
const levelRouter = require("./levelRoutes");
const materialRouter = require("./materialRoutes");

const router = express.Router({ mergeParams: true });

router.use("/:departmentId/levels", levelRouter);
router.use("/:departmentId/materials", materialRouter);

// GET ALL DEPARTMENTS / ALL DEPARTMENTS IN A SCHOOL
router
  .route("/")
  .get(getAllDepartments)
  .post(
    protect,
    restrictTo("admin", "contributor"),
    requireVerified,
    createDepartment,
  );

// FOR A DEPARTMENT BY ID
router
  .route("/:id")
  .get(getDepartment)
  .patch(
    protect,
    restrictTo("admin", "contributor"),
    requireVerified,
    updateDepartment,
  )
  .delete(protect, restrictTo("admin"), requireVerified, deleteDepartment);

router.route("/slug/:slug").get(getDepartmentBySlug);

module.exports = router;
