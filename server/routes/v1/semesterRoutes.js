const express = require("express");
const { getSemesters } = require("../../controllers/semesterController");
const { protect } = require("../../controllers/authController");
const materialRouter = require("./materialRoutes");

const router = express.Router({ mergeParams: true });
router.use("/:semesterId/materials", materialRouter);

router.route("/").get(getSemesters);

module.exports = router;
