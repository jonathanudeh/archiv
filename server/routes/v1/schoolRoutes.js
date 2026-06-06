const express = require("express");
const departmentRouter = require("./departmentRoutes");
const upload = require("../../middlewares/multerUpload");

const {
  getAllSchools,
  createSchool,
  getSchool,
  deleteSchool,
  getSchoolBySlug,
  updateSchool,
} = require("../../controllers/schoolController");
const { protect, restrictTo } = require("../../controllers/authController");

const router = express.Router();

// NESTED ROUTE CONNECTION
router.use("/:schoolId/departments", departmentRouter);

router
  .route("/")
  .get(getAllSchools)
  .post(
    protect,
    restrictTo("admin", "contributor"),
    upload.single("logo"),
    createSchool,
  ); //add rate limiter to creation

router
  .route("/:id")
  .get(getSchool)
  .patch(
    protect,
    restrictTo("admin", "contributor"),
    upload.single("logo"),
    updateSchool,
  )
  .delete(protect, restrictTo("admin"), deleteSchool);

router.route("/slug/:slug").get(getSchoolBySlug);

module.exports = router;
