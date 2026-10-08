const Employee = require("../models/Employee");

const handleError = (err, res) => {
  if (err.name === "CastError") {
    return res.status(404).json({ message: "Employee not found" });
  }
  if (err.code === 11000) {
    return res.status(400).json({ message: "Email already exists" });
  }
  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  res.status(500).json({ message: err.message });
};

// POST /api/employees
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, designation } = req.body;
    if (!name || !email || !phone || !department || !designation) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const employee = await Employee.create({ name, email, phone, department, designation });
    res.status(201).json(employee);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/employees?search=name
exports.getEmployees = async (req, res) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: "i" } } : {};
    const employees = await Employee.find(filter).sort({ createdAt: -1 });
    res.json(employees);
  } catch (err) {
    handleError(err, res);
  }
};

// GET /api/employees/:id
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    handleError(err, res);
  }
};

// PUT /api/employees/:id
exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, phone, department, designation } = req.body;
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, department, designation },
      { new: true, runValidators: true }
    );
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  } catch (err) {
    handleError(err, res);
  }
};

// DELETE /api/employees/:id
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    handleError(err, res);
  }
};