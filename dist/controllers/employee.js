"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const employee_1 = require("../model/employee");
const employment_1 = require("../model/employment");
const attendance_1 = require("../model/attendance");
const role_1 = require("../model/role");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/new', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const contactNo = yield employee_1.Employee.findOne({ employeeId: req.body.employeeId });
        if (contactNo) {
            return res.status(400).json({ message: "Employee already exists" });
        }
        else {
            yield employee_1.Employee.create(req.body);
            res.status(200).json({ message: "Employee Added Sucessfully" });
        }
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Read all employees
router.get('/all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield employee_1.Employee.find();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Read a specific employee
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employee = yield employee_1.Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
// Update an employee
router.patch('/update_employees/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const EmployeeId = req.params.id;
        const updatedFields = req.body; // Updated fields will be present in the request body
        // Construct an object with the updated fields
        const updatedEmployeeFields = {};
        for (const key in updatedFields) {
            updatedEmployeeFields[key] = updatedFields[key];
        }
        const updatedEmployee = yield employee_1.Employee.findByIdAndUpdate(EmployeeId, updatedEmployeeFields, { new: true });
        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(updatedEmployee);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}));
// Delete an employee
router.delete('/delete_employees/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeId = req.params.id;
        const deletedEmployee = yield employee_1.Employee.findByIdAndRemove(employeeId);
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        const delteemployment = yield employment_1.Employment.findByIdAndRemove(employeeId);
        const deleteRole = yield role_1.Role.findByIdAndRemove(employeeId);
        const deleteAttendance = yield attendance_1.Attendance.findByIdAndRemove(employeeId);
        res.json({ message: 'Employee deleted' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}));
module.exports = router;
//# sourceMappingURL=employee.js.map