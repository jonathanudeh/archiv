const express = require("express");
const schoolController = require("../../controllers/schoolController");
const departmentRouter = require("./departmentRoutes");
const { protect, restrictTo } = require("../../controllers/authController");

const router = express.Router();

// NESTED ROUTE CONNECTION
router.use("/:schoolId/departments", departmentRouter);

router
  .route("/")
  .get(schoolController.getAllSchools)
  .post(
    protect,
    restrictTo("admin", "contributor"),
    schoolController.createSchool,
  );

router
  .route("/:id")
  .get(schoolController.getSchool)
  .patch(
    protect,
    restrictTo("admin", "contributor"),
    schoolController.updateSchool,
  )
  .delete(protect, restrictTo("admin"), schoolController.deleteSchool);

router.route("/slug/:slug").get(schoolController.getSchoolBySlug);

module.exports = router;
