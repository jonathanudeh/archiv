const express = require("express");
const departmentController = require("../../controllers/departmentController");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(departmentController.getAllDepartments)
  .post(departmentController.createDepartment);

router
  .route("/:id")
  .get(departmentController.getDepartment)
  .patch(departmentController.updateDepartment)
  .delete(departmentController.deleteDepartment);

exports.router = router;
