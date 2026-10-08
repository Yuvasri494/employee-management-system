const express = require("express");
const protect = require("../middleware/auth");
const {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const router = express.Router();
//protect is the security guard for your employee APIs//
router.use(protect); // every employee route needs a valid JWT

router.route("/").post(addEmployee).get(getEmployees);
router.route("/:id").get(getEmployeeById).put(updateEmployee).delete(deleteEmployee);

module.exports = router;