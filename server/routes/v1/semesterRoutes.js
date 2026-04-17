const express = require("express");
const { getSemesters } = require("../../controllers/semesterController");

const router = express.Router({ mergeParams: true });

router.route("/").get(getSemesters);

module.exports = router;
