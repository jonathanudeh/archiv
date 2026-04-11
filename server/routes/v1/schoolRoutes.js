const express = require("express");
const schoolController = require("../../controllers/schoolController");
const departmentRouter = require("./departmentRoutes");

const router = express.Router();

// NESTED ROUTE CONNECTION
router.use("/:schoolId/departments", departmentRouter);

router
  .route("/")
  .get(schoolController.getAllSchools)
  .post(schoolController.createSchool);

router
  .route("/:id")
  .get(schoolController.getSchool)
  .patch(schoolController.updateSchool)
  .delete(schoolController.deleteSchool);

router.route("/slug/:slug").get(schoolController.getSchoolBySlug);

module.exports = router;
