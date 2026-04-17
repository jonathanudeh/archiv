const express = require("express");
const { getLevels } = require("../../controllers/levelController");
const semesterRouter = require("./semesterRoutes");

const router = express.Router({ mergeParams: true });

router.use("/:levelId/semesters", semesterRouter);

router.route("/").get(getLevels);

module.exports = router;
